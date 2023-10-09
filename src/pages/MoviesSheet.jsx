import '../styles/movies.css';
import React, { useState, useEffect} from 'react';
import { routeTransitionEase  } from "../helper/transitiontypes";
import { CoorTransition } from "../components/transition";
import { FILTER_OPTION,MOVIES_PER_PAGE_OPTION } from "../helper/core"
import {MoviesPerPage,FilterField,SearchField,Pagination,ItemsShownedLabel} from "../components/optionofmovies"
import {ListOfMoviesSheet} from "../components/listofmovies"
import { MovieSheet } from '../components/sheet';
import { stringInterPolation } from '../helper/core';

function useMergeState(initialState) {
  const [state, setState] = useState(initialState);
  const setMergedState = newState => 
    setState(prevState => Object.assign({}, prevState, newState)
  );
  return [state, setMergedState];
}

const MoviesSheet = () => {
  
  const [sheetIsOpen] = useState(false);
  const [currentMovieID] = useState(null);
  const [filterOption,setFilterOption] = useState(FILTER_OPTION.NAME);
  const [perPageOption,setPerPageOption] = useState(MOVIES_PER_PAGE_OPTION.TEN);
  const [valueToMatch,setValueToMatch] = useState("");
  const [totalMovies] = useState(0);
  const [totalPages] = useState(0);
  const [currentPage,setCurrentPage] = useState(0);

  const [filterRequest, setFilterRequest] = useMergeState({
    filterOption: filterOption,
    valueToMatch: valueToMatch,
    currentPage:currentPage,
    perPageOption:perPageOption
  });

  const [movieCount, setMovieCount] = useMergeState({
    totalMovies: totalMovies,
    totalPages: totalPages
  });

  const [sheetOption, setSheetOption] = useMergeState({
    isOpen: sheetIsOpen,
    currentMovieID: currentMovieID,
  });

  useEffect(() => {
    setFilterRequest({
      filterOption: filterOption,
      valueToMatch: valueToMatch,
      currentPage:currentPage,
      perPageOption:perPageOption
    })
  },[filterOption,valueToMatch,currentPage,perPageOption])

  useEffect(() => {
    setSheetOption({
      isOpen: false,
      currentMovieID: null,
    })
  },[])

  const bodySheet = () => {
    return (
      <>
      <MovieSheet sheetOption={sheetOption} setSheetOption={setSheetOption}/>
      <div className="container-body-clients">
      <div className="container-sort">
          <MoviesPerPage perPageOption={perPageOption} onPerPageOptionChange={setPerPageOption}></MoviesPerPage>
          <FilterField filterOption={filterOption} onFilterOptionChange={setFilterOption}></FilterField>
        </div>
          <SearchField filterOption={filterOption} onValueToMatchChange={setValueToMatch}></SearchField>
        <div className="container-pages">
          <ItemsShownedLabel currentPage= {currentPage} totalMovies={movieCount.totalMovies} perPageOption={perPageOption}></ItemsShownedLabel>
          <Pagination currentPage={currentPage} totalPages={movieCount.totalPages} onCurrentPageChange={setCurrentPage}></Pagination>
        </div>
        <div className="client-filter">
          <ListOfMoviesSheet filterRequest={filterRequest} onMovieCountChange={setMovieCount} onResetPage={setCurrentPage} setSheetOption={setSheetOption}></ListOfMoviesSheet>
        </div>
      </div>
      </>
    )
  }

  return (
    <CoorTransition page={bodySheet}  name="home trans" transition={routeTransitionEase}/>
  );
  };
  
export default MoviesSheet;