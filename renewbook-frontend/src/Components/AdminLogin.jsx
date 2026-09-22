import React, { useState } from "react";

import Navbar from "./Navbar";

const AdminLogin = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const admin = await response.json();

      if (response.ok && admin) {
        alert("Admin login successful! ");

        localStorage.setItem("admin", JSON.stringify(admin));

        window.location.href = "/admin";
      } else {
        alert("Invalid admin email or password.");
      }

    } catch (error) {
      console.error(error);
      alert("Could not connect to backend.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="login-container">

        <div className="login-card">

          <h1>Admin Login</h1>

          <p>Login to the RenewBook administration panel</p>

          <form onSubmit={handleSubmit}>

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter admin email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter admin password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit">
              Admin Login
            </button>

          </form>

        </div>

      </div>
    </>
  );
};

export default AdminLogin;