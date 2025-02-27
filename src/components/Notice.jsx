import React, { useState, useEffect } from "react";
import "@fontsource/ubuntu";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import axios from "axios";
const ProjectCard = ({ title, image }) => {
  return (
    <>
      <div className="mx-auto mb-10 max-w-[370px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300">
        <Popover placement="center">
          <PopoverHandler>
            <div className="mb-8  rounded">
              <img
                src={image}
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
                  src={image}
                  alt="project_image"
                  className="w-auto h-auto rounded-md object-cover sm:w-[299px] opacity-95"
                />
              </div>

              <div>
                <p className="text-gray-900 font-ubuntu font-bold text-[18px]">
                  {title}
                </p>
                <p className="text-gray-600">{title}</p>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className="mt-0 p-5">
          <p className="text-gray-900 font-ubuntu text-[18px]">{title}</p>
        </div>
      </div>
    </>
  );
};

function Notice() {
  const [notices, setNotices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    axios
      .get(`https://api.populardiagnostic.com/api/news-and-notices`, {
        params: {
          token: "UCbuv3xIyFsMS9pycQzIiwdwaiS3izz4",
        },
      })
      .then((response) => {
        setNotices(response.data.data.data);

        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
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
        {notices.map((notice) => (
          <ProjectCard key={notice.id} {...notice} />
        ))}
      </div>
    </div>
  );
}

export default Notice;
