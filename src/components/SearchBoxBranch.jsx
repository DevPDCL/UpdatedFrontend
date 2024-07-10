import { styles } from "../styles";
import { ServiceCost, doctorData1 } from "../constants";
import React, { useState, useEffect } from "react";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import List from "react-virtualized/dist/commonjs/List";
import { Link } from "react-router-dom";
import "@fontsource/ubuntu";


const ListHeader = () => (
  <div className="flex justify-between  px-8 py-2 bg-gray-400 font-bold">
    <p>Service Name</p>
    <p>Service Cost</p>
  </div>
);

const Header = () => (
  <div className="flex justify-between  px-8 py-2 bg-gray-400 font-bold">
    <p>Doctor Name</p>
    <p>Speciality</p>
  </div>
);

const Search = ({branchName}) => {
  console.log(typeof(branchName));
    const [activeTab, setActiveTab] = useState("styled-profile");

    const handleTabClick = (tabId) => {
      setActiveTab(tabId);
    };

    const branchSearch = ServiceCost.find(
      (branch) => branch.braName === branchName
    );
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredServices, setFilteredServices] = useState([]);
    const handleSearch = (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = branchSearch?.services?.flatMap(category =>
        category.items.filter(service =>
          service.serviceName.toLowerCase().includes(query)
        )
      );
    
      // If the query is empty, set filteredServices to an empty array
      setFilteredServices(query ? filtered || [] : []);
      setSearchQuery(query);
    };

    const renderRow = ({ index, style }) => {
      const service = filteredServices[index];

      return (
        <li
          key={service.serviceId}
          style={style}
          className="flex justify-between px-4 py-2 bg-white hover:bg-gray-100"
        >
          <p className="text-gray-600 font-ubuntu">{service.serviceName}</p>
          <p className="font-medium text-gray-700 font-ubuntu">
            {service.price.toLocaleString("en-BD", {
              style: "currency",
              currency: "BDT",
            })}{" "}
          </p>
        </li>
      );
    };
    const renderRow1 = ({ index, style }) => {
      const doctor = displayedDoctors[index];

      const backgroundColor =
        doctor.drGender === "Female" ? "bg-[#fce8f3]" : "bg-[#f0fff0]";

      return (
        <Link to={`/doctordetail/${doctor.drID}`}>
          <li
            key={doctor.drId}
            style={style}
            className={`flex justify-between ${backgroundColor} px-4 py-2`}
          >
            <p className={`text-gray-600  font-ubuntu`}>{doctor.drName}</p>
            <p className="text-gray-600 font-ubuntu">{doctor.drSpecilist}</p>
          </li>
        </Link>
      );
    };
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const handleSearchClick = () => {
      setIsSearchVisible(!isSearchVisible, true);
    };

    const [showSearchInput, setShowSearchInput] = useState(true);

    const handleShowClick = () => {
      setShowSearchInput(false);
    };

    const [isVisible, setIsVisible] = useState(true);

    const handleClick = () => {
      setIsVisible(false);
    };
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const handleUserInput = () => {
      setMessages([...messages, "Your message has been sent!"]);
    };

    const [userInput, setUserInput] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      if (userInput.trim()) {
        // Avoid sending empty messages
        setMessages([...messages, userInput]);
        setUserInput("");
      }
    };

    const handleClick1 = () => {
      window.open(url, "_blank", "noopener,noreferrer");
    };
    // Array to store messages

    const [displayedDoctors, setDisplayedDoctors] = useState([]);
    const [searchTerm1, setSearchTerm1] = useState("");
    const [selectedSpecialization, setSelectedSpecialization] = useState("");
    const [selectedDay, setSelectedDay] = useState("");
    const [showFemaleDoctors, setShowFemaleDoctors] = useState(false);


    const specializations = Array.from(
      new Set(doctorData1.doctors.map((doc) => doc.drSpecilist))
    );

    useEffect(
      () => {
        let result = doctorData1.doctors;

        result = result.filter((doctor) =>
          doctor.chember.some((ch) => ch.branch === branchName)
        );

        if (
          selectedSpecialization ||
          selectedDay ||
          searchTerm1 ||
          showFemaleDoctors
        ) {
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

          if (searchTerm1) {
            result = result.filter((doctor) =>
              doctor.drName.toLowerCase().includes(searchTerm1.toLowerCase())
            );
          }
          if (showFemaleDoctors) {
            result = result.filter((doctor) => doctor.drGender === "Female");
          }
        } else {
          result = [];
        }

        setDisplayedDoctors(result);
      },
      [selectedSpecialization, selectedDay, searchTerm1, showFemaleDoctors]
    );
  return (
    <>
      <div
        className={`${styles.paddingX} md:-mt-[250px] -mt-[50px]  bg-gradient-to-t from-transparent to-white/80 to-40% rounded-t-2xl pt-4 flex relative z-10 max-w-7xl mx-auto justify-center items-bottom text-center flex-col text-gray-900`}>
        <div className="mb-4 ">
          <ul className=" text-sm font-medium text-center text-gray-900 sm:flex">
            <li className="w-full p-1 focus-within:z-10">
              <a
                href="#"
                data-tabs-target="styled-profile"
                className={`inline-block w-full p-3 shadow-2xl rounded text-gray-900 border-r border-gray-200  ${
                  activeTab === "styled-profile"
                    ? "bg-[#ffffff] text-gray-900"
                    : "bg-[#00984a] text-white"
                } "active focus:outline-none "
                        : ""
                    `}
                aria-current="page"
                onClick={() => handleTabClick("styled-profile")}>
                Doctors
              </a>
            </li>
            <li className="w-full p-1 focus-within:z-10">
              <a
                href="#"
                data-tabs-target="styled-profile1"
                className={`inline-block w-full p-3 shadow-2xl rounded  border-r border-gray-200 ${
                  activeTab === "styled-profile1"
                    ? "bg-[#ffffff] text-gray-900"
                    : "bg-[#00984a] text-white"
                } "active focus:outline-none "
                        : ""
                    `}
                aria-current="page"
                onClick={() => handleTabClick("styled-profile1")}>
                Appoinment
              </a>
            </li>
            <li className="w-full p-1 focus-within:z-10">
              <a
                href="#"
                data-tabs-target="styled-profile2"
                className={`inline-block w-full p-3 shadow-2xl rounded text-gray-900 border-r border-gray-200  ${
                  activeTab === "styled-profile2"
                    ? "bg-[#ffffff] text-gray-900"
                    : "bg-[#00984a] text-white"
                } "active focus:outline-none "
                        : ""
                    `}
                aria-current="page"
                onClick={() => handleTabClick("styled-profile2")}>
                Test Prices
              </a>
            </li>
          </ul>
        </div>

        <div id="default-styled-tab-content">
          <div
            className={` p-2 rounded ${
              activeTab === "styled-profile" ? "" : "hidden"
            }`}
            id="styled-profile"
            role="tabpanel"
            aria-labelledby="profile-tab">
            <p className="text-sm text-gray-900 ">
              <form className="max-w-7xl mx-auto ">
                <div className="grid md:grid-cols-9  md:gap-0">
                  <div className="relative z-0 w-full p-1 col-span-3 mb-0 group">
                    <select
                      className="block py-2.5 px-0 w-full text-sm rounded-lg shadow-2xl text-gray-900 bg-white pl-2   peer"
                      onChange={(e) =>
                        setSelectedSpecialization(e.target.value)
                      }
                      layout
                      whileHover="hover">
                      <option value="">Select Specialization</option>
                      {specializations.map((spec) => (
                        <option key={spec} value={spec}>
                          {spec}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="relative col-span-3 p-1 mb-0 group">
                    <select
                      className="block py-2.5 px-0 w-full text-sm rounded-lg shadow-2xl text-gray-900 bg-white pl-2   peer"
                      onChange={(e) => setSelectedDay(e.target.value)}
                      layout
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
                    </select>
                  </div>
                  <div className="relative col-span-3 p-1 mb-0 group">
                    <label
                      className="block py-2.5 px-0 w-full text-sm rounded-lg shadow-2xl text-gray-900 bg-white pl-2   peer"
                      layout
                      whileHover="hover">
                      Female Doctor
                      <input
                        type="checkbox"
                        checked={showFemaleDoctors}
                        onChange={() =>
                          setShowFemaleDoctors(!showFemaleDoctors)
                        }
                        className="form-checkbox text-PDCL-green rounded"
                      />
                    </label>
                  </div>
                  <div className="relative col-span-9 mb-1 group ">
                    <input
                      className="block py-2.5 px-0 w-full text-sm rounded-lg shadow-2xl focus:outline-none focus:ring-0 focus:border-PDCL-green  text-gray-900 bg-white placeholder-gray-900  peer pl-2"
                      required
                      type="text"
                      placeholder="Search by doctor's name..."
                      layout
                      whileHover="hover"
                      onChange={(e) => setSearchTerm1(e.target.value)}
                    />
                    <section>
                      <ul>
                        {displayedDoctors.length > 0 && (
                          <li>
                            {/* Render the header */}
                            <Header />

                            {/* List */}
                            <div className="flex flex-col min-h-[200px]">
                              <AutoSizer>
                                {({ width }) => (
                                  <List
                                    height={250}
                                    rowCount={displayedDoctors.length}
                                    rowHeight={50}
                                    rowRenderer={renderRow1}
                                    overscanRowCount={5}
                                    width={width}
                                  />
                                )}
                              </AutoSizer>
                            </div>
                          </li>
                        )}
                      </ul>
                    </section>
                  </div>
                </div>
              </form>
            </p>
          </div>
          <div
            className={` p-2 rounded ${
              activeTab === "styled-profile1" ? "" : "hidden"
            }`}
            id="styled-profile1"
            role="tabpanel"
            aria-labelledby="profile-tab">
            <p className="text-sm text-gray-900 ">
              <form className="max-w-screen-xl mx-auto">
                <div className="grid md:grid-cols-12 md:gap-1">
                  <div className="relative z-0 col-span-12 w-full group">
                    <Link
                      to="http://appointment.populardiagnostic.com/appointment"
                      target="_blank"
                      rel="noopener noreferrer">
                      <button
                        type="button"
                        className="text-gray-600 w-full rounded block col-span-12 mb-2 h-[43px] hover:text-gray-900 border bg-white shadow-2xl  border-none focus:ring-4 focus:outline-none focus:ring-[#00984a] font-ubuntu text-[16px] font-bold px-5 py-2.5 text-center "
                        onClick={handleClick1}>
                        Make An Appointment{" "}
                        <span className="animate-ping">Now</span>
                      </button>
                    </Link>
                  </div>

                  <div className="relative z-0 col-span-12 w-full  group">
                    <div className="flex flex-row w-full col-span-12">
                      <div className="flex w-full col-span-6 items-center">
                        {!isSearchVisible && (
                          <button
                            className={`px-4 py-2 bg-white shadow-2xl mb-1 w-full mr-2 font-ubuntu font-medium col-span-4 text-gray-900 rounded ${
                              showSearchInput
                                ? ""
                                : "opacity-50 cursor-not-allowed"
                            }`}
                            onClick={handleSearchClick}
                            disabled={showSearchInput}>
                            <p class>
                              Chat{" "}
                              <span className=" drop-shadow-[0_1.0px_1.0px_rgba(0,0,0,0.5)] text-white gradient-alt-flow">
                                AI Consultant
                              </span>
                            </p>
                          </button>
                        )}
                        {!isSearchVisible && (
                          <button
                            className={`px-4 py-2 bg-white shadow-2xl  mb-1 w-full font-ubuntu font-medium col-span-6 text-gray-900 rounded ${
                              showSearchInput
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            onClick={(handleSearchClick, handleShowClick)}
                            disabled={!showSearchInput}>
                            Chat Human Consultant
                          </button>
                        )}
                        {isSearchVisible && (
                          <div className="relative flex flex-row z-0 col-span-9 w-full  group">
                            <form className=" w-full col-span-10 mr-2 mb-1">
                              <label
                                for="default-search"
                                className="mb-1 text-sm font-medium text-gray-900 sr-only"></label>

                              <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                  <svg
                                    className="w-4 h-4 text-gray-500"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20">
                                    <path
                                      stroke="currentColor"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                  </svg>
                                </div>

                                <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none"></div>
                                {showSearchInput ? (
                                  <div>
                                    <input
                                      type="search"
                                      id="default-search"
                                      className="block w-full p-2 pr-10 white-space:pre-wrap col-span-9 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                                      placeholder="Chat With PDCL HUMAN Consultant"
                                      value={inputMessage}
                                      onChange={(e) =>
                                        setInputMessage(e.target.value)
                                      }
                                      onFocus={() => setInputMessage("")}
                                      required
                                    />
                                    <button
                                      type="submit"
                                      className="text-white absolute  end-0 bottom-1 top-1 m-1 bg-[#00984a] font-medium rounded text-sm px-4 py-2 ">
                                      Send
                                    </button>
                                  </div>
                                ) : (
                                  <div>
                                    <input
                                      type="search"
                                      id="default-search"
                                      className="block w-full p-2 pr-10 white-space:pre-wrap col-span-9 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                                      placeholder="Chat With PDCL AI Consultant"
                                      value={inputMessage}
                                      onChange={(e) =>
                                        setInputMessage(e.target.value)
                                      }
                                      onFocus={() => setInputMessage("")}
                                      required
                                    />
                                    <button
                                      type="submit"
                                      className="text-white absolute end-0  bottom-0 top-0 m-1 bg-[#00984a]  font-medium rounded text-sm px-4 py-2 ">
                                      Send
                                    </button>{" "}
                                  </div>
                                )}
                              </div>

                              {isSearchVisible && (
                                <div className="relative flex flex-row z-0 col-span-9 w-full group">
                                  <div className="flex flex-col space-y-2 mb-4">
                                    {messages.map((message, index) => (
                                      <div
                                        key={index}
                                        className="bg-gray-100 white-space:pre-wrap rounded-lg p-4 text-sm">
                                        <Message
                                          key={index}
                                          message={message}
                                          isUser={index % 2 === 0}
                                        />{" "}
                                      </div>
                                    ))}
                                  </div>

                                  <form className="w-full col-span-7 mr-2 mb-1">
                                    <label for="default-search"></label>
                                    <div className="relative">
                                      <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none"></div>

                                      {inputMessage && (
                                        <p className="text-gray-500 white-space:pre-wrap text-sm mt-2">
                                          {inputMessage}
                                        </p>
                                      )}
                                    </div>
                                  </form>
                                </div>
                              )}
                            </form>
                            <Link to="/#">
                              <div className="relative z-0 col-span-2 w-full  group">
                                <button
                                  type="button"
                                  className={`text-gray-600 w-full rounded block col-span-2 mb-0 h-[35px] hover:text-gray-900 border bg-white shadow-2xl  border-none focus:ring-4 focus:outline-none focus:ring-[#00984a] font-ubuntu text-[16px] font-bold px-4  text-center   ${
                                    isVisible ? "" : "hidden"
                                  }`}
                                  onClick={(handleClick, handleSearchClick)}>
                                  <span className="">Back</span>
                                </button>
                              </div>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </p>
          </div>
          <div
            className={` p-2 rounded   ${
              activeTab === "styled-profile2" ? "" : "hidden"
            }`}
            id="styled-profile2"
            role="tabpanel"
            aria-labelledby="profile-tab">
            <p className="text-sm text-gray-900">
              <form className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-12 md:gap-1">
                  <div className="relative col-span-12 mb-1 group">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearch}
                      name="floating_first_name"
                      placeholder="Test Name"
                      id="floating_first_name"
                      className="block py-2.5 px-0 w-full text-sm rounded-lg shadow-2xl focus:outline-none focus:ring-0 focus:border-PDCL-green  text-gray-900 bg-white placeholder-gray-900  peer pl-2"
                      required
                    />
                    <section className="">
                      <ul className="">
                        {filteredServices.length > 0 && (
                          <div className="flex flex-col min-h-[220px]">
                            {/* Render the header */}
                            <ListHeader />

                            {/* List */}
                            <AutoSizer>
                              {({ width }) => (
                                <List
                                  height={250}
                                  rowCount={filteredServices.length}
                                  rowHeight={50}
                                  rowRenderer={renderRow}
                                  overscanRowCount={5}
                                  width={width}
                                />
                              )}
                            </AutoSizer>
                          </div>
                        )}
                      </ul>
                    </section>
                  </div>
                </div>
              </form>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
