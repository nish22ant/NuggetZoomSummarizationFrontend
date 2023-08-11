import RegisterForm from "./RegisterForm";
import "./Register.css";

/**
 * Component for user registration page.
 *
 * This component displays a registration form and a message section to show registration status.
 *
 * @function
 * @returns {JSX.Element} - JSX element representing the user registration page.
 *
 * @version 1.0.0
 * @since 2023-08-08
 * @author Nishant
 */

const Register = () => {


  return (
    <>
      <h1 style={{ textAlign: "center" }}>Register</h1>
      <div className="register-pg">
        <RegisterForm />
        
      </div>
    </>
  );
};

export default Register;
