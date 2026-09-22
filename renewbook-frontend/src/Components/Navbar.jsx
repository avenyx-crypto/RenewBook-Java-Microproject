import React from 'react'
import'./NavbarCSS.css'
const Navbar = () => {
  return (
    <>

      <nav>
        <h2>RenewBook</h2>

        <div>
          <a href="/">Home</a>
          <a href="/Resources">Resources</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/share">Share Resources</a>
          <a href="/login">Login</a>
        </div>
      </nav>
    </>
  )
}

export default Navbar