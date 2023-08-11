import SummerizeForm from "./SummerizeForm";
import RotatingText from "../../components/RotatingText/RotatingText";
import { Link } from "react-router-dom";

/**
 * Component for the "Summerize" page.
 *
 * This component displays the "Summerize" page, which includes a form for summarizing content.
 * If the user is not logged in, a message and login link are displayed.
 *
 * @function
 * @returns {JSX.Element} - JSX element representing the "Summerize" page.
 *
 * @version 1.0.0
 * @since 2023-08-08
 * @author Nishant
 */

const Summerize = () => {
  // Check if there is data in local storage
  const isLocalStorageEmpty =
    !localStorage.getItem("jwtToken") || !localStorage.getItem("userData");

  return (
    <div>
      {/* <h1 style={{ textAlign: "center" }}>Summerize</h1> */}

      <RotatingText phrases={["Summarize", "Condense", "Synopsize"]} />
      {isLocalStorageEmpty ? (
        <div style={{ textAlign: "center" }}>
          <h3>Please login to access the summerize form.</h3>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      ) : (
        <SummerizeForm />
      )}
    </div>
  );
};

export default Summerize;
