import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navgation.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../../page/Login/AuthContext";

/**
 * Component for navigation bar.
 *
 * This component provides navigation links based on user authentication status.
 *
 * @function
 * @returns {JSX.Element} - JSX element representing the navigation bar.
 *
 * @version 1.0.0
 * @since 2023-08-08
 * @author Nishant
 */
const Navigation: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const authContext = useContext(AuthContext);

  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userData");
    authContext.setIsLoggedIn(false);
  };

  const handleAutoLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userData");
    authContext.setIsLoggedIn(false);
  };

  // Automatically log out after 5 minutes
  setTimeout(handleAutoLogout, 10 * 60 * 1000);

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    const storedUserData = localStorage.getItem("userData");
    if (storedToken && storedUserData) {
      authContext.setToken(storedToken);
      authContext.setIsLoggedIn(true);
      authContext.setUser(JSON.parse(storedUserData));
    }
  }, []); // Run this effect only once on component mount

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="/home">
        N.ai
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        onClick={handleToggleNav}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/home">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/summerize">
              Summerize
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contact">
              Contact Us
            </NavLink>
          </li>
          <li className="nav-item" >
            <NavLink className="nav-link" to="/about">
              About Us
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav">
          {authContext.isLoggedIn ? (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="" className="nav-link" onClick={handleLogout}>
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
