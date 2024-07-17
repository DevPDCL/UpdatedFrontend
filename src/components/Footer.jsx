import React, { useEffect, useState } from "react";
import img from "../assets/link.webp";
import "./tabs.css";
import "@fontsource/ubuntu";
import { Link } from "react-router-dom";
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

const Footer = ({ message, children }) => {
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
          <form className="max-w-screen-xl mx-auto sm:w-[80%] items-center justify-center">
            <div className="grid md:grid-cols-3 md:gap-1 ">
              <div className=" p-10  text-start">
                <h2 className="mb-6 text-[18px] font-bold font-ubuntu text-white uppercase">
                  Contact Us
                </h2>
                <ul className="text-white font-medium">
                  <li className="mb-4">
                    <a  className="font-ubuntu">
                      House #16, Road # 2, Dhanmondi R/A, <br></br>Dhaka-1205,
                      Bangladesh
                    </a>
                  </li>
                  <li className="mb-4">
                    Phone : {""}
                    <a
                      href="tel:09666787801"
                      className="font-ubuntu hover:underline">
                      09666 787801,{" "}
                    </a>
                    <a href="tel:10636" className="font-ubuntu hover:underline">
                      10636
                    </a>
                  </li>
                  <li className="mb-4">
                    E-mail: {""}
                    <a
                      href="mailto:info@populardiagnostic.com"
                      className="font-ubuntu hover:underline">
                      info@populardiagnostic.com
                    </a>
                  </li>
                </ul>
              </div>

              <div className="text-white p-10 text-start ">
                <div className=" ">
                  <h2 className="mb-6 font-bold font-ubuntu text-white uppercase ">
                    Important Links
                  </h2>
                  <ul className="text-white font-medium">
                    <li className="mb-4">
                      <a
                        href="https://www.popular-hospital.com/"
                        target="_blank"
                        className="font-ubuntu hover:underline">
                        Popular Medical College Hospital
                      </a>
                    </li>
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
                   
                  </ul>
                </div>
              </div>
              <div className="text-white p-10 text-start">
                <h1 className="mb-6 font-bold font-ubuntu text-white uppercase ">
                  Quick Links
                </h1>
                <ul className="text-white font-medium">
                  <li className="mb-4">
                    <a href="#" className="font-ubuntu hover:underline">
                      Our Services
                    </a>
                  </li>
                  <li className="mb-4">
                    <Link to="/branch" className="font-ubuntu hover:underline"> Our
                      Branches
                    </Link>
                  </li>
                  <li className="mb-4">
                    <a
                      href="http://appointment.populardiagnostic.com/appointment"
                      target="blank"
                      className="font-ubuntu hover:underline">
                      Call for Appointments
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="/doctorsearch"
                      target="blank"
                      className="font-ubuntu hover:underline">
                      {" "}
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
          <div className="bg-slate-900 py-6 mt-5 md:flex">
            <div className="flex sm:justify-between items-center mx-auto lg:gap-24">
              <p className="text-sm text-white font-ubuntu text-center sm:text-center me-auto">
                © Copyright 2024. Popular Diagnostic Centre Ltd.
              </p>
              <div className="flex text-white gap-5">
                <Link to="/terms&conditions">
                  <p>Terms and Conditions</p>
                </Link>
                <Link to="/privacy&policy">
                  {" "}
                  <p>Privacy Policy</p>
                </Link>
                <Link to="/refund">
                  <p>Refund & Return Policy</p>
                </Link>
              </div>
              <p className="text-sm text-white font-ubuntu text-center sm:text-center me-auto">
                24298000 <span>Total Views</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
