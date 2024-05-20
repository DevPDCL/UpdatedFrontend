import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sidemenu } from "../components";
import { doctorData1 } from "../constants";
import { Link } from "react-router-dom";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const buttonVariants = {
  initial: { opacity: 1, scale: 1 },
  animate: { opacity: 1, scale: 1.1 },
  hover: { scale: 1.05 },
};

const searchBoxVariants = {
  initial: { opacity: 1, scale: 1 },
  hover: { scale: 1.03 },
};

const DoctorCard = ({ doctor }) => {
    const cardBackgroundColor =
      doctor.drGender === "Female"
        ? "bg-gradient-to-b from-transparent via-transparent to-[#fce8f3]/80"
        : "bg-gradient-to-b from-transparent via-transparent to-[#f0fff0]/80";

    const backgroundColor =
      doctor.drGender === "Female"
        ? "group-hover:bg-[#fce8f3]"
        : "group-hover:bg-[#d7ffd7]";

    const textColor =
      doctor.drGender === "Female" ? "text-[#5E2750]" : "text-[#00984a]";

  return (
    <Link
      to={`/doctordetail/${doctor.drID}`}
      className="doctor-card-link group">
      {/* Wrap the entire DoctorCard with the Link */}
      <div
        className={`relative flex w-72 flex-col rounded-xl ${cardBackgroundColor} bg-clip-border text-gray-700 shadow-md h-full transition-transform duration-700 transform hover:-translate-y-3`}>
        <div className="relative mx-4 mt-4 h-100 overflow-hidden rounded-xl ${backgroundColor} bg-clip-border text-gray-700 shadow-lg">
          {doctor.image ? (
            <img
              src={doctor.image}
              alt={`${doctor.drName}'s picture`}
              className={`w-full shadow-xl ${backgroundColor} rounded-3xl object-cover`}
            />
          ) : (
            <div className="no-image font-ubuntu flex flex-col justify-center items-center p-2 h-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="256"
                height="256"
                viewBox="0 0 256 256">
                <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                  <circle cx="58.145" cy="74.615" r="13.145" fill="#ffffff" />
                  <path
                    d="M45 40.375c-9.415 0-17.118-7.703-17.118-17.118v-6.139C27.882 7.703 35.585 0 45 0s17.118 7.703 17.118 17.118v6.139C62.118 32.672 54.415 40.375 45 40.375z"
                    fill="#d7ffd7"
                  />
                  <path
                    d="M55.078 42.803L45 54.44 34.922 42.803c-12.728 2.118-22.513 13.239-22.513 26.544v17.707c0 1.621 1.326 2.946 2.946 2.946h59.29c1.621 0 2.946-1.326 2.946-2.946V69.346c0-13.305-9.786-24.426-22.513-26.544zM67.204 76.875c0 .667-.541 1.208-1.208 1.208h-3.877v3.877c0 .667-.541 1.208-1.208 1.208H56.73c-.667 0-1.208-.541-1.208-1.208v-3.877h-3.877c-.667 0-1.208-.541-1.208-1.208v-4.179c0-.667.541-1.208 1.208-1.208h3.877V67.61c0-.667.541-1.208 1.208-1.208h4.179c.667 0 1.208.541 1.208 1.208v3.877h3.877c.667 0 1.208.541 1.208 1.208v4.179z"
                    fill="#d7ffd7"
                  />
                </g>
              </svg>
              <p>No Image Available</p>
            </div>
          )}
        </div>
        <div className="p-6 text-center">
          <h4
            className={`mb-2 block font-sans ${textColor} text-2xl font-semibold leading-snug tracking-normal antialiased`}>
            {doctor.drName}
          </h4>
          <p className="block bg-gradient-to-tr from-gray-400 to-gray-600 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
            <strong>Degrees:</strong> {doctor.drDegree}
          </p>
        </div>
        <div className="flex justify-center gap-7 p-6 pt-2"></div>
      </div>
    </Link>
  );
};


