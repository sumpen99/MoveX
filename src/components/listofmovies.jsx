import React, { useState, useEffect, useCallback} from 'react';
import { useLoader } from '../helper/gloaballoading';
import { NavLink } from "react-router-dom";
import AsyncImage from "../helper/asyncimage"
import {makeRequest} from "../helper/movieDataHandler"

const MovieCardRoute = ({movie}) =>{
    return(
        <div className="client-card" >
            <NavLink className="client-image" to={movie.imdbID} data-page="info" state={{ movieID: movie.imdbID }} style={{ textDecoration: 'none' }}>
                <AsyncImage className="client-logo-pawn" src={movie.Poster}></AsyncImage> 
            </NavLink>
            <div className="client-dog-name">
                <h6 >{movie.Title}</h6>
                <h6 >{movie.Type}</h6>
                <h6 >{movie.Year}</h6>
                <h6 >{movie.imdbID}</h6>
            </div>
        </div>
    );
  }
  
const MovieCardSheet = ({movie,setSheetOption}) =>{

    const handleOnClick = useCallback(event => {
        setSheetOption({
        isOpen: true,
        currentMovieID: movie.imdbID,
        })
    },[setSheetOption])

    return(
        <div className="client-card">
            <div className="client-image" onClick={handleOnClick}> 
                <AsyncImage src={movie.Poster}></AsyncImage>
            </div>
            <div className="client-dog-name">
                <h6 >{movie.Title}</h6>
                <h6 >{movie.Type}</h6>
                <h6 >{movie.Year}</h6>
                <h6 >{movie.imdbID}</h6>
            </div>
        </div>
    );
}
    
export const ListOfMoviesSheet = ({filterRequest,onMovieCountChange,onResetPage,setSheetOption}) =>{
    const [movies,setMovies] = useState([]);
    const {startLoader, stopLoader} = useLoader();

    useEffect(() => {
        const getMovies = async event =>{
        startLoader();
        makeRequest(filterRequest,onMovieCountChange,onResetPage)
        .then( filteredMovies => {
            if(filteredMovies){
                setMovies(filteredMovies);
            }
            stopLoader();
        })
        .catch(() =>{
            stopLoader();
            //SHOW INFO
        })
        }
        getMovies()
    },[filterRequest])

    return (
        <section className="section-clients">
        {movies.map(movie => <MovieCardSheet key={Math.random()} movie={movie} setSheetOption={setSheetOption}/> )}
        </section>
    );
}
  
export const ListOfMoviesRoute = ({filterRequest,onMovieCountChange,onResetPage}) =>{
    const [movies,setMovies] = useState([]);
    const {startLoader, stopLoader} = useLoader();

    useEffect(() => {
        const getMovies = async event =>{
        startLoader();
        makeRequest(filterRequest,onMovieCountChange,onResetPage)
        .then( filteredMovies => {
            setMovies(filteredMovies);
            stopLoader();
        })
        .catch(() =>{
            stopLoader();
            //SHOW INFO
        })
        }
        getMovies()
    },[filterRequest])

    return (
        <section className="section-clients">
        {movies.map(movie => <MovieCardRoute key={Math.random()} movie={movie}/>)}
        </section>
    );
    
}