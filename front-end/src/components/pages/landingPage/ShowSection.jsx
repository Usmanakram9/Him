import React, { useState, useEffect } from 'react';
import bg from '../../../assets/images/bath.jpg';
import '../../../assets/css/ShowSection.css'

const ShowSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  

  useEffect(() => {
    const handleScroll = () => {
      // Calculate the distance from the top of the document to the top of the viewport
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Define the scroll position at which the animation should start
      const scrollTrigger = 400; // Adjust this value as needed

      if (scrollTop > scrollTrigger) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
    <div className="flex flex-col md:flex-col md:w-full h-screen lg:flex-row justify-between w-full md:p-5 lg:p-5 overflow-hidden ">

    <div className={`flex flex-col w-full md:w-full lg:w-1/2 p-5 ${isVisible ? 'animate-left' : 'opacity-0 -translate-x-full'}`}>
<div className="flex flex-col space-y-4">
    <p className='text-gray-500'>SUSTAINABLE BATHROOM DREAMS</p>
    <div className="flex w-full items-end text-5xl mb-4 font-bold">
    Creating Beautiful Bathrooms That Inspire
            </div>
            <div className="des">
            With years of experience and a passion for design, we specialize in creating stunning Bathrooms that combine functionality and style. From concept to delivery, our team of experts will work closely with you to bring your vision to life.
            </div>
            <div className="moreDes">
            We understand that the Bathroom is the heart of the home, and it should be designed to reflect your individual style and lay out a space for fulfilling your culinary passions.
            </div>
            <div className="flex gap-x-1">
            <button
              type="submit"
              className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gradient-to-r from-cyan-600 to-cyan-800 hover:from-cyan-700 hover:to-cyan-900 focus:shadow-outline focus:outline-none"
            >
              Explore Products
            </button>
            <a
              href="/"
              aria-label=""
              className="inline-flex hover:text-white hover:bg-black rounded items-center border border-2 border-black border-solid font-semibold h-12 px-6 mr-6"
            >
              Contact Us
            </a>
          </div>

          
     </div>


    </div>

   
    <div className={`flex flex-col w-full md:w-full lg:w-1/2 p-5 ${isVisible ? 'animate-right' : 'opacity-0 translate-x-full'}`}>
<img src={bg} className=' h-4/4 w-4/4 md:w-full lg:w-full lg:h-screen md:h-3/4 rounded' alt="imageOf" />
    </div>
        </div>
  
    </>
  )
}

export default ShowSection