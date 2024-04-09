import React from 'react';
import { TiTickOutline } from "react-icons/ti";
import bg from '../assets/images/bg.jpg';

const AboutUs = () => {
  return (
   <>
   
   <div className="flex flex-col lg:flex-row h-screen w-full justify-between p-10 mt-5">

  <div className="flex flex-col lg:w-1/3">

    <div className="head">
      <div className="flex items-center mb-2">
        <div className="w-8 h-1 bg-gradient-to-r from-cyan-600 to-cyan-800 hover:from-cyan-700 hover:to-cyan-900 focus:shadow-outline mr-2"></div> {/* Vertical line */}
        <h2 className="text-2xl font-bold text-cyan-900">About Us</h2> {/* About Us text */}
      </div>
    </div>

    <div className="flex text-lg lg:text-5xl mb-4">We Have A To Of Fun Process We Grow</div>
    <div className="flex flex-wrap items-center">
      <div className="mr-4">
        <TiTickOutline className='ml-2 text-2xl text-cyan-900' />
      </div>
      <div>
        Come to Our Himalaya Store for a Visit
      </div>
    </div>
    <div className="flex flex-wrap mt-2 items-center">
      <div className="mr-4">
        <TiTickOutline className='ml-2 text-2xl text-cyan-900' />
      </div>
      <div>
        Take Your time to choose our collection
      </div>
    </div>
    <div className="flex flex-wrap mt-2 items-center">
      <div className="mr-4">
        <TiTickOutline className='ml-2 text-2xl text-cyan-900' />
      </div>
      <div>
        Let's Find the Best Natural Stone
      </div>
    </div>
    <div className="flex flex-wrap mt-2 mb-4 items-center">
      <div className="mr-4">
        <TiTickOutline className='ml-2 text-2xl text-cyan-900' />
      </div>
      <div>
        Delivery & Installation
      </div>
    </div>

    <div className="flex items-center mt-4">
      <div className="rounded-full overflow-hidden h-8 w-8 mr-2">
        <img src="image.jpg" alt="ProfileImage" />
      </div>
      <div>
        <p className="font-semibold">Muhammad Waheed</p>
        <p className="text-sm text-gray-600">Manager</p>
      </div>
    </div>

  </div>

  <div className="hidden md:flex md:w-1/4 lg:flex lg:w-1/3 justify-center">
  <img src={bg} alt='imag' className="object-cover w-full h-full rounded" />
</div>

  <div className="flex flex-col w-full lg:w-1/3 ml-2 justify-center lg:justify-start mt-4 lg:mt-0">

<div className="flex text-lg lg:text-5xl mb-4 text-gray-700">Provide Solutions Of Every Kind</div>

<div className="flex">
  <p>
    Providing solutions to its customers,<span className='text-cyan-900'> Himalaya Enterprises </span> can take a consultative approach, working closely with clients to understand their needs & preferences.
  </p>
</div>

<div className="p-4">
  <h2 className="text-lg font-semibold mb-2">Marble Slab Sales</h2>
  <div className="bg-gray-200 h-4 rounded-lg">
    <div className="bg-gradient-to-r from-cyan-600 to-cyan-800 hover:from-cyan-700 hover:to-cyan-900 focus:shadow-outline h-full rounded-lg lg:w-full"></div>
  </div>
</div>

<div className="p-4">
  <h2 className="text-lg font-semibold mb-2">Installation Services</h2>
  <div className="bg-gray-200 h-4 rounded-lg">
    <div className="bg-gradient-to-r from-cyan-600 to-cyan-800 hover:from-cyan-700 hover:to-cyan-900 focus:shadow-outline h-full rounded-lg lg:w-full"></div>
  </div>
</div>

<div className="p-4">
  <h2 className="text-lg font-semibold mb-2">Commercial Projects</h2>
  <div className="bg-gray-200 h-4 rounded-lg">
    <div className="bg-gradient-to-r from-cyan-600 to-cyan-800 hover:from-cyan-700 hover:to-cyan-900 focus:shadow-outline h-full rounded-lg lg:w-full"></div>
  </div>
</div>

</div>


</div>

   </>
  )
}

export default AboutUs