import React, { useState } from 'react'
import axios from 'axios'

function Register() {

    const [newUserInput, setNewUserInput] = useState({
        username: "",
        password: ""
    })

    const registerUser = async (newUserInput) => {

         if (newUserInput.username.trim() !== '' && newUserInput.password.trim() !== '' ){

            await axios.post("https://social-media-posting-app-af137f0e8a2c.herokuapp.com/auth", newUserInput).then((response) => {

            if (response.data.error) {
                
            alert(response.data.error)
        }else{

            alert(response.data)
        }
            })

            setNewUserInput({
            username: "",
            password: ""
        })

         } else {alert("Enter valid inputs")}
    

    }

    

    const handleInput = (event) => {

    setNewUserInput(prev => ({...prev, [event.target.name]: event.target.value }))
        }

    const handleSubmit = (event) => {

        event.preventDefault()

        registerUser(newUserInput)

    }

  return (
    <div className="container">
        <div className="card mt-4">
            <div className="card-body">
            <h2 className="card-title mb-4">Register</h2>
                 <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label htmlFor="Username" className="form-label">Username:</label>
                        <input 
                            type="text" 
                            className="form-control"
                            name="username"
                            value={newUserInput.username}
                            onChange={handleInput}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="Password" className="form-label">Password:</label>
                        <input 
                            type="password" 
                            className="form-control"
                            name="password"
                            value={newUserInput.password}
                            onChange={handleInput}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Register</button>

                </form>
    </div>
  </div>
</div>
 
  )
}

export default Register