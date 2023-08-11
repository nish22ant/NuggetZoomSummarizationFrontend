import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Login/AuthContext";
import axios from "axios";
import "./UpdateUser.css";

/**
 * Component for updating user information.
 *
 * This component allows an authenticated user to update their first name and last name.
 *
 * @function
 * @returns {JSX.Element} - JSX element representing the user update form.
 *
 * @version 1.0.0
 * @since 2023-08-08
 * @author Nishant
 */
const UpdateUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URI}/users/update/${authContext.user?.email}`,
        {
          firstName: firstName,
          lastName: lastName,
        },
        {
          headers: {
            Authorization: authContext.token,
          },
        }
      );
      // Handle successful update
      console.log("User updated:", response.data.user);
      // Redirect to /profile
      authContext.setUser(response.data.user);
      navigate("/profile");
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <div className="update-user-container">
      {authContext.isLoggedIn ? (
        <div className="update-user-form">
          <h1 style={{ textAlign: "center" }}>Update User</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      ) : (
        <div className="not-authorized-message">Not Authorized</div>
      )}
    </div>
  );
};

export default UpdateUser;
