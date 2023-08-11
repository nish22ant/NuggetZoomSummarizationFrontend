import ContactUsForm from "./ContactUsForm";
import RotatingText from "../../components/RotatingText/RotatingText";
import "./ContactUs.css"

/**
 * Component that renders the Contact Us page.
 *
 * This component displays a heading and includes the ContactUsForm component.
 *
 * @function
 * @returns {JSX.Element} - JSX element representing the Contact Us page.
 * 
 * @example Usage:
 * <ContactUs />
 * 
 * @author Nishant
 */
const ContactUs = () => {
  return (
    <div>
      <RotatingText phrases={["Get in Touch", "Reach Out to Us", "Connect with Us"]} />
      <ContactUsForm />
    </div>
  );
};

export default ContactUs;
