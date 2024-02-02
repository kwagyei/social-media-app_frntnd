import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

function Post() {

    let { id } = useParams()

    const [clickedPost,setClickedPost] = useState({})

    useEffect( () => {

        axios.get(`http://localhost:3001/posts/${id}`).then((response) => {
            setClickedPost(response.data)
          })
         
    })


  return (
    <div>
    <div>{clickedPost.title}</div>
    <div>{clickedPost.postText}</div>
    <div>{clickedPost.userName}</div>

  </div>
  )
}

export default Post