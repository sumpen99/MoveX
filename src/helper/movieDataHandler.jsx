import { FILTER_OPTION,MOVIES_PER_PAGE_OPTION,stringInterPolation } from "./core";
import { MovieQuery } from "./moviequery";
let cache = null;
const baseUrlMovies = 'http://www.omdbapi.com/?apikey=603c16e8&';
const baseUrlPosters = 'http://img.omdbapi.com/?apikey=603c16e8&';

//const baseUrlSearchForMovies = "http://www.omdbapi.com/?apikey=603c16e8&s=san&plot=full&type=movie&page=2"
const baseUrlSearchForMovies = "http://www.omdbapi.com/?apikey=603c16e8&s=san&plot=full&type=movie&page=2"
//const baseUrlSpecificMovie = "http://www.omdbapi.com/?apikey=603c16e8&t=San&plot=full"
//const baseUrlSpecificMovie = "http://www.omdbapi.com/?apikey=603c16e8&t=San"
/*
//http://www.omdbapi.com/?apikey=[603c16e8]& -> MOVIE
//http://img.omdbapi.com/?apikey=[603c16e8]& -> POSTERS
/*
fetch("http://www.omdbapi.com/?apikey=603c16e8&s=S")
   .then((response) => response.json())
   .then((data) => console.log(data.Search))
*/
/*
get specific
fetch("http://www.omdbapi.com/?apikey=[yourkey]&t=Antman")
   .then((response) => response.json())
   .then((data) => console.log(data))
*/

export let lastRequest = { 
  filterOption: FILTER_OPTION.NAME,
  perPageOption: MOVIES_PER_PAGE_OPTION.TEN,
  valueToMatch: "",
  page:0,
  totalMoviesAvailable:0,
  filteredMovies:0,
  initiated:null,
};

export async function makeRequest(filterRequest,onMovieCountChange,onResetPage) {
  const selectedFilter = filterRequest.filterOption;
  const valueToMatch = filterRequest.valueToMatch;
  const perPageOption = filterRequest.perPageOption;
  let currentPage = filterRequest.currentPage;
 
  const url = urlWithSearchTextAndPage(valueToMatch,currentPage);
  const response = await fetch(url);
  const movieData = await response.json();
  cache = MovieQuery.queryInitialize(movieData);
 
  if(!cache){
    onResetPage(0);
    onMovieCountChange({
      totalMovies:0,
      totalPages:0
    });
    updateLastRequest(selectedFilter,perPageOption,valueToMatch,0,[],true,0);
    return [] 
  }

  const moviesAvailable = cache.totalMovies;
  updateLastRequest(selectedFilter,perPageOption,valueToMatch,moviesAvailable,cache,true,currentPage);
 
  onMovieCountChange({
    totalMovies:lastRequest.totalMoviesAvailable,
    totalPages:Math.ceil(lastRequest.totalMoviesAvailable/perPageOption)
  });
  return cache.movies
}

export async function collectMovieByImdbID(imdbId){
  const url = urlWithImdbID(imdbId);
  const response = await fetch(url);
  const movieData = await response.json();
  return movieData;
  //const result = MovieQuery.queryInitialize(movieData);
}

function notSameFilterAsLastOne(selectedFilter,valueToMatch,perPageOption){
  return selectedFilter !== lastRequest.filterOption || 
          valueToMatch !== lastRequest.valueToMatch ||
          perPageOption !== lastRequest.perPageOption
}

function updateLastRequest(selectedFilter,perPageOption,valueToMatch,moviesAvailable,filteredMovies,initiated,currentPage){
  lastRequest.filterOption = selectedFilter;
  lastRequest.perPageOption = perPageOption;
  lastRequest.valueToMatch = valueToMatch;
  lastRequest.totalMoviesAvailable = moviesAvailable;
  lastRequest.filteredMovies = (selectedFilter === FILTER_OPTION.NAME) ? null : filteredMovies;
  lastRequest.initiated = initiated;
  lastRequest.page = currentPage;
}

function filterData(selectedFilter,valueToMatch){
  if(selectedFilter === FILTER_OPTION.ALL){ return cache; }
  return cache.filter((movie) => {return filterMovie(movie,selectedFilter,valueToMatch)});
}

function filterMovie(movie,selectedFilter,valueToMatch){
  switch(selectedFilter){
    case FILTER_OPTION.NAME:    return movie.name.toLowerCase().includes(valueToMatch.toLowerCase());
    default:                    return false;
  };
}

function slicedFilteredMovies(currentPage){
  const filteredMovies = (lastRequest.filterOption === FILTER_OPTION.ALL) ? cache : lastRequest.filteredMovies;
  const fromIndex = currentPage * lastRequest.perPageOption;
  const toButNotIncludedIndex = fromIndex + lastRequest.perPageOption;
  lastRequest.page = currentPage;
  return filteredMovies.slice(fromIndex,toButNotIncludedIndex)
}

function validSearch(searchText,currentPage){
  return (searchText.length >= 3 && currentPage >= 0)
}

function urlWithSearchTextAndPage(searchText,currentPage){
  const page = currentPage+1;
  return `https://www.omdbapi.com/?apikey=603c16e8&s=${searchText}&plot=full&type=movie&page=${page}`;
}

function urlWithImdbID(imdbID){
  return `https://www.omdbapi.com/?apikey=603c16e8&i=${imdbID}&plot=full`;
}

