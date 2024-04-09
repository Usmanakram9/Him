import React from 'react';
import bg4 from "../../../assets/images/bg.jpg";
import bg2 from "../../../assets/images/product3.jpg";
import bg3 from "../../../assets/images/product4.jpg";
import '../../../assets/css/Gallery.css';

const Gallery = () => {
  return (
    <>
   <div className="gall flex flex-col w-full p-10 ">
        <div className="flex flex-col pb-2">
          <div className="head">
            <div className="flex text-gray-500">UNVEILING THE EPITOME OF LUXURY</div>
          </div>
          <div className="des">
            <div className="flex pt-2 md:text-5xl text-2xl font-bold">
            Stunning{" "}
              <span className="ml-2 border-b border-b-8 border-cyan-800 mr-2 font-bold">
              Portfolio{" "}
              </span>{" "}
             
            </div>
          </div>
        </div>
        
        <div className="h-full flex space-x-8 justify-between mt-10">


            <div className="flex flex-col overflow-hidden h-full rounded w-1/3 ">
    <div className="overflow-hidden h-full">
    <img src={bg4} className='imggg w-full h-full rounded' alt="first" />
    </div>
               
                <div className="flex">adsf</div>
            </div>
            <div className="flex flex-col overflow-hidden h-full rounded w-1/3 ">
            <div className="overflow-hidden h-full">
            <img src={bg2} className='imggg w-full h-full rounded overflow-hidden' alt="first" />
            </div>
            <div className="flex">adsf</div>
            </div>
            <div className="flex flex-col overflow-hidden h-full rounded w-1/3 ">
            <div className="overflow-hidden h-full">
                 <img src={bg3} className='imggg w-full h-full rounded overflow-hidden' alt="first" />
                 </div>
                 <div className="flex">adsf</div>
            </div>
        </div>
        
        <div className="flex justify-center mt-4">
        <button  className="border border-2 border-black text-black font-bold hover:bg-black hover:text-white focus:shadow-outline py-2 px-4 rounded transition-colors duration-1000" >
       View Portfolio
        </button>
      </div>
        </div>
    
    </>
  )
}

export default Gallery