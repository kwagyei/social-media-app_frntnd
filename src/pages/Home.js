import React, { useContext } from 'react'
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';



//importing the array from the db
function Home() {
  const [listOfPosts,setListOfPosts] = useState([])

  const { authState } = useContext(AuthContext)

  const navigate = useNavigate()

  useEffect( () => {

      axios.get("https://social-media-posting-app-af137f0e8a2c.herokuapp.com/posts", {headers : {accessToken : localStorage.getItem("accessToken")}}).then((response) => {

      if (response.data.error) {

             navigate("/login")
             
      }else {
        setListOfPosts(response.data.listofPosts.reverse()) //to display in reverse chronological order
      }

      })
    
  }, [] )

  const likePost = (postId) => {

    axios.post("https://social-media-posting-app-af137f0e8a2c.herokuapp.com/likes",
    {postId : postId},{headers : {accessToken : localStorage.getItem("accessToken")}}).then((response) => {

    if (response.data.error) {
      alert(response.data.error)
    }else {

    // console.log(response.data)
    // console.log(postId)

    setListOfPosts(listOfPosts.map((post) => {
      if (post.id === postId) {
        if (response.data.liked) {
          return {...post, Likes: [...post.Likes, 0]}
        } else {
          const likesArray = post.Likes
          likesArray.pop()
          return {...post, Likes: likesArray}
        }

      }else {
        return post
      }
    }))

    }
    })

  }

  const deletePost = async(id, key) => {

await axios.delete(`https://social-media-posting-app-af137f0e8a2c.herokuapp.com/posts/${id}`, {headers: {accessToken: localStorage.getItem("accessToken")}}).then((response) =>{
  
setListOfPosts(listOfPosts.filter((val) => {
    return val.id !== id
  }))
      //console.log(response.data)
    })


}


  return (


    <div>
      {listOfPosts.map((item, key) => (
        <div className="container mt-3" key={key}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text" onClick={() => navigate(`/post/${item.id}`)}>{item.postText}</p>
              <div className="text-start text-muted">@{item.userName}</div>
              <span className="badge bg-secondary me-2">{item.Likes.length}</span><button className="btn btn-primary me-2" onClick={() => likePost(item.id)}>Like</button>
              {authState.username === item.userName && <button className="btn btn-danger" onClick={() => deletePost(item.id)}>Delete</button>}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home