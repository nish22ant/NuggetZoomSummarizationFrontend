import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Register.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: ""
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
  
      if (response.ok) {
        setIsSuccess(true);
        setError("");
      } else {
        const responseData = await response.json();
        const serverError = responseData.error || "Registration failed.";
        setError(serverError);
      }
    } catch (error) {
      console.error("Error occurred while registering", error);
      setError("An error occurred while processing your request.");
    }
  };

  useEffect(() => {
    let redirectTimer: NodeJS.Timeout;

    if (isSuccess) {
      // Wait for 5 seconds and then redirect to /login
      redirectTimer = setTimeout(() => {
        navigate('/login');
      }, 5000);
    }

    return () => {
      // Clear the timer when the component unmounts
      clearTimeout(redirectTimer);
    };
  }, [isSuccess, navigate]);

  return (
    <>
      {isSuccess ? (
        <div style={{ textAlign: "center", width: "100%" }}>
          <h4>Registration successful!</h4>
          <p>Redirecting to login page in 5 seconds...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="register-form">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">First Name:</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name:</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date of Birth:</label>
            <input
              type="date"
              name="dateOfBirth"
              className="form-control"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default RegisterForm;
