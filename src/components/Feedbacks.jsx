import React from "react";
import "@fontsource/ubuntu";
import { SectionWrapper } from "../hoc";
import { fadeIn } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => (
  <div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className="grid md:grid-row-2 items-center justify-center sm:w-[550px] w-full mx-auto  md:gap-0 "
  >
    <div className=" m-1 p-10 bg-gray-100/5 shadow text-start">
      <div className="flex flex-wrap   max-w-7xl   ">
        <div>
          <div className="flex justify-between items-end gap-0">
            <img
              src={image}
              alt={`feedback_by`}
              className="w-20 h-10 mx-auto rounded object-cover"
            />
          </div>
          <svg
            className="w-[30px] h-[30px] fill-gray-500"
            viewBox="0 0 448 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z"></path>
          </svg>

          <p className="text-gray-500 font-ubuntu  font-medium text-[16px]">
            {testimonial}
          </p>
          <svg
            className="w-[30px] h-[30px] fill-gray-500"
            viewBox="0 0 448 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M448 296c0 66.3-53.7 120-120 120h-8c-17.7 0-32-14.3-32-32s14.3-32 32-32h8c30.9 0 56-25.1 56-56v-8H320c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v32 32 72zm-256 0c0 66.3-53.7 120-120 120H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h8c30.9 0 56-25.1 56-56v-8H64c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v32 32 72z"></path>
          </svg>

          <div className="mt-0 flex justify-center items-center gap-0">
            <div className=" flex flex-col">
              <p className="text-gray-500 text-center  font-bold text-[16px]">
                {name}
              </p>
              <p className="mt-0 blue-text-gradient text-center  font-ubuntu font-bold text-[14px]">
                {designation} of {company}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Feedbacks = () => {
  return (
    <div className={` bg-none `}>
      <h2 className="text-center text-gray-900/50 font-bold mb-[20px] pt-10 font-ubuntu text-[28px]">
        TESTIMONIALS
      </h2>

      <div
        className={`  flex  mx-auto p-0 justify-center  justify-items-center flex-wrap  gap-0`}
      >
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
