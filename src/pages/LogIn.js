import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function LogIn() {

    let navigate = useNavigate()

    const [loginInput, setLoginInput] = useState({
        username: "",
        password: ""
    })


    const loginUser = async (loginInput) => {

        if (loginInput.username.trim() !== '' && loginInput.password.trim() !== '' ){

        await axios.post("http://localhost:3001/auth/login", loginInput).then((response) => {

        //checking if there was an error during login
        if (response.data.error) {
            alert(response.data.error)
        } else {
            //storing the jwt in session storage(not secure)
            sessionStorage.setItem("accessToken", response.data)

            navigate("/")

        }

        })

        setLoginInput({
        username: "",
        password: ""
        })

        } else {alert("Enter valid inputs")}


        }



    const handleInput = (event) => {

    setLoginInput(prev => ({...prev, [event.target.name]: event.target.value }))

    }

    const handleSubmit = (event) => {

    event.preventDefault()

    loginUser(loginInput)

    //console.log(loginInput)

    }

  return (
    <div className="container">
        <div className="card mt-4">
            <div className="card-body">
            <h2 className="card-title mb-4">Login</h2>
                 <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label htmlFor="Username" className="form-label">Username:</label>
                        <input 
                            type="text" 
                            className="form-control"
                            name="username"
                            value={loginInput.username}
                            onChange={handleInput}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="Password" className="form-label">Password:</label>
                        <input 
                            type="password" 
                            className="form-control"
                            name="password"
                            value={loginInput.password}
                            onChange={handleInput}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>

                </form>
    </div>
  </div>
</div>
 
  )
}

export default LogIn