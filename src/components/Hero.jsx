import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Import all images individually
// import Image1 from "../assets/HeroImages/1.webp";
import Image2 from "../assets/HeroImages/2.webp";
import Image3 from "../assets/HeroImages/3.webp";
import Image4 from "../assets/HeroImages/4.webp";
import Image5 from "../assets/HeroImages/5.webp";
import Image6 from "../assets/HeroImages/6.webp";
import Image7 from "../assets/HeroImages/7.webp";
import Image8 from "../assets/HeroImages/8.webp";
import Image9 from "../assets/HeroImages/9.webp";
import Image10 from "../assets/HeroImages/10.webp";
import Image11 from "../assets/HeroImages/11.webp";
import Image12 from "../assets/HeroImages/12.webp";
import Image13 from "../assets/HeroImages/13.webp";
import Image14 from "../assets/HeroImages/14.webp";

const images = [
  // { id: 1, src: Image1 },
  { id: 2, src: Image2 },
  { id: 3, src: Image3 },
  { id: 4, src: Image4 },
  { id: 5, src: Image5 },
  { id: 6, src: Image6 },
  { id: 7, src: Image7 },
  { id: 8, src: Image8 },
  { id: 9, src: Image9 },
  { id: 10, src: Image10 },
  { id: 11, src: Image11 },
  { id: 12, src: Image12 },
  { id: 13, src: Image13 },
  { id: 14, src: Image14 },
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) =>
        current === images.length - 1 ? 0 : current + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: activeIndex === index ? 1 : 0,
              transition: {
                duration: 2,
              },
            }}>
            <img
              src={image.src}
              alt={`Healthcare service ${image.id}`}
              className="w-full h-full object-cover object-center"
              loading={index < 2 ? "eager" : "lazy"}
            />
          </motion.div>
        ))}

        {/* Gradient overlay (optional - can remove if not needed) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-50% to-white" />

        {/* Navigation dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? "bg-white w-4" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
