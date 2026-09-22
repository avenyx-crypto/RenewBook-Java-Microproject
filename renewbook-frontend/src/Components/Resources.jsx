import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import'./ResourceCSS.css'

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Fetch resources from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/resources")
      .then((response) => response.json())
      .then((data) => {
        setResources(data);
      })
      .catch((error) => {
        console.error("Error fetching resources:", error);
      });
  }, []);

  // Search and filter
  const filteredResources = resources.filter((resource) => resource.verificationStatus === "Approved").filter((resource) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      (resource.resourceName || "").toLowerCase().includes(searchText) ||
      (resource.subject || "").toLowerCase().includes(searchText) ||
      (resource.category || "").toLowerCase().includes(searchText) ||
      (resource.resourceType || "").toLowerCase().includes(searchText) ||
      (resource.description || "").toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All" ||
      resource.category?.toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Request a resource
  const requestResource = (resourceId) => {
    const savedUser = localStorage.getItem("user");

    const loggedUser = savedUser
      ? JSON.parse(savedUser)
      : null;

    if (!loggedUser) {
      alert("Please login before requesting a resource.");
      return;
    }

    fetch("http://localhost:8080/api/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        resourceId: resourceId,
        studentName: loggedUser.name
      })
    })
      .then((response) => {
        if (response.ok) {
          alert("Resource requested successfully! 📚");
        } else {
          alert("Failed to request resource.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Could not connect to backend.");
      });
  };

  return (
    <>
      <Navbar />

      <main>
        <h1>Academic Resources</h1>

        <p>
          Find textbooks, notes, lab manuals and other useful
          academic resources shared by students.
        </p>

        {/* Search */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search for a resource..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="filters">

          <button
            className={category === "All" ? "active-filter" : ""}
            onClick={() => setCategory("All")}
          >
            All
          </button>

          <button
            className={category === "Textbook" ? "active-filter" : ""}
            onClick={() => setCategory("Textbook")}
          >
            Textbooks
          </button>

          <button
            className={category === "Notes" ? "active-filter" : ""}
            onClick={() => setCategory("Notes")}
          >
            Notes
          </button>

          <button
            className={category === "Lab Manual" ? "active-filter" : ""}
            onClick={() => setCategory("Lab Manual")}
          >
            Manuals
          </button>

          <button
            className={category === "Project" ? "active-filter" : ""}
            onClick={() => setCategory("Project")}
          >
            Projects
          </button>

          <button
            className={category === "Calculator" ? "active-filter" : ""}
            onClick={() => setCategory("Calculator")}
          >
            Instruments
          </button>

        </div>

        {/* Resource Cards */}
        <div className="resource-container">

          {filteredResources.length === 0 ? (
            <p>No resources found.</p>
          ) : (

            filteredResources.map((resource) => (

              <div
                className="resource-card"
                key={resource.id}
              >

                <h2>{resource.resourceName}</h2>

                <p>
                  Type: {resource.category}
                </p>

                <p>
                  Subject: {resource.subject}
                </p>

                <p>
                  Resource Type: {resource.resourceType}
                </p>

                <p>
                  {resource.description}
                </p>

                {resource.availabilityStatus === "Available" ? (
                  <button onClick={() => requestResource(resource.id)}>
                    Request Resource
                  </button>
                ) : (
                  <p><strong>Status:</strong> Currently Borrowed</p>
                )}

              </div>

            ))

          )}

        </div>
      </main>
    </>
  );
};

export default Resources;