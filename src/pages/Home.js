import React from 'react'
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



//importing the array from the db
function Home() {

  const navigate = useNavigate()

  const [listOfPosts,setListOfPosts] = useState([])

  useEffect( () => {

    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data)
    })

  }, [] )



  return (


    <div>
      { listOfPosts.map( (item,key) => (

      <div className='container mt-3 ' onClick={ () => { navigate(`/post/${item.id}`)}}>
        <div className='post bg-light p-3 rounded'>
            <div className='title mb-2 fw-bold text-start'>{item.title}</div>
            <div className='body'>{item.postText}</div>
            <div className='footer mt-2 text-muted text-end'>{item.userName}</div>
        </div>
      </div>
      
      ))}
    </div>
  )
}

export default Home