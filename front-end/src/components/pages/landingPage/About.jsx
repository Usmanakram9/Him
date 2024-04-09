import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faShippingFast, faHandshake } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/About.css';

const About = () => {
  return (
    <section id="about" className="about-section bg-gray-100 py-6 md:py-10">
      <div className="container mt-16 mx-auto flex-col items-center justify-center md:mt-32">
        <div className="text-white text-center text-3xl md:text-5xl font-bold opacity-50 mb-2 md:mb-4 font-thin tracking-wider animate__animated animate__fadeInLeft">
          About Us
        </div>
        <div className="text-white text-base md:text-xl mt-4 md:mt-8 text-center">
          Welcome to Himalayas Enterprises, your premier source for high-quality marbles. We are dedicated to providing the best products to enhance the beauty of your spaces.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-8">
          {/* Feature 1 */}
          <div className="text-white text-center mb-4 md:mb-8 flex flex-col justify-center">
            <FontAwesomeIcon icon={faCheckCircle} size="2x" color="white" className="mb-2" />
            <h2 className="text-md md:text-xl font-bold mb-2">Premium Quality</h2>
            <p className="text-xs md:text-sm min-h-[60px]">Our marbles are sourced from the finest quarries, ensuring top-notch quality for your projects.</p>
          </div>

          {/* Feature 2 */}
          <div className="text-white text-center mb-4 md:mb-8 flex flex-col justify-center">
            <FontAwesomeIcon icon={faShippingFast} size="2x" color="white" className="mb-2" />
            <h2 className="text-md md:text-xl font-bold mb-2">Fast Delivery</h2>
            <p className="text-xs md:text-sm min-h-[60px]">We understand the importance of timely delivery. Expect swift and secure shipping with us.</p>
          </div>

          {/* Feature 3 */}
          <div className="text-white text-center mb-4 md:mb-8 flex flex-col justify-center">
            <FontAwesomeIcon icon={faHandshake} size="2x" color="white" className="mb-2" />
            <h2 className="text-md md:text-xl font-bold mb-2">Customer Satisfaction</h2>
            <p className="text-xs md:text-sm min-h-[60px]">Your satisfaction is our priority. Our team is committed to ensuring you have a delightful experience with us.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
