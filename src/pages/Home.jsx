import { CoorTransition } from "../components/transition";
import '../styles/home.css';
import { routeTransitionEase } from "../helper/transitiontypes";
import { RadioSwitch } from "../components/radioswitch";
import { ContactInformation } from "../components/contactinformation";
const Home = () => {

  
  const body = () =>{
    return(
      <div className="container-home-body"> 
        <RadioSwitch/>
        <div className="home-contactinformation"><ContactInformation/></div>
      </div>
    )
  }

  return (
    <CoorTransition page={body} name="home trans" transition={routeTransitionEase}/>
  );

};
  
export default Home;
