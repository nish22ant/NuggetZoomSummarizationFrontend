import { Link } from "react-router-dom";
import "./Profile.css";
import { useContext } from "react";
import { MD5 } from 'crypto-js';
import image_1 from "./../../assets/images/img_1.jpg";
import image_2 from "./../../assets/images/img_2.jpg";
import image_3 from "./../../assets/images/img_3.jpg";
import image_4 from "./../../assets/images/img_4.jpg";
import image_5 from "./../../assets/images/img_5.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../Login/AuthContext";

/**
 * Component for displaying user profile information.
 *
 * This component retrieves user data from the AuthContext or local storage,
 * generates a profile image based on the user's email hash, and displays
 * the user's profile information along with options to update or delete the account.
 *
 * @function
 * @returns {JSX.Element} - JSX element representing the user profile page.
 *
 * @version 1.0.0
 * @since 2023-08-08
 * @author Nishant
 */
const Profile = () => {
  const authContext = useContext(AuthContext);

  // Get user data from context or localStorage
  const user = authContext.user || JSON.parse(localStorage.getItem("userData") as string);

  // Generate hash and select profile image
  const email = user?.email;
  const hash = email ? MD5(email.toLowerCase()).toString() : "";
  const digit = hash ? (parseInt(hash.charAt(0), 16) % 5) + 1 : 1;
  const images = [image_1, image_2, image_3, image_4, image_5];
  const image = images[digit - 1];

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="card p-4 border rounded">
            <div className="card-body text-center">
              <h1 className="card-title">Profile</h1>
              <img src={image} alt={`Image ${digit}`} className="img-fluid" />
              <p>
                <strong>First Name:</strong> {user?.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {user?.lastName}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <div className="d-flex justify-content-center mt-3">
                <Link to="/update-user" className="btn btn-primary mr-2">
                  Update User
                </Link>
                <Link
                  to="/delete-user"
                  className="btn btn-danger"
                >
                  Delete User
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
