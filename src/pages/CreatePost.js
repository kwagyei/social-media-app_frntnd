import React, { useState, useContext, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext';

function CreatePost() {

    const navigate = useNavigate()

    const [post, setPost] = useState({

        title: "",
        postText: ""
    })


    const { authState } = useContext(AuthContext)
  
    useEffect( () => {
  
      if (!localStorage.getItem("accessToken")) {
        navigate("/login")
      } 
    }, [] )



    const addPost = async(post) => {

        if (post.title.trim() !== '' && post.postText.trim() !== '') {


            await axios.post("http://localhost:3001/posts",post, {headers: {accessToken: localStorage.getItem("accessToken")}}).then((response) => {

              if (response.data.error) {
                alert(response.data.error)
              }else {

                alert("Post created")
                navigate('/')
              }

            })

            setPost({
                title: "",
                postText: ""

            })


        } else {

            alert("Enter valid inputs")
        }



    }

    const handleInput = (event) => {

        setPost(prev => ({...prev, [event.target.name]: event.target.value }))

    }

    const handleSubmit = (event) => {

        event.preventDefault()

        addPost(post)

    }

    return (

      <div className="container">
  <div className="card mt-4">
    <div className="card-body">
      <h2 className="card-title mb-4">Create Post</h2>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input 
            type="text" 
            className="form-control"
            name="title"
            value={post.title}
            onChange={handleInput}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="postText" className="form-label">Post Text:</label>
          <textarea 
            className="form-control"
            name="postText"
            rows="4"  // Adjust the number of rows based on your preference
            value={post.postText}
            onChange={handleInput}
          />
        </div>

        <button type="submit" className="btn btn-primary">POST</button>

      </form>
    </div>
  </div>
</div>




    )
}

export default CreatePost