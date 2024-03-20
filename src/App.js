import './App.css';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import CreatePost from './pages/CreatePost';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext} from "./helpers/AuthContext"


function App() {

  const [authState, setAuthState] = useState({
    username : "", 
    id : 0,
    status : false })

  useEffect(() => {

  axios.get("https://social-media-posting-app-af137f0e8a2c.herokuapp.com/auth/auth",  {headers: {accessToken: localStorage.getItem("accessToken")}}).then((response) => {
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
    <div className='App'>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <BrowserRouter>
          <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <div className='container'>
              <Link className='navbar-brand' to='/'>{authState.status ? 'Home page' : 'Posting App'}</Link>
              <div className='sjustify-content-end'>{authState.status===true && <p>@{authState.username}</p>}</div>
              <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
              </button>
              <div className='collapse navbar-collapse' id='navbarNav'>
                <ul className='navbar-nav ms-auto'>
                  {!authState.status ? (
                    <>
                      <li className='nav-item'>
                        <Link className='nav-link' to='/Register'>Register</Link>
                      </li>
                      <li className='nav-item'>
                        <Link className='nav-link' to='/LogIn'>Log In</Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className='nav-item'>
                        <Link className='nav-link' to='/CreatePost'>Create a Post</Link>
                      </li>
                      <li className='nav-item'>
                        <button className='btn btn-link nav-link' onClick={logout}>Logout</button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </nav>

          <div className='container mt-4'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/CreatePost' element={<CreatePost />} />
              <Route path='/Post/:id' element={<Post />} />
              <Route path='/Register' element={<Register />} />
              <Route path='/LogIn' element={<LogIn />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </div>

        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;