import '../styles/movies.css';
import React, { useCallback} from 'react';
import { FILTER_OPTION,stringInterPolation} from "../helper/core"
import { MOVIES_PER_PAGE_OPTION } from '../helper/core';

export const Pagination = ({currentPage,totalPages,onCurrentPageChange}) => {

  const handleSelectedChange = useCallback(event => {
    const index = parseInt(event.target.getAttribute("value"));
    onCurrentPageChange(index);
  },[currentPage,totalPages])

  const handleSelectedDecreaseChange = useCallback(event => {
    let newPage = currentPage-1;
    onCurrentPageChange(newPage < 0 ? 0 : newPage);
  },[currentPage,totalPages])

  const handleSelectedIncreaseChange = useCallback(event => {
    let newPage = currentPage+1;
    onCurrentPageChange(newPage > (totalPages-1) ? (totalPages-1) : newPage);
  },[currentPage,totalPages])

  const handleSelectedIncreaseSkippedForwardChange = useCallback(event => {
    let newPage = toIndex()+1;
    onCurrentPageChange(newPage > (totalPages-1) ? (totalPages-1) : newPage);
  },[currentPage,totalPages])

  function leadingAIsHidden(){
    return (currentPage === 0) ? "hidden" : "visible";
  }

  function trailingAIsHidden(){
    return (currentPage < totalPages-1) ? "visible" : "hidden";
  }
  /*
  TIMES UP.... CONTINUE TO SHOW MAX 3 AND ADD SKIP FORWARD <-> BACK
  function leadingAIsHidden(){
    return (currentPage === 0) ? "hidden" : "visible";
  }

  function trailingAIsHidden(){
    return (currentPage < totalPages-1) ? "visible" : "hidden";
  }

  function toIndex(){
    let idx =  Math.min(3,totalPages-1);
    return idx > 0 ? idx : 0;
  }
  {<a key={toIndex()} value={toIndex()} onMouseDown={handleSelectedIncreaseSkippedForwardChange}>&hellip;</a>}
  */
  function toIndex(){
    return Math.max(0,totalPages);
  }

  return(
    <div className="pagination">
      {<a style={{visibility:leadingAIsHidden()}} onMouseDown={handleSelectedDecreaseChange}>&laquo;</a>}
      { toIndex() > 0 && Array(toIndex()).fill(null).map((value,index) => ( 
        <a key={index} value={index} className={(currentPage == index) ? "active" : "notActive"} onMouseDown={handleSelectedChange}>{index+1}</a>)) 
      }
      {<a style={{visibility:trailingAIsHidden()}} onMouseDown={handleSelectedIncreaseChange}>&raquo;</a>}
    </div>
  )
}

//raquo
//&gt
export const FilterField = ({filterOption,onFilterOptionChange}) =>{
  const handleSelectedChange = useCallback(event => {
    onFilterOptionChange(event.target.value);
  },[onFilterOptionChange])
  
  return (
    <div className="collection-sort">
      <div><label>Filter on:</label>  </div>  
      <select value={filterOption} onChange = {handleSelectedChange}> 
        {Object.values(FILTER_OPTION).map( op => <option key={op} value={op}>{op}</option> )};
      </select> 
    </div>
    
  )
}

export const MoviesPerPage = ({perPageOption,onPerPageOptionChange}) =>{
  const handleSelectedChange = useCallback(event => {
    onPerPageOptionChange(parseInt(event.target.value));
  },[onPerPageOptionChange])
  
  return (
    <div className="collection-sort">
      <div><label>Show:</label>  </div>  
      <select value={perPageOption} onChange = {handleSelectedChange}> 
        {Object.values(MOVIES_PER_PAGE_OPTION).map( op => <option key={op} value={op}>{op}</option> )};
      </select> 
    </div>
    
  )
}
  
export  const SearchField = ({filterOption,onValueToMatchChange}) =>{
  const handleInputChange = useCallback(event => {
    onValueToMatchChange(event.target.value);
  },[onValueToMatchChange])

  function disabledSearchField(filterOption){
    return  filterOption === FILTER_OPTION.ALL;
  }

  const isDisabled = disabledSearchField(filterOption);
  return(
    <div className="collection-search"> 
      <input className="search" placeholder={isDisabled ? `Showing ${filterOption}` : `Search in ${filterOption}`} type="text" onChange={handleInputChange} disabled={isDisabled}></input>
    </div>
  );
}

export const ItemsShownedLabel = ({currentPage,totalMovies,perPageOption}) =>{
  return(
    <h4> {calculateNewlabel(currentPage,totalMovies,perPageOption)}</h4>
  );
}

function calculateNewlabel(currentPage,totalMovies,perPageOption){
  let startItem = currentPage * perPageOption + 1;
  startItem = startItem > totalMovies ? totalMovies : startItem;
  const endItem = Math.min(totalMovies,startItem + perPageOption - 1)
  return `Show ${startItem} - ${endItem} of ${totalMovies} movies`;
}


