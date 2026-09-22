import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";


const IncomingRequests = () => {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH INCOMING REQUESTS
  // =========================

  const fetchRequests = () => {

    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      alert("Please login first.");
      window.location.href = "/login";
      return;
    }

    const loggedUser = JSON.parse(savedUser);

    fetch(
      `http://localhost:8080/api/requests/owner/${loggedUser.name}`
    )
      .then((response) => response.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error fetching incoming requests:",
          error
        );
        setLoading(false);
      });
  };


  useEffect(() => {
    fetchRequests();
  }, []);


  // =========================
  // ACCEPT REQUEST
  // =========================

  const approveRequest = (id) => {

    fetch(
      `http://localhost:8080/api/requests/${id}/approve`,
      {
        method: "PUT"
      }
    )
      .then((response) => response.json())
      .then(() => {

        alert("Request accepted! ✅");

        fetchRequests();

      })
      .catch((error) => {

        console.error(
          "Error accepting request:",
          error
        );

      });
  };


  // =========================
  // REJECT REQUEST
  // =========================

  const rejectRequest = (id) => {

    fetch(
      `http://localhost:8080/api/requests/${id}/reject`,
      {
        method: "PUT"
      }
    )
      .then((response) => response.json())
      .then(() => {

        alert("Request rejected ❌");

        fetchRequests();

      })
      .catch((error) => {

        console.error(
          "Error rejecting request:",
          error
        );

      });
  };


  return (
    <>
      <Navbar />

      <main>

        <h1>Incoming Requests</h1>

        <p>
          Requests from other students for your shared resources.
        </p>


        {loading ? (

          <p>Loading requests...</p>

        ) : requests.length === 0 ? (

          <div className="resource-card">

            <h2>No Incoming Requests</h2>

            <p>
              No students have requested your resources yet.
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
                  <strong>Student:</strong>{" "}
                  {request.studentName}
                </p>

                <p>
                  <strong>Resource ID:</strong>{" "}
                  {request.resourceId}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {request.status}
                </p>


                {/* ACCEPT / REJECT */}

                {request.status === "Pending" && (

                  <div>

                    <button
                      onClick={() =>
                        approveRequest(request.id)
                      }
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        rejectRequest(request.id)
                      }
                    >
                      Reject
                    </button>

                  </div>

                )}

              </div>

            ))}

          </div>

        )}

      </main>
    </>
  );
};

export default IncomingRequests;