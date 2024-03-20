import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div>
        <h1>Page not found</h1>
        <p>Go to the Home page: <Link to='/'>Home page</Link></p>
    </div>
  )
}

export default PageNotFound