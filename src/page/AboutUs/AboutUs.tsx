import "./AboutUs.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RotatingText from "../../components/RotatingText/RotatingText";

/**
 * Component that renders the About Us page.
 *
 * This component displays information about the Lorem Ipsum bookstore.
 *
 * @function
 * @returns {JSX.Element} - JSX element representing the About Us page.
 *
 * @example Usage:
 * <AboutUs />
 *
 * @author Nishant
 */
const AboutUs = () => {
  return (
    <div className="container">
      <RotatingText phrases={["About Us", "About Us", "About Us"]} />
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="about-content">
          <h3>Welcome to nugget.ai</h3>
            <p>
              nugget.ai is an AI-powered HR Tech company. At our core, we
              believe science, technology and data can help us better understand
              the world! We combine science with AI to help people and companies
              solve relevant and meaningful challenges, through ethical and
              human-centered designed solutions.
            </p>
            <p>
              We offer a variety of technologies aimed at assisting recruiters
              and talent acquisition specialists. Our website can be found{" "}
              <a
                className=""
                href="https://www.nugget.ai/"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
