import './App.css';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import CreatePost from './pages/CreatePost';
import LogIn from './pages/LogIn';
import Register from './pages/Register';


function App() {

  
  return (
    <div className='App container'>

      <BrowserRouter >
        <div className='navbar navbar-light bg-light'>
          <Link to='/'>Home page</Link>
          <Link to='/CreatePost'>Create a Post</Link>
          <Link to='/Register'>Register</Link>
          <Link to='/LogIn'>Log In</Link>
        </div>
      
        <Routes>
            <Route path= '/' element={<Home></Home>} ></Route>
            <Route path= '/CreatePost' element={<CreatePost></CreatePost>} ></Route>
            <Route path= '/Post/:id' element={<Post></Post>} ></Route>
            <Route path= '/Register' element={<Register></Register>} ></Route>
            <Route path= '/LogIn' element={<LogIn></LogIn>} ></Route>
            
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
