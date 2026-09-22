import React, { useState } from 'react'
import './RegisterCSS.css'
import Navbar from './Navbar'

const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      )

      if (response.ok) {
        alert("Account created successfully! ")

        setFormData({
          name: "",
          email: "",
          department: "",
          password: ""
        })
      } else {
        alert("Registration failed.")
      }

    } catch (error) {
      console.error(error)
      alert("Could not connect to backend.")
    }
  }

  return (
    <>
      <Navbar />

      <div className="login-container">
        <div className="login-card">

          <h1>Create Account</h1>

          <p>Join the RenewBook student community</p>

          <form onSubmit={handleSubmit}>

            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

            <label>Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Enter your department"
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />

            <button type="submit">
              Create Account
            </button>

          </form>

          <p>
            Already have an account?{" "}
            <a href="/login">Login</a>
            
          </p>

        </div>
      </div>
    </>
  )
}

export default Register