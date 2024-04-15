import React, { useRef, useEffect, useState } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { useSpring, animated } from "react-spring";
import { styles } from "../styles";
import { logo, tripguide, doctor } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

function Number({ n }){
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
    from: { number: 0},
    number: n,
    delay: 150,
    config: { mass: 1, tension: 30, friction: 30},
  });
  return (
  <div ref={countRef} className="count-section">
    {isVisible && <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>}
  </div>
  )
}


const ProjectCard = ({
  index,
  name,
  description,
  tags,
  video,
  source_code_link,
}) => {
  return (
    <div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <div className="grid md:grid-row-3 items-center sm:w-[379px] w-full justify-center mx-auto  md:gap-0 ">
        <div className="text-black m-2 bg-gray-50 shadow-xl rounded  w-auto text-center">
          <div className="relative w-auto h-auto">
            <video
              src={video}
              alt="project_image"
              className="w-full h-[230px] rounded object-cover opacity-90"
              autoPlay
              loop
              muted
            />

            <div className="absolute inset-0 flex justify-end p-3 card-img_hover">
              <div
                onClick={() => window.open(source_code_link, "_blank")}
                className="green-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
              >
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

          <div className="mt-0 font-medium flex font-ubuntu flex-wrap p-2 gap-2">
            {tags.map((tag) => (
              <p
                key={`${name}-${tag.name}`}
                className={`text-[14px] p-2 font-ubuntu ${tag.color}`}
              >
                #{tag.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Works = () => {
 
  return (
    <>
      <div className="fontFamily-ubuntu">
        <div className="overflow-hidden mt-[-140px] py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-rows-1 rounded shadow-2xl bg-gray-100/5 p-5 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-rows-1">
              <div className="lg:pr-8 lg:pt-4">
                <h1 className="text-slate-900/50 font-ubuntu text-center font-extrabold text-[28px]">
                  DISCOVER{" "}
                  <span className="text-[#006642] font-ubuntu">POPULAR</span>
                </h1>
                <div className="flex flex-wrap items-center justify-center mx-auto ">
                  <div className="flex flex-col items-center  mx-auto">
                    <div className="p-5 items-center text-center">
                      <h6 className="text-slate-900  font-bold font-ubuntu text-[60px]">
                        <Number n={27} />
                      </h6>
                      <p className="text-gray-500 font-bold font-ubuntu text-[20px]">
                        DEPARTMENTS
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center flex-col mx-auto ml-20">
                    <div className="p-5 items-center text-center">
                      <h6 className="text-slate-900 font-bold font-ubuntu text-[60px]">
                        <Number n={5000} />
                      </h6>
                      <p className="text-gray-500 font-bold font-ubuntu text-[20px]">
                        DOCTORS
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center mx-auto ml-20">
                    <div className="p-5 items-center text-center">
                      <h6 className="text-slate-900 font-bold font-ubuntu text-[60px]">
                        <Number n={270000} />
                      </h6>
                      <p className="text-gray-500  font-bold font-ubuntu text-[20px]">
                        PATIENTS SERVED
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex-col sm:hidden flex-wrap mb-10 gap-10">
          <div className="bg-gray-50/5 shadow p-5 mx-auto w-full ">
            <div className="flex flex-col  flex-wrap max-w-screen-xl mx-auto  ">
              <div className="w-full  border-l-[5px]  border-[#006642] border-opacity-50 pl-2  text-start ml-3">
                <h1 className="text-slate-900/50 font-ubuntu font-extrabold text-[28px]">
                  DISCOVER{" "}
                  <span className="text-[#006642] font-ubuntu">POPULAR</span>
                </h1>
                <p className="text-gray-500 font-ubuntu text-[16px] font-medium">
                  Popular Diagnostic Centre Ltd. exists to provide a better
                  patient experience. We are a one-stop-shop for your health,
                  offering caring doctors, world-class diagnostics and much more
                  world-class diagnostics and much more.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center mx-auto ">
                <div className="flex flex-col items-center mx-auto">
                  <h6 className="text-slate-900 font-bold font-ubuntu text-[60px]">
                    27
                  </h6>
                  <p className="text-gray-500 font-bold font-ubuntu text-[20px]">
                    DEPARTMENTS
                  </p>
                </div>
                <div className="flex items-center flex-col mx-auto ">
                  <h6 className="text-slate-900 font-bold font-ubuntu text-[60px]">
                    5K+
                  </h6>
                  <p className="text-gray-500 font-bold font-ubuntu text-[20px]">
                    DOCTORS
                  </p>
                </div>
                <div className="flex flex-col items-center mx-auto ">
                  <h6 className="text-slate-900 font-bold font-ubuntu text-[60px]">
                    270K+
                  </h6>
                  <p className="text-gray-500  font-bold font-ubuntu text-[20px]">
                    PATIENTS SERVED
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-[50px] mx-auto  max-w-7xl">
          <h2 className="text-gray-500/50 pb-2 text-center pl-2 text-[28px] font-bold font-ubuntu">
            EXPLORE HEALTH PLUS
          </h2>
        </div>

        <div className="flex  mx-auto p-0 justify-center  justify-items-center flex-wrap  gap-0">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>

        <a href="/">
          <p className="text-gray-500 pt-1 text-end pr-20 text-[20px] font-medium font-ubuntu">
            View More.....
          </p>
        </a>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
