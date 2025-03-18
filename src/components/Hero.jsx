import React, { useState, useEffect } from "react";
import video from "../assets/website.mp4";
import "@fontsource/ubuntu";
import { motion } from "framer-motion";

const contentSets = [
  {
    text: "A Well equipped Cutting-edge solution provider",
    buttonText: "Explore more",
  },
  {
    text: "High quality, Appropriate and Accessible medical care",
    buttonText: "Learn more",
  },
  {
    text: "The art of our medical service amuses the patient",
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
  hidden: { x: 100, opacity: 0 },
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
    <section className="relative w-full">
      <video
        className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full object-cover object-bottom"
        src={video}
        autoPlay
        loop
        muted
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent from-50% to-white flex justify-center items-center p-10">
        {" "}
      </div>

    
    </section>
  );
};

export default Hero;
