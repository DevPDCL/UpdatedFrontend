import React, { useEffect, useState } from "react";
import { Sidemenu } from "../components";
import img from "../assets/link.webp";
import "./tabs.css";

const ImageComponent = ({ src, alt, width, height, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading="lazy"
      srcset={`${src} 1x, ${src.replace(".jpg", "@2x.jpg")} 2x`}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
    />
  );
};

const Tech = ({ message, children }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < window.innerHeight / 0.25); // Adjust threshold as needed
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);

  return (
    <>
      <footer className="flex flex-row flex-wrap justify-center">
        <div className="bg-[#00984a] mx-auto w-full">
          <Sidemenu />
          <form className="max-w-screen-xl mx-auto sm:w-[80%] items-center justify-center">
            <div className="grid md:grid-cols-3 md:gap-1 ">
              <div className=" p-10  text-start">
                <h2 className="mb-6 text-[18px] font-bold font-ubuntu text-white uppercase dark:text-white">
                  Contact Us
                </h2>
                <ul className="text-white dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="#" className="font-ubuntu hover:underline">
                      House #16, Road # 2, Dhanmondi R/A, <br></br>Dhaka-1205,
                      Bangladesh
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="font-ubuntu hover:underline">
                      Phone : 09666 787801, 10636
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="font-ubuntu hover:underline">
                      E-mail : info@populardiagnostic.com
                    </a>
                  </li>
                </ul>
              </div>

              <div className="text-white p-10 text-start ">
                <div className=" ">
                  <h2 className="mb-6 font-bold font-ubuntu text-white uppercase dark:text-white">
                    Important Links
                  </h2>
                  <ul className="text-white dark:text-gray-400 font-medium">
                    <li className="mb-4">
                      <a
                        href="https://www.popular-pharma.com/"
                        target="_blank"
                        className="font-ubuntu hover:underline">
                        Popular Pharmaceuticals
                      </a>
                    </li>
                    <li className="mb-4">
                      <a
                        href="https://www.pmch-bd.org/"
                        target="_blank"
                        className="font-ubuntu hover:underline">
                        Popular Medical College
                      </a>
                    </li>
                    <li className="mb-4">
                      <a
                        href="https://www.popular-hospital.com/"
                        target="_blank"
                        className="font-ubuntu hover:underline">
                        Popular Medical College Hospital
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="text-white p-10 text-start">
                <h1 className="mb-6 font-bold font-ubuntu text-white uppercase dark:text-white">
                  Quick Links
                </h1>
                <ul className="text-white dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="#" className="font-ubuntu hover:underline">
                      Our Services
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="font-ubuntu hover:underline">
                      Our Branches
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="font-ubuntu hover:underline">
                      Call for Appointments
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="font-ubuntu hover:underline">
                      Find Doctors
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
        <div className="bg-[#00984a]  shadow-lg mx-auto w-full ">
          <div className=" flex mx-auto p-3 sm:w-[80%] justify-evenly max-w-screen-xl flex-wrap "></div>
          <ImageComponent
            src={img}
            alt="Payment Partners"
            className="flex mt-4 p-5 sm:w-[80%] sm:justify-center w-full max-w-7xl mx-auto"
            width="100%"
            height="auto"
          />
          <div className="bg-slate-900 shadow  px-4 py-6 mt-5 md:flex md:items-center md:justify-between ">
            <div className="flex  mt-4 sm:justify-center  md:mt-0 space-x-5 rtl:space-x-reverse max-w-7xl mx-auto">
              <span className="text-sm text-white font-ubuntu text-center dark:text-white sm:text-center me-auto">
                © Copyright 2024. <a href="">Popular Diagnostic Centre Ltd.</a>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Tech;
