import React, { useState, useEffect } from "react";
import video from "../assets/website.mp4";
import "@fontsource/ubuntu";
import { motion } from "framer-motion";


const contentSets = [
  { text: "A Well equipped Cutting-edge solution provider ", buttonText: "Explore more" },
  {
    text: "High quality, Appropriate and Accessible medical care",
    buttonText: "Learn more",
  },
  {
    text: "The art of our medical service  amuses the patient",
    buttonText: "Know more",
  },
  {
    text: "The trusted and friendly medical professionals",
    buttonText: "Discover more",
  },
];

const textVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const buttonVariants = {
  hidden: { xim : 100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) =>
        current === contentSets.length - 1 ? 0 : current + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="relative">
        <video
          className="h-[400px] md:h-[600px] w-full object-cover object-bottom top-0 left-0 pb-[1px]"
          src={video}
          autoPlay
          loop
          muted
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent from-50% to-white flex justify-center items-center p-10">
          {/* <div className="mt-0 sm:mt-[300px] lg:mt-[450px]">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={textVariants}
              transition={{ duration: 1.5 }}
              key={activeIndex}
              className="text-center">
              <h1 className="text-[35px] md:text-[50px] text-gray-800 font-ubuntu font-bold">
                {contentSets[activeIndex].text}
              </h1>
            </motion.div>
          </div> */}
        </div>
      </section>

     
    </>
  );
};

export default Hero;
