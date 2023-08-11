import React, { useState, useContext, useEffect } from "react";
import { Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { AuthContext, AuthContextProps } from "./AuthContext";

const Login = () => {
  const authContext = useContext(AuthContext) as AuthContextProps;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    const storedUserData = localStorage.getItem("userData");
    if (storedToken && storedUserData) {
      authContext.setToken(storedToken);
      authContext.setIsLoggedIn(true);
      authContext.setUser(JSON.parse(storedUserData));
    }
  }, []);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/users/login`,
        {
          email: username,
          password: password,
        }
      );

      authContext.setIsLoggedIn(true);
      authContext.setUser(response.data.user);
      const token = "bearer " + response.data.token;
      authContext.setToken(token);

      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userData", JSON.stringify(response.data.user));

      setUsername("");
      setPassword("");
      setError("");

      // Redirect to the '/summerize' route after successful login
      navigate('/summerize');
    } catch (error) {
      console.error(error);
      setError("Incorrect username or password");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center login-container">
      <div className="login-form-container">
        {authContext.isLoggedIn ? (
          <h1>Welcome, {authContext.user?.firstName}!</h1>
        ) : (
          <>
            <h1 style={{ textAlign: "center" }}>Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className={`form-control ${error ? "is-invalid" : ""}`}
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className={`form-control ${error ? "is-invalid" : ""}`}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              {error && <div className="error-message">{error}</div>}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            <div className="text-center mt-2">
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
