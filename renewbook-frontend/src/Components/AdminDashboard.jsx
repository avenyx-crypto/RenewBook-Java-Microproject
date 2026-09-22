import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";


const AdminDashboard = () => {

  const [resources, setResources] = useState([]);
  const [users, setUsers] = useState([]);

  // =========================
  // FETCH RESOURCES
  // =========================

  const fetchResources = () => {

    fetch("http://localhost:8080/api/admin/resources")
      .then((response) => response.json())
      .then((data) => {
        setResources(data);
      })
      .catch((error) => {
        console.error("Error fetching resources:", error);
      });

  };


  // =========================
  // FETCH USERS
  // =========================

  const fetchUsers = () => {

    fetch("http://localhost:8080/api/admin/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });

  };


  // =========================
  // PAGE LOAD
  // =========================

  useEffect(() => {

    const savedAdmin = localStorage.getItem("admin");

    if (!savedAdmin) {
      alert("Please login as admin first.");
      window.location.href = "/admin-login";
      return;
    }

    fetchResources();
    fetchUsers();

  }, []);


  // =========================
  // VERIFY RESOURCE
  // =========================

  const verifyResource = (id) => {

    fetch(
      `http://localhost:8080/api/admin/resources/${id}/verify`,
      {
        method: "PUT"
      }
    )
      .then((response) => response.json())
      .then(() => {

        alert("Resource verified successfully! ✅");

        fetchResources();

      })
      .catch((error) => {

        console.error("Error verifying resource:", error);

      });

  };


  // =========================
  // DELETE RESOURCE
  // =========================

  const deleteResource = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to remove this resource?"
    );

    if (!confirmDelete) {
      return;
    }

    fetch(
      `http://localhost:8080/api/admin/resources/${id}`,
      {
        method: "DELETE"
      }
    )
      .then((response) => response.text())
      .then(() => {

        alert("Resource removed successfully! 🗑️");

        fetchResources();

      })
      .catch((error) => {

        console.error("Error deleting resource:", error);

      });

  };


  return (
    <>
      <Navbar />

      <div className="dashboard-page">

        {/* HEADER */}

        <div className="dashboard-header">

          <h1>Admin Dashboard</h1>

          <p>
            Manage RenewBook users and resources.
          </p>

        </div>


        {/* =========================
            STATISTICS
        ========================= */}

        <div className="action-grid">

          <div className="action-card">

            <h2>📚 Total Resources</h2>

            <p>
              {resources.length}
            </p>

          </div>


          <div className="action-card">

            <h2>👨‍🎓 Registered Students</h2>

            <p>
              {users.length}
            </p>

          </div>


          <div className="action-card">

            <h2>🛡️ Admin Role</h2>

            <p>
              Resource Management
            </p>

          </div>

        </div>


        {/* =========================
            REGISTERED USERS
        ========================= */}

        <div>

          <h2>Registered Students</h2>

          {users.length === 0 ? (

            <div className="action-card">

              <h2>No Users</h2>

              <p>
                No students have registered yet.
              </p>

            </div>

          ) : (

            <div className="resource-container">

              {users.map((user) => (

                <div
                  className="resource-card"
                  key={user.id}
                >

                  <h2>
                    {user.name}
                  </h2>

                  <p>
                    <strong>Email:</strong>{" "}
                    {user.email}
                  </p>

                  <p>
                    <strong>Department:</strong>{" "}
                    {user.department}
                  </p>

                </div>

              ))}

            </div>

          )}

        </div>


        {/* =========================
            ALL RESOURCES
        ========================= */}

        <div>

          <h2>All Resources</h2>

          {resources.length === 0 ? (

            <div className="action-card">

              <h2>No Resources</h2>

              <p>
                There are currently no resources available.
              </p>

            </div>

          ) : (

            <div className="resource-container">

              {resources.map((resource) => (

                <div
                  className="resource-card"
                  key={resource.id}
                >

                  <h2>
                    {resource.resourceName}
                  </h2>

                  <p>
                    <strong>Subject:</strong>{" "}
                    {resource.subject}
                  </p>

                  <p>
                    <strong>Category:</strong>{" "}
                    {resource.category}
                  </p>

                  <p>
                    <strong>Type:</strong>{" "}
                    {resource.resourceType}
                  </p>

                  <p>
                    <strong>Owner:</strong>{" "}
                    {resource.ownerName}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {resource.verificationStatus || "Pending"}
                  </p>

                  <p>
                    {resource.description}
                  </p>


                  {/* VERIFY BUTTON */}

                  {resource.verificationStatus !== "Approved" && (

                    <button
                      onClick={() =>
                        verifyResource(resource.id)
                      }
                    >
                      Verify Resource
                    </button>

                  )}


                  {/* DELETE BUTTON */}

                  <button
                    onClick={() =>
                      deleteResource(resource.id)
                    }
                  >
                    Remove Resource
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>
    </>
  );
};

export default AdminDashboard;