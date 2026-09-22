import React, { useState } from 'react'
import './LoginCSS.css'
import Navbar from './Navbar'

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
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
        "http://localhost:8080/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      )

      const user = await response.json()

      if (response.ok && user) {

        alert("Login successful! 🎉")

        // Save logged-in user
        localStorage.setItem("user", JSON.stringify(user))

        // Go to dashboard
        window.location.href = "/dashboard"

      } else {

        alert("Invalid email or password.")

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

          <h1>Welcome Back</h1>

          <p>Login to your RenewBook account</p>

          <form onSubmit={handleSubmit}>

            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />

            <button type="submit">
              Login
            </button>

          </form>

          <p>
            Don't have an account? <a href="/register">Register</a>
            <br />
            For Admin Login <a href="/adminlogin">Admin Login</a>
          </p>

        </div>
      </div>
    </>
  )
}

export default Login