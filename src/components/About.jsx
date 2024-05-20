import { Sidemenu } from "../components";
import { topManagement } from "../constants";
import { ServiceCost } from "../constants";
import React, { useState } from "react";

const ProjectCard = ({ manImg, manName, manDesignation }) => {
  return (
    <div className="bg-gradient-to-b from-white to-[#00984a18] hover:bg-gray-100 shadow-2xl rounded-2xl sm:w-[299px] w-full">
      <div className="relative w-full">
        <img
          src={manImg}
          alt="Top_Management_Image"
          className="w-full shadow-xl rounded-3xl object-cover opacity-95 p-2"
        />
      </div>
      <div className="py-7 flex flex-col text-center">
        <p className="text-gray-600 px-2 font-bold font-ubuntu text-[24px]">
          {manName}
        </p>
        <p className="text-[#808080] px-2 font-medium font-ubuntu text-[16px]">
          {manDesignation}
        </p>
      </div>
    </div>
  );
};

const ListHeader = () => (
  <div className="flex justify-between px-4 py-2 bg-gray-400 font-bold">
    <p>Service Name</p>
    <p>Service Cost</p>
  </div>
);

const About = () => {
  // Split the topManagement data into groups
  const topPosition = topManagement.slice(0, 3);
  const secondTopPosition = topManagement.slice(3, 6);
  const thirdTopPosition = topManagement.slice(6, 9);
  const fourthTopPosition = topManagement.slice(9, 14);

  const [selectedBranch, setSelectedBranch] = useState(null);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
    setFilteredServices([]); // Reset filtered services on branch change
    setSearchTerm(""); // Reset search term on branch change
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    const branchServices = ServiceCost.find(
      (branch) => branch.braId === parseInt(selectedBranch)
    )?.services;
    if (branchServices) {
      const filtered = branchServices.flatMap((category) =>
        category.items.filter((service) =>
          service.serviceName.toLowerCase().includes(searchTerm)
        )
      );
      setFilteredServices(filtered);
    } else {
      setFilteredServices([]);
    }
  };
  const renderRow = ({ index, style }) => {
    const service = filteredServices[index];

    return (
      <li
        key={service.serviceId}
        style={style}
        className="flex justify-between px-4 py-2 hover:bg-gray-100"
      >
        <p className="text-gray-600">{service.serviceName}</p>
        <p className="font-medium text-gray-700">{service.price}.00</p>
      </li>
    );
  };

  return (
    <div className="bg-[#ffffff]">
      <Sidemenu />
      <div className="flex flex-col pt-[80px] mx-auto max-w-7xl">
        <h2 className="text-gray-900/50 pb-5 text-center text-[35px] font-bold font-ubuntu">
          Top Management
        </h2>
      </div>

      {/* Top section for chairman ma'am, Md sir and Sardin sir */}
      <div className="flex mx-auto p-3 pb-10 pt-2 max-w-7xl justify-center flex-wrap gap-7">
        {topPosition.map((project) => (
          <ProjectCard key={project.manID} {...project} />
        ))}
      </div>

      {/* Second section for general managers and advisors*/}
      <div className="flex mx-auto p-3 py-10  max-w-7xl justify-center flex-wrap gap-7">
        {secondTopPosition.map((project) => (
          <ProjectCard key={project.manID} {...project} />
        ))}
      </div>

      {/* Third section for AGMs */}
      <div className="flex mx-auto p-3 py-10 max-w-7xl justify-center flex-wrap gap-7">
        {thirdTopPosition.map((project) => (
          <ProjectCard key={project.manID} {...project} />
        ))}
      </div>

      {/* Fourth section for managers */}
      <div className="flex mx-auto p-3 py-20 justify-center flex-wrap gap-4">
        {fourthTopPosition.map((project) => (
          <ProjectCard key={project.manID} {...project} />
        ))}
      </div>
    </div>
  );
};

export default About;
