import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { projects1 } from "../constants";
import { fadeIn } from "../utils/motion";

const Card = ({
  index,
  name1,
  description1,

  image1,
}) => {
  return (
    <Tilt className="mx-auto xs:w-[267px] w-full ">
      <motion.div
        className="w-full  p-[1px] "
        variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 950,
          }}
          className="border-none bg-none  p-2 min-h-[100px] flex justify-evenly items-center flex-row"
        >
          <div>
            <img
              src={image1}
              alt="project_image"
              className="w-20 h-20 border-[1px] p-4 border-white rounded-[50px] object-contain"
            />
          </div>

          <div>
            <h3 className="text-[#00984a] text-[32px] ml-3 font-bold text-start font-[Time-New-Romans] ">
              {description1}
            </h3>
            <p className=" text-[#00984a] text-[16px] ml-3 font-bold text-start font-[Time-New-Romans] ">
              {name1}
            </p>
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
};

const Count = () => {
  return (
    <>
      <div className="flex flex-row  mb-10 mt-10  h-[280] justify-center gap-10">
        <div className="bg-none mx-auto w-full ">
          <div className="flex flex-wrap  max-w-screen-xl mx-auto justify-center gap-[150px]">
            <div className="mt-10 mb-10 flex mx-auto justify-center flex-wrap gap-7">
              {projects1.map((project, index) => (
                <Card key={`project-${index}`} index={index} {...project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Count, "");
