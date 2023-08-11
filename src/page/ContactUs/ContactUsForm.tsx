import React, { useState } from "react";

/**
 * Component that renders a contact form.
 *
 * This component provides a form for users to input their name, email, and message.
 * It handles form submission and displays a success message after submission.
 *
 * @function
 * @returns {JSX.Element} - JSX element representing the contact form.
 * 
 * @example Usage:
 * <ContactUsForm />
 * 
 * @version 1.0.0
 * @since 2023-08-08
 * @author Nishant
 */
const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false); // Track submission status

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <form
        onSubmit={handleSubmit}
        className="card p-4"
        style={{ border: "1px solid #dee2e6", borderRadius: "10px", width: "400px" }}
      >
        {submitted ? (
          <p className="text-success mb-3">Message sent!</p>
        ) : null}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message:
          </label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            className="form-control"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;
