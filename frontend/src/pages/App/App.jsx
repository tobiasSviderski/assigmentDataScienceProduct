import {BrowserRouter, Routes, Route} from "react-router-dom";

import New from "../New/New";
import Main from "../Main/Main";
import Home from "../Home/Home";
import Details from "../Details/Details";

import './App.scss';



const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/main" element={<Main/>}/>
                <Route path="/new" element={<New/>}/>
                <Route path="/details/:id" element={<Details/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
