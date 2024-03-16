import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

function Post() {

    let { id } = useParams()


    const [newComment,setNewComment] = useState({
      commentBody : "",
      PostId: id

    })

    const [clickedPost,setClickedPost] = useState({})
    const [comments,setComments] = useState([])

    useEffect( () => {

        axios.get(`http://localhost:3001/posts/${id}`).then((response) => {
            setClickedPost(response.data)
          })

          renderComments()

    }, [])

    const renderComments = () => {

      axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setComments(response.data)
          })

    }

    const addComment = async () => {

      if (newComment.commentBody.trim() !== '') {

        await axios.post("http://localhost:3001/comments", newComment, 
        {headers: {accessToken: localStorage.getItem("accessToken")}}).then((response) => {

        if (response.data.error) {
          alert(response.data.error)
        }else {
          const commentToAdd = {
            commentBody: newComment.commentBody,
            username: response.data.username,
          }
          setComments([...comments, commentToAdd])
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


  return (
    <div className="container">
  <div className="row">
    <div className="col-lg-6">
      <div className="postBody bg-light p-3 rounded">
        <h4>{clickedPost.title}</h4>
        <p>{clickedPost.postText}</p>
        <small className="text-muted">@{clickedPost.userName}</small>
      </div>
    </div>

    <div className="col-lg-6">
      <div className="commentForm bg-light p-3 rounded">
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

  <div className="row mt-3">
    <div className="col-lg-6">
      <h5 className="mb-3">Comments:</h5>
      <div>
        {comments.map((item, key) => (
          <div key={key} className="bg-light p-2 rounded mb-2">
            <div>{item.commentBody}</div>
            <div className='d-flex justify-content-end'>@{item.username}</div>
            
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
  )
}

export default Post