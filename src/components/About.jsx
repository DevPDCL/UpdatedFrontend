import "@fontsource/ubuntu";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProjectCard = ({ image, name, designation }) => {
  return (
    <div className="bg-gradient-to-b from-white to-[#00984a18] shadow-2xl rounded-2xl sm:w-[299px] w-full transition-transform duration-700 transform hover:-translate-y-3">
      <div className="relative w-full">
        <img
          src={image}
          alt="Top_Management_Image"
          className="w-full shadow-xl rounded-3xl object-cover opacity-95 p-2"
        />
      </div>
      <div className="py-7 flex flex-col text-center">
        <p className="text-gray-600 px-2 font-bold font-ubuntu text-[24px]">
          {name}
        </p>
        <p className="text-[#808080] px-2 font-medium font-ubuntu text-[16px]">
          {designation}
        </p>
      </div>
    </div>
  );
};

const About = () => {
  const [topManagement, setTopManagement] = useState([]);
  const [topManagement1, setTopManagement1] = useState([]);
  const [topManagement2, setTopManagement2] = useState([]);
  const [topManagement3, setTopManagement3] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios;
    axios
      .get(`https://api.populardiagnostic.com/api/management-team`, {
        params: {
          token: "UCbuv3xIyFsMS9pycQzIiwdwaiS3izz4",
        },
      })
      .then((response) => {
        setTopManagement(response.data.data["Row - 1"]);
        setTopManagement1(response.data.data["Row - 2"]);
        setTopManagement2(response.data.data["Row - 3"]);
        setTopManagement3(response.data.data["Row - 4"]);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  const topPosition = topManagement.slice(0, 2);
  const secondTopPosition = topManagement1.slice(0, 3);
  const thirdTopPosition = topManagement2.slice(0, 3);
  const fourthTopPosition = topManagement3.slice(0, 5);

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-[#ffffff]">
      <div className="flex flex-col pt-[80px] mx-auto max-w-7xl">
        <h2 className="text-gray-900/50 pb-5 text-center text-[35px] font-bold font-ubuntu">
          Top Management
        </h2>
      </div>

      <div className="flex mx-auto p-3 pb-10 pt-2 max-w-7xl justify-center flex-wrap gap-7">
        {topPosition.map((project) => (
          <ProjectCard key={project._id} {...project} />
        ))}
      </div>

      <div className="flex mx-auto p-3 py-10 max-w-7xl justify-center flex-wrap gap-7">
        {secondTopPosition.map((project) => (
          <ProjectCard key={project._id} {...project} />
        ))}
      </div>

      <div className="flex mx-auto p-3 py-10 max-w-7xl justify-center flex-wrap gap-7">
        {thirdTopPosition.map((project) => (
          <ProjectCard key={project._id} {...project} />
        ))}
      </div>
      <div className="flex mx-auto p-3 px-10 py-20 justify-center flex-wrap gap-4">
        {fourthTopPosition.map((project) => (
          <ProjectCard key={project._id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default About;