const DoctorSearch = () => {
  const [displayedDoctors, setDisplayedDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [showFemaleDoctors, setShowFemaleDoctors] = useState(false); // State for female doctors
  const [lastDoctorIndex, setLastDoctorIndex] = useState(12); // Initial number of doctors to display
  const branches = Array.from(
    new Set(
      doctorData1.doctors.flatMap((doc) => doc.chember.map((ch) => ch.branch))
    )
  );
  const specializations = Array.from(
    new Set(doctorData1.doctors.map((doc) => doc.drSpecilist))
  );

  useEffect(() => {
    setDisplayedDoctors(doctorData1.doctors.slice(0, lastDoctorIndex));
  }, [lastDoctorIndex]);

  useEffect(() => {
    let result = doctorData1.doctors;

    if (selectedBranch) {
      result = result.filter((doctor) =>
        doctor.chember.some((ch) => ch.branch === selectedBranch)
      );
    }

    if (selectedSpecialization) {
      result = result.filter(
        (doctor) => doctor.drSpecilist === selectedSpecialization
      );
    }

    if (selectedDay) {
      result = result.filter((doctor) =>
        doctor.chember.some((ch) =>
          ch.weekday.some((wd) => wd.day === selectedDay)
        )
      );
    }

    if (searchTerm) {
      result = result.filter((doctor) =>
        doctor.drName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (showFemaleDoctors) {
      result = result.filter((doctor) => doctor.drGender === "Female");
    }

    setDisplayedDoctors(result.slice(0, lastDoctorIndex));
  }, [
    selectedBranch,
    selectedSpecialization,
    selectedDay,
    searchTerm,
    lastDoctorIndex,
    showFemaleDoctors,
  ]);

  // Function to handle lazy loading of doctors
  const loadMoreDoctors = () => {
    // Load more doctors if we're at the end of the scroll if there are more doctors to show
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setLastDoctorIndex((prevIndex) => prevIndex + 12);
    }
  };

  // Added event listener for scroll to handle lazy loading
  useEffect(() => {
    window.addEventListener("scroll", loadMoreDoctors);
    return () => window.removeEventListener("scroll", loadMoreDoctors);
  }, []);

  return (
    <div className="bg-[#ffffff]">
      <Sidemenu />
      <div>
        <div className="flex flex-col pt-[80px] mx-auto max-w-7xl">
          <h2 className="text-gray-900/50 pb-5 text-center pl-2 text-[28px] font-bold font-ubuntu">
            CONSULTANTS
          </h2>
        </div>

        <div className="sticky top-[74px] z-10  rounded-xl shadow-2xl bg-white flex flex-col-reverse gap-2 xl:flex-row p-5 row-span-1 mx-12 xl:mx-auto xl:max-w-7xl justify-between">
          <motion.input
            className="px-2 py-1 border text-[#00984a] border-PDCL-green bg-gray-200  rounded-lg focus:outline-none focus:ring-1 focus:ring-PDCL-green"
            type="text"
            placeholder="Search by doctor's name..."
            layout
            transition={spring}
            whileTap={{ scale: 0.9 }}
            variants={buttonVariants}
            whileHover="hover"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <motion.select
            className="px-2 py-1 border text-[#00984a] border-PDCL-green bg-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-PDCL-green"
            onChange={(e) => setSelectedBranch(e.target.value)}
            layout
            transition={spring}
            whileTap={{ scale: 0.9 }}
            variants={buttonVariants}
            whileHover="hover">
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </motion.select>

          <motion.select
            className="px-2 py-1 border text-[#00984a] border-PDCL-green bg-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-PDCL-green"
            onChange={(e) => setSelectedSpecialization(e.target.value)}
            layout
            transition={spring}
            whileTap={{ scale: 0.9 }}
            variants={buttonVariants}
            whileHover="hover">
            <option value="">Select Specialization</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </motion.select>

          <motion.select
            className="px-2 py-1 border text-[#00984a] border-PDCL-green bg-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-PDCL-green"
            onChange={(e) => setSelectedDay(e.target.value)}
            layout
            transition={spring}
            whileTap={{ scale: 0.9 }}
            variants={buttonVariants}
            whileHover="hover">
            <option value="">Select Day</option>
            {[
              "Saturday",
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
            ].map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </motion.select>
          <motion.label
            className="flex items-center gap-2 px-2 py-1 border text-[#5E2750] border-[#5E2750] bg-[#fce8f3] rounded-lg focus:outline-none focus:ring-1 focus:ring-PDCL-green"
            layout
            transition={spring}
            whileTap={{ scale: 0.9 }}
            variants={buttonVariants}
            whileHover="hover">
            Female Doctors
            <motion.input
              type="checkbox"
              checked={showFemaleDoctors}
              onChange={() => setShowFemaleDoctors(!showFemaleDoctors)}
              className="form-checkbox text-PDCL-green rounded"
            />
          </motion.label>
        </div>
        <div className="doctor-list flex mx-auto pb-10 px-3 sm:px-0 pt-[50px] max-w-7xl justify-center flex-wrap gap-5">
          {displayedDoctors.map((doctor) => (
            <DoctorCard key={doctor.drID} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorSearch;
