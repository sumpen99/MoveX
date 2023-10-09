import { useCallback, useContext, useState } from "react";
import "../styles/radioswitch.css";
import { AppContext } from "./AppContext";
import { MOVIE_CARD_OPTION } from "./AppContext";

const labelText = `Please select preffered style to view additional information about movie.`;

export const RadioSwitch = () =>{
    const context = useContext(AppContext);
    const [sheetIsChecked,setSheetIsChecked] = useState(context.movieCard === MOVIE_CARD_OPTION.SHEET);
   
    const handleSelectionChanged = useCallback( event =>{
        const id = event.target.id;
        setSheetIsChecked(id === "sheet");
        setTimeout(delayRefreshOfPage,200,id)
    },[context])

    function delayRefreshOfPage(id){
        switch(id){
            case "sheet":
            context.setMovieCard(MOVIE_CARD_OPTION.SHEET);
            break;
            default:
            context.setMovieCard(MOVIE_CARD_OPTION.ROUTE);
            break;
        }
    }

    return(
        <div className="radio-container">
            <div>
                <div className="radio-label"><span className="radio-label" style={{fontWeight:500}}>{labelText}</span></div>
                <label>
                    <input type="radio" id="sheet" name="radio" checked={sheetIsChecked} onChange={handleSelectionChanged}/>
                    <span >Sheet</span>
                </label>
                <label>
                    <input type="radio" id="route" name="radio" checked={!sheetIsChecked} onChange={handleSelectionChanged}/>
                    <span>Page</span>
                </label>
            </div>
        </div>
    )
}