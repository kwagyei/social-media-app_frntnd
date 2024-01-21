import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';


function App() {

  const [listOfPosts,setListOfPosts] = useState([])

  useEffect( () => {

    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data)
    })

  }, [] )




  return (

    <div className="App">
    { listOfPosts.map( (item,key) => (

      <div className='container mt-3'>
        <div className='post bg-light p-3 rounded'>
          <div className='title mb-2 fw-bold text-start'>{item.title}</div>
          <div className='body'>{item.postText}</div>
          <div className='footer mt-2 text-muted text-end'>{item.userName}</div>
     </div>
</div>
      
      
      
      ))}



    </div>
  );
}

export default App;
