import React from "react";
import "../../../assets/css/ServInitital.css";

const ServInitial = () => {
  return (
    <>
      <div className="flex flex-col md:flex-col md:w-full lg:flex-row justify-between w-full md:p-5 lg:p-5 ">
        <div className="flex flex-col w-full md:w-full lg:w-1/2 p-5 ">
          <div className="flex w-full">
            <div className="flex w-1/2 items-end text-4xl mb-4 font-bold">
              Design and Consultation
            </div>
            <div>
              <p className="myt text-9xl" id="myt">
                01
              </p>
            </div>
          </div>

          <div className="des flex">
            <p>
              We collaborate with you to understand your vision and create a
              customized design plan that suits your style, budget, and
              timeline.
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-full lg:w-1/2 p-5 ">
          <div className="flex w-full">
            <div className="flex w-1/2 items-end text-4xl mb-4 font-bold">
            Material
Selection
            </div>
            <div>
              <p className="myt text-9xl" id="myt">
                02
              </p>
            </div>
          </div>

          <div className="des flex">
            <p>
            We guide you in choosing the perfect materials and our skilled craftsmen bring your project to life with meticulous attention to detail.
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-full lg:w-1/2 p-5 ">
          <div className="flex w-full">
            <div className="flex w-1/2 items-end text-4xl mb-4 font-bold">
              Customer Satisfaction
            </div>
            <div>
              <p className="myt text-9xl" id="myt">
                03
              </p>
            </div>
          </div>

          <div className="des flex">
            <p>
            We conduct thorough quality checks to ensure the final result meets our high standards, and we prioritize your satisfaction every step of the way.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServInitial;
