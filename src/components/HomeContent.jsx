import React, { useRef, useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { logo } from "../assets";
import { healthPakage } from "../constants";
import { fadeIn } from "../utils/motion";
import video from "../assets/contacts.mp4";
import { styles } from "../styles";
import "@fontsource/ubuntu";
import { Link } from "react-router-dom";

function Number({ n }) {
  const countRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        // Start the animation when the element is visible
        setIsVisible(true);
      }
    });

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [countRef.current]);

  const [isVisible, setIsVisible] = useState(false);
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 500,
    config: { mass: 1, tension: 10, friction: 10 },
  });
  return (
    <div ref={countRef} className="count-section">
      {isVisible && (
        <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
      )}
    </div>
  );
}

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  video,
  source_code_link,
  link,
}) => {
  return (
    <div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <div className="grid md:grid-row-3 items-center sm:w-[379px] w-full justify-center mx-auto  md:gap-0 transition-transform duration-700 transform hover:-translate-y-3">
        <div className="text-black m-2 bg-gradient-to-b from-[#F5FFFA]/0 to-[#f0fff0]/60  shadow-md rounded-xl  w-auto text-center">
          <div className="relative w-auto h-auto">
            <video
              src={video}
              alt="project_image"
              className="w-full h-[230px] rounded-t-xl object-cover opacity-90"
              autoPlay
              loop
              muted
            />

            <div className="absolute inset-0 flex justify-end p-3 card-img_hover">
              <div
                onClick={() => window.open(source_code_link, "_blank")}
                className="green-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer">
                <img
                  src={logo}
                  alt="source code"
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
            </div>
          </div>

          <div className="mt-0 p-5">
            <h3 className="text-gray-900 font-medium p-2 font-ubuntu text-[24px]">
              {name}
            </h3>
            <p className="mt-2 text-gray-500 font-medium font-ubuntu p-2 text-[16px]">
              {description}
            </p>
          </div>
          <div className="flex justify-center items-center pb-5">
            <button
              onClick={() => window.open(link, "_blank")}
              className="text-gray-500 font-ubuntu transition duration-300">
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeContent = () => {
  return (
    <>
      <div className="relative pt-12 fontFamily-ubuntu">
        <div className=" overflow-hidden  mt-[-140px] py-24 sm:py-32">
          <div className="mx-auto">
            <div className="flex flex-wrap justify-center items-center py-5">
              <div className="flex flex-col lg:flex-row gap-5 mx-auto ">
                <div className="p-5 items-center flex flex-row gap-5 mx-auto text-center hover:scale-110 transition duration-500 group">
                  <div className="rounded-full p-3 border-2 border-dashed border-gray-600 hover:scale-110 group-hover:bg-gray-600 transition duration-500">
                    <svg
                      className="w-[40px] h-[60px] fill-gray-600 group-hover:fill-white group-hover:-rotate-12 transition duration-500  "
                      viewBox="0 0 640 512"
                      xmlns="http://www.w3.org/2000/svg">
                      {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                      <path d="M192 48c0-26.5 21.5-48 48-48H400c26.5 0 48 21.5 48 48V512H368V432c0-26.5-21.5-48-48-48s-48 21.5-48 48v80H192V48zM48 96H160V512H48c-26.5 0-48-21.5-48-48V320H80c8.8 0 16-7.2 16-16s-7.2-16-16-16H0V224H80c8.8 0 16-7.2 16-16s-7.2-16-16-16H0V144c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v48H560c-8.8 0-16 7.2-16 16s7.2 16 16 16h80v64H560c-8.8 0-16 7.2-16 16s7.2 16 16 16h80V464c0 26.5-21.5 48-48 48H480V96H592zM312 64c-8.8 0-16 7.2-16 16v24H272c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h24v24c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16V152h24c8.8 0 16-7.2 16-16V120c0-8.8-7.2-16-16-16H344V80c0-8.8-7.2-16-16-16H312z"></path>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-gray-600 text-center font-bold font-ubuntu text-[40px]">
                      <Number n={22} />
                    </h2>
                    <p className="text-gray-500 text-center font-bold font-ubuntu text-[16px]">
                      BRANCHES
                    </p>
                  </div>
                </div>
                <div className="flex mx-auto group">
                  <div className="p-5 items-center flex flex-row gap-5 mx-auto text-center hover:scale-110 transition duration-500 group">
                    <div className="rounded-full p-3 border-2 border-dashed border-gray-600 hover:scale-110 group-hover:bg-gray-600 transition duration-500">
                      <svg
                        className="w-[40px] h-[60px] fill-gray-600 group-hover:fill-white group-hover:-rotate-12 transition duration-500  "
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg">
                        {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                        <path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96v32V480H384V128 96 56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM96 96h24C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H96V96zM416 480h32c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H416V480zM224 208c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v48h48c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H288v48c0 8.8-7.2 16-16 16H240c-8.8 0-16-7.2-16-16V320H176c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h48V208z"></path>
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-gray-600 text-center font-bold font-ubuntu text-[40px]">
                        <div className="flex items-center justify-center">
                          <Number n={7} />
                          <span>k+</span>
                        </div>
                      </h2>
                      <p className="text-gray-500 text-center font-bold font-ubuntu text-[16px]">
                        SERVICES
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex mx-auto group">
                  <div className="p-5 items-center flex flex-row gap-5 mx-auto text-center hover:scale-110 transition duration-500 group">
                    <div className="rounded-full p-3 border-2 border-dashed border-gray-600 hover:scale-110 group-hover:bg-gray-600 transition duration-500">
                      <svg
                        className="w-[40px] h-[60px] fill-gray-600 group-hover:fill-white group-hover:-rotate-12 transition duration-500  "
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg">
                        {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zm53.5-96.7l0 0 0 0-.2-.2c-.2-.2-.4-.5-.7-.9c-.6-.8-1.6-2-2.8-3.4c-2.5-2.8-6-6.6-10.2-10.3c-8.8-7.8-18.8-14-27.7-14s-18.9 6.2-27.7 14c-4.2 3.7-7.7 7.5-10.2 10.3c-1.2 1.4-2.2 2.6-2.8 3.4c-.3 .4-.6 .7-.7 .9l-.2 .2 0 0 0 0 0 0c-2.1 2.8-5.7 3.9-8.9 2.8s-5.5-4.1-5.5-7.6c0-17.9 6.7-35.6 16.6-48.8c9.8-13 23.9-23.2 39.4-23.2s29.6 10.2 39.4 23.2c9.9 13.2 16.6 30.9 16.6 48.8c0 3.4-2.2 6.5-5.5 7.6s-6.9 0-8.9-2.8l0 0 0 0zm160 0l0 0-.2-.2c-.2-.2-.4-.5-.7-.9c-.6-.8-1.6-2-2.8-3.4c-2.5-2.8-6-6.6-10.2-10.3c-8.8-7.8-18.8-14-27.7-14s-18.9 6.2-27.7 14c-4.2 3.7-7.7 7.5-10.2 10.3c-1.2 1.4-2.2 2.6-2.8 3.4c-.3 .4-.6 .7-.7 .9l-.2 .2 0 0 0 0 0 0c-2.1 2.8-5.7 3.9-8.9 2.8s-5.5-4.1-5.5-7.6c0-17.9 6.7-35.6 16.6-48.8c9.8-13 23.9-23.2 39.4-23.2s29.6 10.2 39.4 23.2c9.9 13.2 16.6 30.9 16.6 48.8c0 3.4-2.2 6.5-5.5 7.6s-6.9 0-8.9-2.8l0 0 0 0 0 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-gray-600 text-center font-bold font-ubuntu text-[40px]">
                        <div className="flex items-center justify-center">
                          <Number n={176} />
                          <span>M+</span>
                        </div>
                      </h2>
                      <p className="text-gray-500  font-bold font-ubuntu text-[16px]">
                        HAPPY PATIENTS
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex mx-auto group">
                  <div className="p-5 items-center flex flex-row gap-5 mx-auto text-center hover:scale-110 transition duration-500 group">
                    <div className="rounded-full p-3 border-2 border-dashed border-gray-600 hover:scale-110 group-hover:bg-gray-600 transition duration-500">
                      <svg
                        className="w-[40px] h-[60px] fill-gray-600 group-hover:fill-white group-hover:-rotate-12 transition duration-500  "
                        viewBox="0 0 448 512"
                        xmlns="http://www.w3.org/2000/svg">
                        {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                        <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"></path>
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-gray-600 text-center font-bold font-ubuntu text-[40px]">
                        <div className="flex items-center justify-center">
                          <Number n={40} />
                          <span>+</span>
                        </div>
                      </h2>
                      <p className="text-gray-500  font-bold font-ubuntu text-[16px]">
                        YEARS EXPERIANCES
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-[50px] mx-auto  max-w-7xl">
          <h2 className="text-gray-500/50 pb-2 text-center pl-2 text-[28px] font-bold font-ubuntu">
            SERVICES THAT MATTERS
          </h2>
        </div>

        <div className="flex  mx-auto p-2 justify-center  justify-items-center flex-wrap  gap-0">
          {healthPakage.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
      <div className="w-full h-[400px] pt-20  relative justify-top items-bottom">
        <video
          className=" w-full h-[400px] object-cover object-top top-0 left-0"
          src={video}
          autoPlay
          loop
          muted
        />
        <div className="absolute w-full h-[400px]  top-20 left-0 bg-[#00984a]/70"></div>

        <div
          className={`${styles.paddingX} absolute  flex   max-w-7xl mx-auto inset-1 justify-center items-center text-center pt-[120px]  flex-col text-gray-900`}>
          <h1 className="text-white text-[32px]  font-ubuntu font-bold">
            Do you need Emergency Medical Care? <br></br> Call @ 10636
          </h1>
          <p className="text-white text-[16px] mt-5 font-medium">
            or 09666 787801. You can also reach us by the <br /> email:
            info@populardiagnostic.com
          </p>
          <div className="flex flex-row">
            <a
              href={`tel:10636`}
              className="bg-white border rounded mt-10 m-2 p-3 hover:bg-[#00984a] hover:text-white">
              Call Now
            </a>
            <Link to={"/hotlines"} className="bg-none border text-white rounded mt-10 m-2 p-3 hover:bg-gray-500 hover:text-white">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeContent;
