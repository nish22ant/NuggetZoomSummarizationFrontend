import RegisterForm from "./RegisterForm";
import Message from "./Message";
import "./Register.css";
import { useState } from "react";

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
  const [message, setMessage] = useState("");

  const handleMessage = (message: string) => {
    setMessage(message);
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Register</h1>
      <div className="register-pg">
        <RegisterForm />
        {message !== "" ? <Message /> : ""}
        
      </div>
    </>
  );
};

export default Register;
