import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from "../helpers/AuthContext"
import { useNavigate } from 'react-router-dom';

function Post() {

    let { id } = useParams()
    const navigate = useNavigate()

    const {authState} = useContext(AuthContext)


    const [newComment,setNewComment] = useState({
      commentBody : "",
      PostId: id

    })

    const [clickedPost,setClickedPost] = useState({})
    const [comments,setComments] = useState([])

    

    useEffect( () => {

      if (!localStorage.getItem("accessToken")) {
        navigate("/login")
      } else {
        axios.get(`https://social-media-posting-app-af137f0e8a2c.herokuapp.com/posts/${id}`).then((response) => {
          setClickedPost(response.data)
        })

        renderComments()
      }

       

    }, [])

    const renderComments = async () => {

      await axios.get(`https://social-media-posting-app-af137f0e8a2c.herokuapp.com/comments/${id}`).then((response) => {
            setComments(response.data.reverse())
          })

    }

    const addComment = async () => {

      if (newComment.commentBody.trim() !== '') {

        await axios.post("https://social-media-posting-app-af137f0e8a2c.herokuapp.com/comments", newComment, 
        {headers: {accessToken: localStorage.getItem("accessToken")}}).then((response) => {

        if (response.data.error) {
          alert(response.data.error)
        }else {
          const commentToAdd = {
            id: response.data.id,
            commentBody: newComment.commentBody,
            username: response.data.username,
          }
          setComments([commentToAdd, ...comments]) //the will add the new comment to the beginning ogf the array
        }

        })

      } else {

        alert("Enter a comment")
      }


    }

  
    

    const handleInput = (event) => {

      setNewComment(prev => ({...prev, [event.target.name] : event.target.value}))

    }

    const handleSubmit = (event) => {
      event.preventDefault()

      //console.log(newComment)
      addComment()
      setNewComment(
        {
          commentBody : "",
          PostId: id

        }
      )

    }

    const deleteComment = async(id, key) => {

      await axios.delete(`https://social-media-posting-app-af137f0e8a2c.herokuapp.com/comments/${id}`, {headers: {accessToken: localStorage.getItem("accessToken")}}).then((response) =>{
        
      setComments(comments.filter((val) => {
          return val.id !== id
        }))
            //console.log(response.data)
          })


    }


  return (
    <div className="container">
    <div className="row">
      <div className="col-lg-8">
        <div className="card mb-3">
          <div className="card-body">
            <h4 className="card-title">{clickedPost.title}</h4>
            <p className="card-text">{clickedPost.postText}</p>
            <div className="text-start text-muted"><small>@{clickedPost.userName}</small></div>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card mb-3">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Your Comment:</label>
                <input
                  type="text"
                  name="commentBody"
                  className="form-control"
                  placeholder="Comment here..."
                  onChange={handleInput}
                  value={newComment.commentBody}
                />
              </div>
              <div>
                <button type="submit" className="btn btn-primary">COMMENT</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-3">
      <div className="col-lg-8">
        <h5 className="mb-3">Comments:</h5>
        <div>
          {comments.map((item, key) => (
            <div key={key} className="card mb-2">
              <div className="card-body">
                <div>{item.commentBody}</div>
                <div className="text-end text-muted"><small>@{item.username}</small></div>
                {authState.username === item.username && <button onClick={() => deleteComment(item.id, key)} className="btn btn-danger">Delete</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}

export default Post