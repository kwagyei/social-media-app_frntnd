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

      axios.get("http://localhost:3001/posts", {headers : {accessToken : localStorage.getItem("accessToken")}}).then((response) => {

      if (response.data.error) {

             navigate("/login")
             
      }else {
        setListOfPosts(response.data.listofPosts.reverse()) //to display in reverse chronological order
      }

      })
    
  }, [] )

  const likePost = (postId) => {

    axios.post("http://localhost:3001/likes",
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

await axios.delete(`http://localhost:3001/posts/${id}`, {headers: {accessToken: localStorage.getItem("accessToken")}}).then((response) =>{
  
setListOfPosts(listOfPosts.filter((val) => {
    return val.id !== id
  }))
      //console.log(response.data)
    })


}


  return (


    <div>
      { listOfPosts.map( (item,key) => (

      <div className='container mt-3 ' >
        <div className='post bg-light p-3 rounded'>
            <div className='title mb-2 fw-bold text-start'>{item.title}</div>
            <div className='body' onClick={ () => { navigate(`/post/${item.id}`)}}>{item.postText}</div>
            <div className='footer mt-2 text-muted text-end'>@{item.userName}</div>
            <button className="btn btn-primary text-end me-2" onClick={() => likePost(item.id)}>Like</button><label>{item.Likes.length}</label>
            <div className='d-flex justify-content-end'>
            {authState.username === item.userName && <button onClick={() => deletePost(item.id)}>X</button>}
            </div>
           
            
        </div>
        
      </div>
      
      ))}
    </div>
  )
}

export default Home