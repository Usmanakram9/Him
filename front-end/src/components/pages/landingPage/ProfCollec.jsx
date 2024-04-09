import React from 'react';
import '../../../assets/css/ProfColl.css';
import bg from '../../../assets/images/bg.jpg';

const ProfCollec = () => {
  return (
    <>
   <div className='prof'>
  <div className="overlay"></div>
  <div className="flex flex-col md:flex-col md:w-full h-screen lg:flex-col  w-full md:p-5 lg:p-5 mt-20 text-white">
    <div className="flex flex-col mt-20 ">
    <div className="flex text-white">YOUR DREAM AWAITS</div>
    <div className="flex pt-5 md:text-5xl text-2xl">Professional <span className='ml-2 border-b border-b-8 border-cyan-800'>Collections</span></div>

   
    </div>
    <div className="img md:flex-row flex-col items-center flex h-3/4 w-full  md:h-screen md:justify-between mt-10 space-x-10">
<div className="b1  ml-2 flex flex-col text-white md:w-full h-1/4 md:h-3/4 md:w-1/4">
  <img src={bg} className='h-3/4 hover:transform transition-transform duration-300 hover:rotate-3' alt="bg" />
  <div className="caption mt-2">LIMESTONE</div>
</div>
<div className="b1 flex flex-col text-white md:w-full h-1/4 md:h-3/4 md:w-1/4">
  <img src={bg} className='h-3/4 hover:transform hover:rotate-3 transition-transform duration-300'  alt="bg" />
  <div className="caption mt-2">MARBLE</div>
    </div>
    <div className="b1 flex flex-col text-white md:w-full h-1/4 md:h-3/4 md:w-1/4">
  <img src={bg} className='h-3/4 hover:transform hover:rotate-3 transition-transform duration-300' alt="bg" />
  <div className="caption mt-2">GLACIER SPLIT FACE CLADDING</div>

</div>
<div className="b1 flex flex-col text-white md:w-full h-1/4 md:h-3/4 md:w-1/4">
  <img src={bg} className='h-3/4 hover:transform hover:rotate-3 transition-transform duration-300' alt="bg" />
  <div className="caption mt-2">DECORATIVE & MOSAIC TILES</div>
</div>

    </div>
  </div>
  
</div>
    </>
  )
}

export default ProfCollec