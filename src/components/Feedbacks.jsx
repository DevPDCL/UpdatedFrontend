import React, { useEffect, useState, useCallback } from "react";
import { SectionWrapper } from "../hoc";
import axios from "axios";
import "@fontsource/ubuntu";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { Tilt } from "react-tilt";
import { BASE_URL } from "../secrets";

const API_CONFIG = {
  url: `${BASE_URL}/api/testimonials`,
  params: { token: "UCbuv3xIyFsMS9pycQzIiwdwaiS3izz4" },
};

const CARD_ANIMATION = {
  hover: { scale: 1.02 },
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const TILT_OPTIONS = {
  max: 5,
  scale: 1.05,
  speed: 50,
};

const FeedbackCard = React.memo(
  ({ comment, person, designation, company, image }) => {
    const createMarkup = useCallback((html) => ({ __html: html }), []);

    const displayDesignation = useCallback(() => {
      if (!designation || designation === "N/A" || designation === "NA") {
        return company;
      }
      return `${designation}, ${company}`;
    }, [designation, company]);

    return (
      <Tilt options={TILT_OPTIONS} className="sm:w-[550px] w-full shadow-lg">
        <motion.div whileHover={CARD_ANIMATION.hover} className="h-full">
          <div className="h-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:border-[#00984a]/30 transition-all duration-300">
            <div className="p-6 pb-0 flex items-center gap-4">
              <div className="relative">
                <img
                  src={image}
                  alt={`feedback by ${person}`}
                  loading="lazy"
                  className="w-20 h-16 p-1 rounded-full object-contain border-4 border-[#00984a]/20"
                />
                <div className="absolute -bottom-1 -right-1 bg-[#00984a] text-white rounded-full p-1">
                  <FaQuoteLeft className="text-xs" />
                </div>
              </div>
              <div>
                <h3 className="text-gray-800 font-bold text-lg">{person}</h3>
                <p className="text-[#00984a] text-sm font-medium">
                  {displayDesignation()}
                </p>
              </div>
            </div>

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

            <div className="h-2 bg-gradient-to-r from-[#00984a] to-[#4ade80]"></div>
          </div>
        </motion.div>
      </Tilt>
    );
  }
);

FeedbackCard.displayName = "FeedbackCard";

const Feedbacks = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(API_CONFIG.url, {
        params: API_CONFIG.params,
      });

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
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center pb-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#00984a]"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-10 text-red-500 font-ubuntu">
          {error}
        </div>
      );
    }

    if (testimonials.length === 0) {
      return (
        <div className="text-center py-10 text-gray-500 font-ubuntu">
          No testimonials available
        </div>
      );
    }

    return (
      <div className="flex mx-auto p-0 justify-center justify-items-center flex-wrap gap-10">
        {testimonials.map((testimonial) => (
          <FeedbackCard
            key={`${testimonial.person}-${testimonial.company}`}
            {...testimonial}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-none">
      <motion.h2
        initial={CARD_ANIMATION.initial}
        whileInView={CARD_ANIMATION.animate}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center text-[#00984a] font-bold mt-20 mb-8 font-ubuntu text-3xl">
        What Our Clients Say
      </motion.h2>

      {renderContent()}
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
