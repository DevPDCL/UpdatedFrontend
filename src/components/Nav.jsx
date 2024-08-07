import React from "react";
import { Link } from "react-router-dom";
import "@fontsource/ubuntu";
import { styles } from "../styles";

const Nav = () => {
  return (
    <>
      <nav
        className={`${styles.paddingX} shadow-lg w-full h-[35px] top-0 z-20 flex flex-col items-center justify-center bg-[#00984a]`}>
        <div className="w-full h-[30px]  flex flex-wrap items-center   justify-between max-w-7xl text-[#ffffff] ">
          <div className="flex flex-row items-center  justify-start me-auto">
            <div className="flex flex-row items-center justify-center">
              <svg
                className="w-4 h-4 fill-white hidden md:block"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path>
              </svg>
              <p className="pl-1 text-[15px] hidden md:block text-white font-extrabold font-ubuntu">
                24/7
              </p>
            </div>
            <div className="flex flex-row items-center justify-center ">
              <div className="text-white flex items-center">
                <svg
                  className="w-4 h-4 ml-2 fill-white"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M280 0C408.1 0 512 103.9 512 232c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-101.6-82.4-184-184-184c-13.3 0-24-10.7-24-24s10.7-24 24-24zm8 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm-32-72c0-13.3 10.7-24 24-24c75.1 0 136 60.9 136 136c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-48.6-39.4-88-88-88c-13.3 0-24-10.7-24-24zM117.5 1.4c19.4-5.3 39.7 4.6 47.4 23.2l40 96c6.8 16.3 2.1 35.2-11.6 46.3L144 207.3c33.3 70.4 90.3 127.4 160.7 160.7L345 318.7c11.2-13.7 30-18.4 46.3-11.6l96 40c18.6 7.7 28.5 28 23.2 47.4l-24 88C481.8 499.9 466 512 448 512C200.6 512 0 311.4 0 64C0 46 12.1 30.2 29.5 25.4l88-24z"></path>
                </svg>
                <h2
                  className={`pl-1 text-[18px]  font-extrabold   font-ubuntu`}>
                  10636{" "}
                  <span className={`text-[15px] pl-1 font-ubuntu font-normal`}>
                    (Dhanmondi)
                  </span>
                </h2>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center ">
              <Link to="/hotlines" className="text-white flex items-center">
                <h2
                  className={`text-[15px] underline pl-3 text font-ubuntu font-normal hidden md:block`}>
                  Other Branches <span> </span>
                </h2>
              </Link>
              <Link to="/hotlines" className="text-white flex items-center">
                <h2
                  className={`text-[15px] underline pl-3 text font-ubuntu font-normal md:hidden`}>
                  Hotlines <span> </span>
                </h2>
              </Link>
            </div>
          </div>
          <Link to="/complain" className="text-white flex items-center">
            <svg
              className="w-4 h-4 fill-white"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg">
              {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
              <path d="M215.4 96H144 107.8 96v8.8V144v40.4 89L.2 202.5c1.6-18.1 10.9-34.9 25.7-45.8L48 140.3V96c0-26.5 21.5-48 48-48h76.6l49.9-36.9C232.2 3.9 243.9 0 256 0s23.8 3.9 33.5 11L339.4 48H416c26.5 0 48 21.5 48 48v44.3l22.1 16.4c14.8 10.9 24.1 27.7 25.7 45.8L416 273.4v-89V144 104.8 96H404.2 368 296.6 215.4zM0 448V242.1L217.6 403.3c11.1 8.2 24.6 12.7 38.4 12.7s27.3-4.4 38.4-12.7L512 242.1V448v0c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64v0zM176 160H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16z"></path>
            </svg>
            <h2 className={`text-[15px] pl-1 pt-1 font-medium font-ubuntu`}>
              Complain and Advise
            </h2>
          </Link>
          <div className="flex flex-row items-start justify-start ms-auto">
            <a
              href="https://www.facebook.com/populardiagnostic"
              target="_blank"
              aria-label="Facebook"
              className="text-white p-1 pl-2 hidden md:block">
              <svg
                className="w-4 h-4 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19">
                <path
                  fill-rule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/company/populardiagnostic"
              target="_blank"
              aria-label="LinkedIn"
              className="text-white p-1 pl-2  hidden md:block">
              <svg
                className="w-4 h-4 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="8 2 8 19">
                <path
                  fill-rule="evenodd"
                  d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                  clip-rule="evenodd"
                />
                <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@populardiagnostic"
              target="_blank"
              aria-label="Visit our Youtube channel"
              className="text-white p-1 pl-2 mr-2 hover:text-gray-900 dark:hover:text-black  hidden md:block">
              <svg
                className="w-4 h-4 text-white"
                viewBox="0 0 576 512"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor">
                <path
                  d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
