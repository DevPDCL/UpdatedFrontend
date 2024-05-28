import React, { useState } from "react";
import "@fontsource/ubuntu";
import { motion } from "framer-motion";
import { notice } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";

const ProjectCard = (
  { index, noticeID, noticeImage, noticeHead, noticeDetail },
  { content, initiallyExpanded = false }
) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);

  const handleClick = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
        <div className="mx-auto mb-10 max-w-[370px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300">
          <Popover placement="center">
            <PopoverHandler>
              <div className="mb-8  rounded">
                <img
                  src={noticeImage}
                  alt="project_image"
                  className="w-full max-h-[250px]"
                />
              </div>
            </PopoverHandler>
            <PopoverContent>
              <div className="flex flex-wrap w-[299px] h-auto">
                <div
                  className="relative w-auto h-auto"
                  data-modal-target="default-modal"
                  data-modal-toggle="default-modal"
                >
                  <img
                    src={noticeImage}
                    alt="project_image"
                    className="w-auto h-auto rounded-md object-cover sm:w-[299px] opacity-95"
                  />
                </div>

                <div>
                  <p className="text-gray-900 font-ubuntu font-bold text-[18px]">
                    {noticeHead}
                  </p>
                  <p className="text-gray-600">{noticeDetail}</p>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <div className="mt-0 p-5">
            <p className="text-gray-900 font-ubuntu text-[18px]">
              {noticeHead}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

function Notice({ imageSrc, altText, content }) {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <div className="bg-[#ffffff]">
      <motion.div variants={textVariant()}>
        <div className="flex flex-col pt-[80px] mx-auto max-w-7xl">
          <h2 className="text-gray-900/50 pb-10 text-center pl-2 text-[28px] font-bold font-ubuntu">
            KEEPING YOU INFORMED
          </h2>
        </div>
      </motion.div>

      <div className=" flex mx-auto pb-10 pt-2 p-3  max-w-7xl justify-center flex-wrap gap-11">
        {notice.map((project, noticeID) => (
          <ProjectCard
            key={`noticeID-${noticeID}`}
            noticeID={noticeID}
            {...project}
          />
        ))}
      </div>
    </div>
  );
}

export default Notice;
