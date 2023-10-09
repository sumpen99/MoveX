import { CoorTransition } from "../components/transition";
import React, { useState, useEffect} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import { useLoader } from '../helper/gloaballoading';
import '../styles/movie_info.css';
import AsyncImage from "../helper/asyncimage"
import { BackButton,PageHeader } from '../components/backbutton';
import { routeTransitionSpringFromBottom } from "../helper/transitiontypes";
import { capitalizeFirstLetter } from '../helper/core';
import { collectMovieByImdbID } from "../helper/movieDataHandler";

// ROUTE
export const MoviePageRoute = () => {
  const location = useLocation();
  const movieID = location.state.movieID;
  const navigate = useNavigate();
 
  const handleNavigateBack = event =>{
    navigate(-1);
  }

  const body = () =>{
    return(
      <MovieInfoBody movieID={movieID} action={handleNavigateBack} addBackButton={false}/>
    );
  }

  return (
    <CoorTransition page={body} name="info trans" transition={routeTransitionSpringFromBottom}/>
  );
  };

// SHEET
export const MoviePageSheet = ({movieID,closeSheet}) => {
  const body = () =>{
    return(
      <MovieInfoBody movieID={movieID} action={closeSheet} addBackButton={true}/>
    );
  }

  return (
    <CoorTransition page={body} name="info trans" transition={routeTransitionSpringFromBottom}/>
  );
};

const MovieInfoBody = ({movieID,action,addBackButton}) => {
  
  
  const [movie,setMovie] = useState([]);
  const {startLoader, stopLoader} = useLoader();

  useEffect(() => {
      const getMovie = async event =>{
      startLoader();
      collectMovieByImdbID(movieID)
      .then( collectedMovie => {
          if(collectedMovie){
            setMovie(collectedMovie);
          }
          stopLoader();
      })
      .catch(() =>{
          stopLoader();
          //SHOW INFO
      })
      }
      getMovie()
  },[movieID])


  return (
  <div className="client-info-body" >
    {addBackButton ? 
      <BackButton icon= {String.fromCharCode(0x24E7)} label={movie.Title} onCloseAction={action}/> :
      <PageHeader label={movie.Title}/>
    }
    <div className="client-top-header">
      <div className="client-image-container"> <AsyncImage src={movie.Poster}></AsyncImage> </div>
      <div className="client-label"> <label>{movie.Plot}</label> </div>
    </div>
    
    <div className="client-data-grid"> 
        <div className="grid-row-dog">
          <HeadSub head="Actors" sub={movie.Actors}/>
          <HeadSub head="Awards" sub={movie.Awards}/>
          <HeadSub head="BoxOffice" sub={movie.BoxOffice}/>
          <HeadSub head="Country" sub={movie.Country}/>
          <HeadSub head="DVD" sub={movie.DVD}/>
          <HeadSub head="Language" sub={movie.Language}/>
          <HeadSub head="Metascore" sub={movie.Metascore}/>
          <HeadSub head="Production" sub={movie.Production}/>
          <HeadSub head="Rated" sub={movie.Rated}/>
        </div>
        <div className="grid-row-owner">
        <HeadSub head="Released" sub={movie.Released}/>
        <HeadSub head="Response" sub={movie.Response}/>
        <HeadSub head="Runtime" sub={movie.Runtime}/>
        <HeadSub head="Type" sub={movie.Type}/>
        <HeadSub head="Website" sub={movie.Website}/>
        <HeadSub head="Writer" sub={movie.Writer}/>
        <HeadSub head="Year" sub={movie.Year}/>
        <HeadSub head="IMDB Rating" sub={movie.imdbRating}/>
        <HeadSub head="IMDB Votes" sub={movie.imdbVotes}/>
        </div>
        <div className="grid-row-owner">
          {(movie.Ratings && movie.Ratings.map(rating => <HeadSub key={Math.random()} head={rating.Source} sub={rating.Value}/>))}
        </div>
    </div>
  
  </div>
)}


const HeadSub = ({head,sub}) =>{
  
  return <div className="header-subheader">
            <h4 >{capitalizeFirstLetter(head)}</h4>
            <h5 >{capitalizeFirstLetter(sub)}</h5>
          </div>
}
