import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Summerize.css";

const SummerizeForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    meetingTitle: "",
    file: null as File | null,
  });

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "");
    if (userData && userData.email) {
      setFormData((prevState) => ({
        ...prevState,
        email: userData.email,
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevState) => ({
      ...prevState,
      file: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const requestData = new FormData();
      requestData.append("email", formData.email);
      requestData.append("meetingTitle", formData.meetingTitle);
      if (formData.file) {
        requestData.append("file", formData.file);
      }

      const response = await axios.post(
        "https://063d-2607-9880-1b10-174-9d77-236e-5880-5069.ngrok-free.app/upload/upload",
        requestData
      );

      if (response.status === 200) {
        setIsSuccess(true); // Set the success state
      } else {
        console.error("Summarization failed");
      }
    } catch (error) {
      console.error("Error occurred while summarizing", error);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-50">
      <div className="summerize-form-container">
        {isSuccess ? (
          <div className="success-message">
            Check your email. You will receive the summary soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="summerize-form">
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Meeting Title:</label>
              <input
                type="text"
                name="meetingTitle"
                className="form-control"
                value={formData.meetingTitle}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">File:</label>
              <input
                type="file"
                name="file"
                accept="audio/*"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SummerizeForm;
