import '../styles/movies.css';
import { CoorTransition } from "../components/transition";
import React, { useState, useEffect} from 'react';
import { FILTER_OPTION,MOVIES_PER_PAGE_OPTION} from "../helper/core"
import {MoviesPerPage,FilterField,SearchField,Pagination,ItemsShownedLabel} from "../components/optionofmovies"
import {ListOfMoviesRoute} from "../components/listofmovies"
import { routeTransitionOpacity  } from "../helper/transitiontypes";
import { Outlet } from "react-router-dom";

import { stringInterPolation } from '../helper/core';
import { lastRequest } from '../helper/movieDataHandler';

function useMergeState(initialState) {
  const [state, setState] = useState(initialState);
  const setMergedState = newState => 
    setState(prevState => Object.assign({}, prevState, newState)
  );
  return [state, setMergedState];
}

const MoviesRoute = () => {
  const [filterOption,setFilterOption] = useState(lastRequest.filterOption);
  const [perPageOption,setPerPageOption] = useState(lastRequest.perPageOption);
  const [valueToMatch,setValueToMatch] = useState(lastRequest.valueToMatch);
  const [totalMovies] = useState(lastRequest.totalMoviesAvailable);
  const [totalPages] = useState(lastRequest.totalPages);
  const [currentPage,setCurrentPage] = useState(lastRequest.page);

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

  useEffect(() => {
    setFilterRequest({
      filterOption: filterOption,
      valueToMatch: valueToMatch,
      currentPage:currentPage,
      perPageOption:perPageOption
    })
  },[filterOption,valueToMatch,currentPage,perPageOption])

  const bodyRoute = () => {
    return (
      <>
      <Outlet/>
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
        <ListOfMoviesRoute filterRequest={filterRequest} onMovieCountChange={setMovieCount} onResetPage={setCurrentPage}></ListOfMoviesRoute>
      </div>
      </div>
      </>
    )
  }

  return (
    <CoorTransition page={bodyRoute}  name="home trans" transition={routeTransitionOpacity}/>
  );
  };
export default MoviesRoute;