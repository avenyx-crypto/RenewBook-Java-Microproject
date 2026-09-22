import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";


const ViewRequests = () => {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      alert("Please login first.");
      window.location.href = "/login";
      return;
    }

    const loggedUser = JSON.parse(savedUser);

    fetch(
      `http://localhost:8080/api/requests/student/${loggedUser.name}`
    )
      .then((response) => response.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
        setLoading(false);
      });

  }, []);

  return (
    <>
      <Navbar />

      <main>

        <h1>My Requests</h1>

        <p>
          Track the resources you have requested.
        </p>

        {loading ? (
          <p>Loading requests...</p>
        ) : requests.length === 0 ? (

          <div className="resource-card">
            <h2>No Requests</h2>
            <p>
              You haven't requested any resources yet.
            </p>
          </div>

        ) : (

          <div className="resource-container">

            {requests.map((request) => (

              <div
                className="resource-card"
                key={request.id}
              >

                <h2>
                  Request #{request.id}
                </h2>

                <p>
                  <strong>Resource ID:</strong>{" "}
                  {request.resourceId}
                </p>

                <p>
                  <strong>Student:</strong>{" "}
                  {request.studentName}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {request.status}
                </p>

              </div>

            ))}

          </div>

        )}

      </main>
    </>
  );
};

export default ViewRequests;