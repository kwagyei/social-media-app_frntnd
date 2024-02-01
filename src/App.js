import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';


function App() {

  
  return (
    <div className="App">

      <BrowserRouter>
      <Link to='/'>Home page</Link><br></br>
      <Link to='/CreatePost'>Create a Post</Link>
        <Routes>
            <Route path= '/' element={<Home></Home>} ></Route>
            <Route path= '/CreatePost' element={<CreatePost></CreatePost>} ></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
