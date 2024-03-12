import './App.css';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import CreatePost from './pages/CreatePost';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext} from "./helpers/AuthContext"


function App() {

  const [authState, setAuthState] = useState({
    username : "", 
    id : 0, 
    status : false })

  useEffect(() => {

  axios.get("http://localhost:3001/auth/auth",  {headers: {accessToken: localStorage.getItem("accessToken")}}).then((response) => {
      if (response.data.error) {
        
          setAuthState({...authState, status : false})
        } else {
          setAuthState({
            username : response.data.username, 
            id : response.data.id, 
            status : true })
        }
     })

  
  }, [])

  const logout = () => {
    localStorage.removeItem("accessToken")

    setAuthState({
    username : "", 
    id : 0, 
    status : false })
  }

  
  return (
    <div className='App container'>
    <AuthContext.Provider value ={{ authState, setAuthState }}>

      <BrowserRouter >
        <div className='navbar navbar-light bg-light'>
          <Link to='/'>Home page</Link>
          <Link to='/CreatePost'>Create a Post</Link>
          <h1>{authState.username}</h1>

          {/* display only when there is no accessToken */}
          { !authState.status ? (
            <>
             <Link to='/Register'>Register</Link>
             <Link to='/LogIn'>Log In</Link>
            </>
          ) : (
            <button onClick={logout}>Logout</button>
          )}
          
        </div>
      
        <Routes>
            <Route path= '/' element={<Home></Home>} ></Route>
            <Route path= '/CreatePost' element={<CreatePost></CreatePost>} ></Route>
            <Route path= '/Post/:id' element={<Post></Post>} ></Route>
            <Route path= '/Register' element={<Register></Register>} ></Route>
            <Route path= '/LogIn' element={<LogIn></LogIn>} ></Route>
            
        </Routes>
      </BrowserRouter>

    </AuthContext.Provider>

    </div>
  );
}

export default App;
