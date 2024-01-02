import { BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Filme from "./pages/Filme";
import Search from "./pages/Search";

export default function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={ <Home/> }/>
                <Route path="/filme/:id" element={ <Filme/> } /> 
                <Route path="/resultado/:query" element={ <Search/>} />
            </Routes>
        
        </BrowserRouter>
    )
}