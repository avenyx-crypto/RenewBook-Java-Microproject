import React, { useEffect, useState } from 'react'
import './Dash.css'
import Navbar from './Navbar'

const Dashboard = () => {

  const [user, setUser] = useState(null)
  const [requests, setRequests] = useState([])

  useEffect(() => {

    const savedUser = localStorage.getItem("user")

    if (savedUser) {
      const loggedUser = JSON.parse(savedUser)

      setUser(loggedUser)

      // Get this student's requests
      fetch(
        `http://localhost:8080/api/requests/student/${loggedUser.name}`
      )
        .then((response) => response.json())
        .then((data) => {
          setRequests(data)
        })
        .catch((error) => {
          console.error("Error fetching requests:", error)
        })
    }

  }, [])


  return (
    <>
      <Navbar />

      <div className="dashboard-page">

        {/* Header */}
        <div className="dashboard-header">

          <h1>Student Dashboard</h1>

          <p>
            Welcome back
            {user ? `, ${user.name}` : ""}
            to your RenewBook dashboard.
          </p>

        </div>


        {/* Cards */}
        <div className="action-grid">


          {/* My Resources */}
          <div className="action-card">

            <div className="icon-badge">
              <svg viewBox="0 0 24 24">
                <path d="M4 4h6a2 2 0 0 1 2 2v14a1.5 1.5 0 0 0-1.5-1.5H4z"/>
                <path d="M20 4h-6a2 2 0 0 0-2 2v14a1.5 1.5 0 0 1 1.5-1.5H20z"/>
              </svg>
            </div>

            <h2>My Resources</h2>

            <p>
              Books and academic materials you've made available to others.
            </p>

            <button
              onClick={() => window.location.href = "/resources"}
            >
              View Resources
            </button>

          </div>


          {/* Incoming Requests */}
          <div className="action-card">

            <div className="icon-badge">
              <svg viewBox="0 0 24 24">
                <path d="M4 12h4l2 3h4l2-3h4"/>
                <path d="M4 12 6 5h12l2 7"/>
                <path d="M4 12v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6"/>
              </svg>
            </div>

            <h2>Incoming Requests</h2>

            <p>
              Requests from other students to borrow something of yours.
            </p>

            <button
              onClick={() => window.location.href='/incoming-request'}
            >
              View Requests
            </button>

          </div>


          {/* My Requests */}
          <div className="action-card">

            <div className="icon-badge">
              <svg viewBox="0 0 24 24">
                <rect
                  x="5"
                  y="4"
                  width="14"
                  height="17"
                  rx="1.5"
                />

                <path d="M9 3.5h6a1 1 0 0 1 1 1V6H8V4.5a1 1 0 0 1 1-1z"/>

                <path d="M8.5 11h7M8.5 14.5h7M8.5 18h4"/>
              </svg>
            </div>

            <h2>My Requests</h2>

            <p>
              You have {requests.length} resource request(s).
            </p>

            <button
              onClick={() => window.location.href="/view-request"
                }
            >
              View My Requests
            </button>

          </div>


          {/* Share Resource */}
          <div className="action-card action-card--primary">

            <div className="icon-badge">

              <svg viewBox="0 0 24 24">
                <path d="M4 4h9l5 5v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/>
                <path d="M13 4v5h5"/>
                <path d="M12 12v6M9 15h6"/>
              </svg>

            </div>

            <h2>Share Resource</h2>

            <p>
              Add a book or academic material.
            </p>

            <button
              onClick={() => window.location.href = "/share"}
            >
              Share Resource
            </button>

          </div>

        </div>

      </div>
    </>
  )
}

export default Dashboard