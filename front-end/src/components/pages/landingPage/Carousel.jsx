import React, { useEffect } from 'react';
import '../assets/css/Carousel.css';
import prd1 from '../assets/images/prd1.jpg';
import prd2 from '../assets/images/prd2.jpg';
import prd3 from '../assets/images/prd3.jpg';
import prd4 from '../assets/images/prd4.jpg';

const Carousel = () => {
  useEffect(() => {
    const mySlider = document.querySelectorAll(".mySlider");
    let counter = 1;
    let timer;

    function autoslide() {
      counter += 1;
      slideFun(counter);
    }

    function resetTimer() {
      if (timer) {
        clearInterval(timer);
      }
      timer = setInterval(autoslide, 2000);
    }

    function plusSlides(n) {
      counter += n;
      slideFun(counter);
      resetTimer();
    }

    function currentSlide(n) {
      counter = n;
      slideFun(counter);
      resetTimer();
    }

    function slideFun(n) {
      const index = document.querySelectorAll(".index");

      for (let i = 0; i < mySlider.length; i++) {
        mySlider[i].style.display = "none";
        mySlider[i].classList.add("hidden");
      }

      for (let i = 0; i < index.length; i++) {
        index[i].classList.remove("action");
      }

      if (n > mySlider.length) {
        counter = 1;
      }

      if (n < 1) {
        counter = mySlider.length;
      }

      if (mySlider[counter - 1].style.removeProperty) {
        mySlider[counter - 1].style.removeProperty("display");
      } else {
        mySlider[counter - 1].style.removeAttribute("display");
      }

      mySlider[counter - 1].classList.remove("hidden");
      mySlider[counter - 1].classList.add("md:grid", "md:grid-cols-3", "md:gap-4");
      index[counter - 1].classList.add("action");
    }


    // Initialize the timer
    resetTimer();

    // Clean up the timer on component unmount
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
    <div className='prod-carousel'>


    <section id='product-carousel' class="carousel-section  md:min-h-screen relative md:px-16 px-6 mx-auto container py-0 md:py-2">
      <div className=''>
      <h1 className="text-4xl md:text-4xl mt-16 font-bold text-white mb-16 text-center">Featured Products</h1>
      </div>
    <div class="mySlider hidden fade space-y-10 md:space-y-0 overflow-hidden">
    
      <div class="md:col-span-2 flex">
        <div class="w-full relative h-80 md:h-screen/2 rounded-lg shadow-2xl bg-black">
          <img class="w-full h-full img overflow-hidden rounded-lg object-cover" src={prd1} alt=""/>
        </div>
      </div>
  
      <div class="flex flex-col md:justify-center justify-between  ">
        <h2 class=" text-white text-base md:text-xl lg:text-4xl zen-dots font-bold mb-4 capitalize">Lasa White</h2>
        <div class="text-sm md:text-lg text-white my-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
         
      </div>
    </div>
    <div class="mySlider hidden fade space-y-10 md:space-y-0 overflow-hidden">
    
      <div class="md:col-span-2 flex">
        <div class="w-full relative h-80 md:h-screen/2 rounded-lg shadow-2xl bg-black">
          <img class="w-full h-full img overflow-hidden rounded-lg object-cover" src={prd2} alt="" />
        </div>
      </div>
      <div class="flex flex-col md:justify-center justify-between ">
        <h2 class=" text-white text-base md:text-4xl zen-dots lg:text-4xl font-bold mb-4 capitalize">Golden Spider</h2>
        <div class="text-sm md:text-lg text-white my-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
         
      </div>
    </div>
    <div class="mySlider hidden fade space-y-10 md:space-y-0 overflow-hidden">
  
      <div class="md:col-span-2 flex">
        <div class="w-full relative h-80 md:h-screen/2 rounded-lg shadow-2xl bg-black">
          <img class="w-full h-full img overflow-hidden rounded-lg object-cover" src={prd3} alt="" />
        </div>
      </div>
      <div class="flex flex-col md:justify-center justify-between ">
        <h2 class=" text-white text-base md:text-4xl lg:text-4xl font-bold mb-4 capitalize">Albascato</h2>
        <div class="text-sm md:text-lg text-white my-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
      </div>
    </div>
    <div class="mySlider hidden fade space-y-10 md:space-y-0 overflow-hidden">
  
      <div class="md:col-span-2 flex">
        <div class="w-full relative h-80 md:h-screen/2 rounded-lg shadow-2xl bg-black">
          <img class="w-full h-full img overflow-hidden rounded-lg object-cover" src={prd4} alt="" />
        </div>
      </div>
      <div class="flex flex-col md:justify-center justify-between ">
        <h2 class=" text-white text-base md:text-4xl lg:text-4xl font-bold mb-4 capitalize">Limestone</h2>
        <div class="text-sm md:text-lg text-white my-3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. </div>
         
      </div>
    </div>
    <div class="absolute top-24">
      <div class="grid grid-rows-4 mt-36 gap-4 p-2 place-items-center">
        <div class="index w-2 py-3 text-xs flex items-center border justify-center  border-gray-500" onclick="currentSlide(1)"></div>
        <div class="index w-2 py-3 text-xs flex items-center border justify-center  border-gray-500" onclick="currentSlide(2)"></div>
        <div class="index w-2 py-3 text-xs flex items-center border justify-center  border-gray-500" onclick="currentSlide(3)"></div>
        <div class="index w-2 py-3 text-xs flex items-center border justify-center  border-gray-500" onclick="currentSlide(4)"></div>
      </div>
    </div>
  </section>
  
  </div>
  </>
  );
};

export default Carousel;
