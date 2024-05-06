// DoctorDetail.js

import React from "react";
import { useParams } from "react-router-dom";
import { doctorData1 } from "../constants"; // Import your doctor data
import { drBackground, Med1, Med2, Med3, Med4 } from "../assets";
import { Link } from "react-router-dom";

const DoctorDetail = () => {
  const { doctorId } = useParams();
  const selectedDoctor = doctorData1.doctors.find(
    (doctor) => doctor.drID.toString() === doctorId
  );

  if (!selectedDoctor) {
    return <div>Doctor not found.</div>;
  }

  const {
    drName,
    drSpecilist,
    drDegree,
    chember,
    drNumber,
    email,
    drGender,
    newPatientVisit,
    oldPatient,
    report,
    image,
    currPractice,
  } = selectedDoctor;

  const handleClick1 = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="doctor-detail bg-gray-100">
      <div className="sm:container mx-auto py-10 px-5">
        <div className="flex flex-wrap -mx-2">
          {/* Left Side */}
          <div className="w-full md:w-3/12 px-2 mb-4">
            {/* Profile Card */}
            <div className="bg-white p-3 rounded-b-xl shadow-lg border-t-4 border-[#006642]">
              <div className="image overflow-hidden rounded-xl shadow-xl">
                {image ? (
                  <img
                    className="h-auto w-full mx-auto"
                    src={image}
                    alt="Profile"
                    style={{
                      position: "relative",
                      zIndex: 1,
                      backgroundImage: `url(${drBackground})`,
                    }}
                  />
                ) : (
                  <div className="no-image font-ubuntu flex flex-col justify-center items-center p-2 h-60">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="256"
                      height="256"
                      viewBox="0 0 256 256">
                      <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                        <circle
                          cx="58.145"
                          cy="74.615"
                          r="13.145"
                          fill="#ffffff"
                        />
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
                    <p className="text-gray-700">No Image Available</p>
                  </div>
                )}
              </div>
              <h1 className="pt-2 text-gray-700 font-bold text-xl leading-8 my-1">
                {drName}
              </h1>
              <h3 className="text-gray-600 font-lg font-medium leading-6">
                Specialization: {drSpecilist}
              </h3>
              <div className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                <p>Degrees: {drDegree}</p>
                {/* Display other relevant details */}
              </div>
              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Status</span>
                  <span className="ml-auto">
                    <span className="bg-[#006642] py-1 px-2 rounded text-white text-sm">
                      Active
                    </span>
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span>Member since</span>
                  <span className="ml-auto">Nov 07, 2016</span>
                </li>
              </ul>
            </div>
            {/* End of profile card  */}
            <div className="my-4"></div>
            {/* Friends card  */}
            <div className="bg-white rounded-xl shadow-lg p-3 hover:shadow-xl">
              <div className="flex items-center justify-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                <span className="text-[#006642]">
                  {" "}
                  <svg
                    className="h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </span>
                <span>More from {drSpecilist}</span>
              </div>
              <h2 className="text-gray-500 text-center">
                {" "}
                For different schedules
              </h2>
              <div className="grid grid-cols-3 text-[#006642]">
                <div className="text-center my-2">
                  <img
                    className="h-16 w-16 rounded-full mx-auto"
                    src={image}
                    alt=""
                  />
                  <a href="#">{drName}</a>
                </div>
                <div className="text-center my-2">
                  <img
                    className="h-16 w-16 rounded-full mx-auto"
                    src={image}
                    alt=""
                  />
                  <a href="#">{drName}</a>
                </div>
                <div className="text-center my-2">
                  <img
                    className="h-16 w-16 rounded-full mx-auto"
                    src={image}
                    alt=""
                  />
                  <a href="#">{drName}</a>
                </div>
                <div className="text-center my-2">
                  <img
                    className="h-16 w-16 rounded-full mx-auto"
                    src={image}
                    alt=""
                  />
                  <a href="#">{drName}</a>
                </div>
              </div>
            </div>
            {/* End of friends card  */}
          </div>
          {/* Right Side */}
          <div className="w-full md:w-8/12 px-2">
            {/* Profile tab  */}
            {/* About Section  */}
            <div className="bg-white p-3 shadow-lg rounded-xl">
              <div>
                <h1 className="text-[#006642] p-5 text-center font-ubuntu font-bold text-[26px]">
                  {" "}
                  {currPractice}{" "}
                </h1>
              </div>
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="text-[#006642]">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Full Name</div>
                    <div className="px-4 py-2">{drName}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Gender</div>
                    <div className="px-4 py-2">{drGender}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                    <div className="px-4 py-2">+88 {drNumber}</div>
                  </div>

                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email</div>
                    <div className="px-4 py-2">
                      <a
                        className="text-[#006642]"
                        href="mailto:jane@example.com">
                        {email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                to="http://appointment.populardiagnostic.com/appointment"
                target="_blank"
                rel="noopener noreferrer">
                <button
                  className="block w-full text-[#006642] text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                  onClick={handleClick1}
                  type="button">
                  Book an Appointment
                </button>
              </Link>
            </div>
            {/* End of about section */}
            <div className="my-4"></div>
            {/* Chamber  */}
            <div className="bg-white p-3 shadow-lg rounded-xl">
              <div>
                <div className="flex justify-center items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                  <span className="text-[#006642]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5"
                      viewBox="0 0 90 90">
                      <path
                        d="M51.948 73.273H38.052c-1.104 0-2-0.896-2-2v-9.621h-9.621c-1.104 0-2-0.896-2-2V45.757c0-1.104 0.896-2 2-2h9.621v-9.62c0-1.104 0.896-2 2-2h13.896c1.104 0 2 0.896 2 2v9.62h9.62c1.104 0 2 0.896 2 2v13.895c0 1.104-0.896 2-2 2h-9.62v9.621C53.948 72.378 53.053 73.273 51.948 73.273z M40.052 69.273h9.896v-9.621c0-1.104 0.896-2 2-2h9.62v-9.895h-9.62c-1.104 0-2-0.896-2-2v-9.62h-9.896v9.62c0 1.104-0.896 2-2 2h-9.621v9.895h9.621c1.104 0 2 0.896 2 2V69.273z"
                        fill="#006642"
                      />
                      <path
                        d="M78.113 84.056H11.887c-1.104 0-2-0.896-2-2V30.312c0-1.104 0.896-2 2-2s2 0.896 2 2v49.745h62.226V30.067c0-1.104 0.896-2 2-2s2 0.896 2 2v51.989C80.113 83.161 79.218 84.056 78.113 84.056z"
                        fill="#006642"
                      />
                      <path
                        d="M2.002 38.835c-0.65 0-1.287-0.316-1.671-0.898c-0.608-0.922-0.354-2.163 0.568-2.771L44.687 6.274c0.679-0.449 1.561-0.439 2.231 0.019L89.13 35.184c0.911 0.624 1.145 1.869 0.521 2.78c-0.624 0.912-1.867 1.146-2.78 0.521L45.768 10.353L3.102 38.504C2.762 38.728 2.38 38.835 2.002 38.835z"
                        fill="#006642"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide text-center">Chamber</span>
                </div>
                <div
                  className="chambers-grid m-0 p-0 text-black w-full md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 mx-auto"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "20px",
                  }}>
                  {selectedDoctor.chember.map((chamber, index) => (
                    <div
                      key={index}
                      className="chamber-card p-4 border border-gray-300 rounded-lg">
                      <h3 className="font-medium text-center">
                        {chamber.branch} Branch
                      </h3>
                      <p className="text-center">
                        {chamber.building}, Room: {chamber.room}
                      </p>
                      <div className="text-center">Visiting Hours</div>
                      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                          <div className="overflow-hidden">
                            <table className="min-w-full text-center">
                              <thead className="border-b">
                                <tr>
                                  <th
                                    scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4">
                                    Day
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4">
                                    Time
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {chamber.weekday.map((day, dayIndex) => (
                                  <tr key={dayIndex} className="border-b">
                                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                      {day.day}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                      {day.time}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* End of Experience and education grid */}
            </div>
            {/* End of profile tab */}
          </div>
          <div className="w-full md:w-1/12 px-2">
            <div className="flex justify-center flex-col items-center bg-white h-full rounded-xl shadow-xl">
              <div className="hw-full m-2 p-2 bg-gray-200 rounded-xl text-center text-gray-600 shadow-lg border-gray-300 border-2">
                {" "}
                <img src={Med1} alt="" />
                <h1 className="">Vonomax</h1>
              </div>
              <div className="hw-full m-2 p-2 bg-gray-200 rounded-xl text-center text-gray-600 shadow-lg border-gray-300 border-2">
                {" "}
                <img src={Med4} alt="" />
                <h1 className="text-black">Vonomax</h1>
              </div>
              <div className="hw-full m-2 p-2 bg-gray-200 rounded-xl text-center text-gray-600 shadow-lg border-gray-300 border-2">
                {" "}
                <img src={Med2} alt="" />
                <h1 className="text-black">AdeCard</h1>
              </div>{" "}
              <div className="hw-full m-2 p-2 bg-gray-200 rounded-xl text-center text-gray-600 shadow-lg border-gray-300 border-2">
                {" "}
                <img src={Med3} alt="" />
                <h1 className="text-black">Cabergol</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
