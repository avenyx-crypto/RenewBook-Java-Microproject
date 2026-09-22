import React, { useState } from "react";
import Navbar from "./Navbar";
import './ShareResCSS.css'

const ShareResource = () => {

  const [formData, setFormData] = useState({
    resourceName: "",
    subject: "",
    category: "Textbook",
    resourceType: "Exchange",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get logged-in student
    const savedUser = localStorage.getItem("user");

    const loggedUser = savedUser
      ? JSON.parse(savedUser)
      : null;

    if (!loggedUser) {
      alert("Please login before sharing a resource.");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:8080/api/resources",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...formData,
            ownerName: loggedUser.name
          })
        }
      );

      if (response.ok) {

        alert("Resource shared successfully! ");

        setFormData({
          resourceName: "",
          subject: "",
          category: "Textbook",
          resourceType: "Exchange",
          description: ""
        });

      } else {

        alert("Failed to share resource.");

      }

    } catch (error) {

      console.error(error);
      alert("Could not connect to the backend.");

    }
  };

  return (
    <>
      <Navbar />

      <div className="share-page">

        <h1>Share a Resource</h1>

        <p>Give your academic resources a second life.</p>

        <form onSubmit={handleSubmit}>

          <label>Resource Name</label>

          <input
            type="text"
            name="resourceName"
            value={formData.resourceName}
            onChange={handleChange}
            placeholder="Example: Data Structures Lab Manual"
            required
          />

          <label>Subject</label>

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Example: Data Structures"
            required
          />

          <label>Category</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option>Textbook</option>
            <option>Notes</option>
            <option>Lab Manual</option>
            <option>Project</option>
            <option>Calculator</option>
            <option>Drawing Instrument</option>
            <option>Project Material</option>
          </select>

          <label>Resource Type</label>

          <select
            name="resourceType"
            value={formData.resourceType}
            onChange={handleChange}
          >
            <option>Exchange</option>
            <option>Donation</option>
          </select>

          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the condition or details of the resource..."
            rows="5"
          />

          <button type="submit">
            Share Resource
          </button>

        </form>

      </div>
    </>
  );
};

export default ShareResource;