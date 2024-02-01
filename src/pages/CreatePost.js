import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreatePost() {

  const navigate = useNavigate()

  const [post,setPost] = useState ({

    title : "",
    postText : "",
    userName : ""
  })

  

  const addPost = async (post) => {

    await axios.post("http://localhost:3001/posts", post).then((response) => {

    console.log("post added to db")

    navigate('/')

    })

    setPost({
      title : "",
    postText : "",
    userName : ""

    })

  }

  const handleInput = (event) => {

    setPost(prev => ({...prev, [event.target.name] : event.target.value}))

  }

  const handleSubmit = (event) => {

    event.preventDefault()

    addPost(post)

  }

  return (

    <div>
    Create Post
    <div>
    <form onSubmit={handleSubmit}>
      <div>

        <label htmlFor="Title">
        Title
        </label>
        <input 
        type="text" 
        name="title"
        value={post.title}
        onChange={handleInput}
        />

      </div>

      <div>

        <label htmlFor="PostText">
        Post Text
        </label>
        <input 
        type="text" 
        name="postText"
        value={post.postText}
        onChange={handleInput}
        />

      </div>

      <div>

        <label htmlFor="Username">
        Username
        </label>
        <input 
        type="text" 
        name="userName"
        value={post.userName}
        onChange={handleInput}
        />

      </div>
      <button type="submit">
      POST
      </button>
     
    </form>
    </div>
    </div>
  )
}

export default CreatePost