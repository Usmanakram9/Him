import React from 'react';
import worker from '../../../assets/images/worker.png';
import qoute from '../../../assets/images/qoute.png';
import kitchen from '../../../assets/images/kitchen.png';

const AboutInitial = () => {
  return (
    <>
    <div className="flex flex-col md:flex-col mt-5 md:w-full lg:flex-row justify-between w-full md:p-5 lg:p-5 ">
<div className="flex items-center w-full ">
<div className="flex h-full items-center">
        <img src={worker} alt='kitchen' />
    </div>
        <div className="flex flex-col md:w-full lg:w-full p-5 ">
          <div className="flex w-full">
            <div className="flex w-full text-3xl mb-4 font-bold">
            We Have Expert and Personable Team
            </div>
          
          </div>

          <div className="des flex">
            <p>
            Achieving excellence through results-driven solutions and personalized service
            </p>
          </div>
        </div>
        </div>

        <div className="flex items-center w-full ">
        <div className="flex  h-full items-center">
        <img src={kitchen} alt='kitchen' />
    </div>
        <div className="flex flex-col md:w-full lg:w-full p-5 ">
          <div className="flex w-full">
          <div className="flex w-full text-3xl mb-4 font-bold">
           Sustainable kitchen

            </div>
          
          </div>

          <div className="des flex">
            <p>
            Elevate your kitchen with eco-friendly and sustainable solutions.
            </p>
          </div>
        </div>
        </div>

        <div className="flex items-center w-full ">
    <div className="flex h-full items-center">
        <img src={qoute} alt='kitchen' />
    </div>
        <div className="flex flex-col md:w-full lg:w-full p-5 ">
          <div className="flex w-full">
          <div className="flex w-full text-3xl mb-4 font-bold">
            Get a custom Expertise Quote
            </div>
          
          </div>

          <div className="des flex w-full">
            <p>
            Unlock your dream space with a personalized quote tailored just for you.
            </p>
          </div>
        </div>
        </div>
      </div>
      </>
  )
}

export default AboutInitial