import React, { useEffect, useState } from "react";
import { SectionWrapper } from "../hoc";
import axios from "axios";
import "@fontsource/ubuntu";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { Tilt } from "react-tilt";

// Sub-component for individual feedback card
const FeedbackCard = ({ comment, person, designation, company, image }) => {
  const createMarkup = (html) => {
    return { __html: html };
  };

  return (
    <Tilt
      options={{
        max: 5,
        scale: 1.05,
        speed: 50,
      }}
      className="sm:w-[550px] w-full shadow-lg">
      <motion.div whileHover={{ scale: 1.02 }} className="h-full">
        <div className="h-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:border-[#00984a]/30 transition-all duration-300">
          {/* Header with image */}
          <div className="p-6 pb-0 flex items-center gap-4">
            <div className="relative">
              <img
                src={image}
                alt={`feedback_by_${person}`}
                className="w-20 h-16 p-1 rounded-full object-contain border-4 border-[#00984a]/20"
              />
              <div className="absolute -bottom-1 -right-1 bg-[#00984a] text-white rounded-full p-1">
                <FaQuoteLeft className="text-xs" />
              </div>
            </div>
            <div>
              <h3 className="text-gray-800 font-bold text-lg">{person}</h3>
              <p className="text-[#00984a] text-sm font-medium">
                {designation === "N/A" || designation === "NA"
                  ? company
                  : `${designation}, ${company}`}
              </p>
            </div>
          </div>

          {/* Quote body */}
          <div className="p-6 pt-4">
            <div className="relative">
              <FaQuoteLeft className="absolute -top-2 -left-2 text-gray-200 text-xl" />
              <div
                className="text-gray-600 font-ubuntu text-[16px] leading-relaxed italic pl-4"
                dangerouslySetInnerHTML={createMarkup(comment)}
              />
              <FaQuoteRight className="absolute -bottom-2 -right-2 text-gray-200 text-xl" />
            </div>
          </div>

          {/* Decorative element */}
          <div className="h-2 bg-gradient-to-r from-[#00984a] to-[#4ade80]"></div>
        </div>
      </motion.div>
    </Tilt>
  );
};


// Main component
const Feedbacks = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          "https://api.populardiagnostic.com/api/testimonials",
          {
            params: {
              token: "UCbuv3xIyFsMS9pycQzIiwdwaiS3izz4",
            },
          }
        );

        if (response.data?.success) {
          setTestimonials(response.data.data.data);
        } else {
          throw new Error("Failed to fetch testimonials");
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Failed to load testimonials. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00984a]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 font-ubuntu">{error}</div>
    );
  }

  return (
    <div className="bg-none">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center text-[#00984a] font-bold mb-12 font-ubuntu text-3xl">
        What Our Clients Say
      </motion.h2>

      {testimonials.length > 0 ? (
        <div className="flex mx-auto p-0 justify-center justify-items-center flex-wrap gap-10">
          {testimonials.map((testimonial) => (
            <FeedbackCard
              key={`${testimonial.person}-${testimonial.company}`}
              {...testimonial}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500 font-ubuntu">
          No testimonials available
        </div>
      )}
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
