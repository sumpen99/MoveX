import "../styles/error.css"
import { CoorTransition } from "../components/transition";
import { routeTransitionOpacity } from "../helper/transitiontypes";

const Error = () => {
  
  const body = () =>{
    return(
      <div className="container-body-error">
        <h1>OOOPS! THATS NOT A VALID PAGE...</h1>
      </div>
    )
  }

  return (
    <CoorTransition page={body} name="home trans" transition={routeTransitionOpacity}/>
  );
};
export default Error;