import { Routes, Route,useLocation,HashRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LoaderProvider } from "./helper/gloaballoading";
import NavBar from "./navigation/NavBar";
import Home from "./pages/Home";
import MoviesSheet from "./pages/MoviesSheet";
import MoviesRoute from "./pages/MoviesRoute";
import {MoviePageRoute} from "./pages/MovieInfo";
import Error from "./pages/Error";
import { useState,useEffect,useContext} from "react";
import { AppContext,MOVIE_CARD_OPTION } from "./components/AppContext";

const str = "/Movies/";
const rgx = new RegExp(str);

function LocationProvider({ children }) {
  return <AnimatePresence >{children}</AnimatePresence>;
}

function RoutesWithAnimationAndRoutClients() {
  const location = useLocation();
  const context = useContext(AppContext);
  useEffect(() => {
    context.setHiddenMenu(rgx.test(location.pathname)); 
  },[location])

  return (
    <Routes location={location} key="default">
      <Route path="/" element={<Home />} />
      <Route path="/movies" >
        <Route index={true} element={<MoviesRoute />} />
        <Route path=":movieId" element={<MoviePageRoute />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

function RoutesWithAnimationAndSheetClients() {
  const location = useLocation();
  return (
    <Routes location={location} key="default">
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<MoviesSheet />} />
     <Route path="*" element={<Error />} />
    </Routes>
  );
 
}

const SheetCardApp = () =>{

  return(
    <HashRouter >
      <NavBar/>
      <LocationProvider>
        <RoutesWithAnimationAndSheetClients/>
      </LocationProvider>
    </HashRouter>
  )
}

const RouteCardApp = () =>{
  const context = useContext(AppContext);
 
  return(
    <HashRouter>
      {!context.hiddenMenu && <NavBar/>}
      <LocationProvider>
        <RoutesWithAnimationAndRoutClients ></RoutesWithAnimationAndRoutClients>
      </LocationProvider>
    </HashRouter>
  )
}

const BaseCardApp = () =>{
  const appContext = useContext(AppContext);
  return (
    <div className="App">
      {appContext.movieCard === MOVIE_CARD_OPTION.ROUTE ? (<RouteCardApp/>) : (<SheetCardApp/>)}
    </div>
  )

}

function App() {
  const [movieCard, setMovieCard] = useState(MOVIE_CARD_OPTION.SHEET);
  const [hiddenMenu,setHiddenMenu] = useState(false);

  return (
    <AppContext.Provider value={{movieCard,setMovieCard,hiddenMenu,setHiddenMenu}}>
      <LoaderProvider>
        <BaseCardApp/>
      </LoaderProvider>
    </AppContext.Provider>
    
  );
}
export default App
