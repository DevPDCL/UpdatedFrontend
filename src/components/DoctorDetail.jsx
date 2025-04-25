// DoctorDetail.js
import Marquee from "react-fast-marquee";
import "@fontsource/ubuntu";
import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
import {
  drBackground,
  Adecard,
  Ambrosol,
  Amlovas,
  Vonomax,
  Anorel,
  Cebergol,
} from "../assets";
import {
  FaUserMd,
  FaUser,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdPeople, MdMedicalServices } from "react-icons/md";

const DoctorDetail = () => {
  const { doctorId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [doctor, setDoctor] = useState(null);
  const [similarDoctors, setSimilarDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSimilar, setLoadingSimilar] = useState(true);
  const [error, setError] = useState(null);

  // Get branch and specialist IDs from URL params
  const branchIds = queryParams.get("branches") || "";
  const specialistIds = queryParams.get("specialists") || "";

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(
          `https://api.populardiagnostic.com/api/doctor/${doctorId}?token=UCbuv3xIyFsMS9pycQzIiwdwaiS3izz4`
        );
        if (response.data.success) {
          setDoctor(response.data.data);
        } else {
          setError("Doctor not found");
        }
      } catch (err) {
        setError("Failed to fetch doctor data");
        console.error("Error fetching doctor:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchSimilarDoctors = async () => {
      try {
        // Only fetch similar doctors if we have branch and specialist IDs
        if (branchIds && specialistIds) {
          const response = await axios.get(
            `https://api.populardiagnostic.com/api/doctor-suggestions?token=UCbuv3xIyFsMS9pycQzIiwdwaiS3izz4&branches=${branchIds}&specialities=${specialistIds}`
          );
          if (response.data.success) {
            // Filter out the current doctor from similar doctors
            const filteredDoctors = response.data.data.data.filter(
              (doc) => doc.id.toString() !== doctorId
            );
            setSimilarDoctors(filteredDoctors);
          }
        }
      } catch (err) {
        console.error("Error fetching similar doctors:", err);
      } finally {
        setLoadingSimilar(false);
      }
    };

    fetchDoctor();
    fetchSimilarDoctors();
  }, [doctorId, branchIds, specialistIds]);

  const isDoctorOnLeave = () => {
    if (!doctor?.absent_message) return false;

    // Extract dates from absent message (assuming format: "In Leave from <b>Sun, 20th Apr 2025</b> to <b>Mon, 28th Apr 2025</b>")
    const dateRegex = /<b>.*?(\d{1,2})(?:st|nd|rd|th)? (\w{3}) (\d{4})<\/b>/g;
    const dates = [];
    let match;

    while ((match = dateRegex.exec(doctor.absent_message)) !== null) {
      const day = match[1];
      const month = match[2];
      const year = match[3];
      dates.push(new Date(`${month} ${day}, ${year}`));
    }

    if (dates.length === 2) {
      const today = new Date();
      return today >= dates[0] && today <= dates[1];
    }

    return false;
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!doctor) {
    return <div className="text-center py-10">Doctor not found</div>;
  }

  const handleClick1 = () => {
    window.open(
      "http://appointment.populardiagnostic.com/appointment",
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Format schedule data to match the component's expected structure
  const formattedChamber = {
    branch: doctor.practicing_branches,
    building: doctor.branches[0]?.map || "Not specified",
    room: "Not specified",
    weekday: doctor.schedule.map((item) => ({
      day: item.day,
      time: `${item.start_time} - ${item.end_time}`,
    })),
    assistantName: "Not specified",
    assistantGender: "Not specified",
    ext: "Not specified",
    assistantMobile: doctor.branches[0]?.phone || "Not specified",
  };

  return (
    <div className="doctor-detail bg-gray-100">
      <div className="sm:container mx-auto py-10 px-5">
        <div className="flex flex-wrap -mx-2">
          {/* Left Side */}
          <div className="w-full md:w-3/12 px-2 mb-4">
            {/* Profile Card */}
            <div className="bg-white p-3 rounded-b-xl shadow-lg border-t-4 border-[#00984a]">
              <div className="image overflow-hidden rounded-xl shadow-xl">
                {doctor.image ? (
                  <img
                    className="h-auto w-full mx-auto"
                    src={doctor.image}
                    alt="Profile"
                    style={{
                      position: "relative",
                      zIndex: 1,
                      backgroundImage: `url(${drBackground})`,
                    }}
                  />
                ) : (
                  <div className="no-image font-ubuntu flex flex-col justify-center items-center p-2 h-60">
                    <FaUserMd className="text-6xl text-gray-400" />
                    <p className="text-gray-700 mt-2">No Image Available</p>
                  </div>
                )}
              </div>
              <h1 className="pt-2 text-gray-700 font-bold text-xl leading-8 my-1">
                {doctor.name}
              </h1>
              <h3 className="text-gray-600 font-lg font-medium leading-6">
                <MdMedicalServices className="inline mr-1" />
                {doctor.specialities}
              </h3>
              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Status</span>
                  <span className="ml-auto">
                    <span
                      className={`py-1 px-2 rounded text-white text-sm ${
                        isDoctorOnLeave() ? "bg-yellow-500" : "bg-[#00984a]"
                      }`}>
                      {isDoctorOnLeave() ? "On Leave" : "Active"}
                    </span>
                  </span>
                </li>
              </ul>
            </div>
            {/* End of profile card  */}
            <div className="my-4"></div>
            {/* Similar Doctor card  */}
            <div className="bg-white rounded-xl shadow-lg p-3 hover:shadow-xl">
              <div className="flex items-center justify-center space-x-3 font-semibold text-gray-900 text-xl leading-8 font-ubuntu">
                <span className="text-[#00984a]">
                  <MdPeople className="text-2xl" />
                </span>
                <span className="tracking-wide">Similar Doctors</span>
              </div>
              <h2 className="text-gray-500 text-center pb-2">
                You may also consider
              </h2>
              <hr className="p-2"></hr>
              {loadingSimilar ? (
                <div className="p-5 font-ubuntu text-center text-gray-800">
                  Loading similar doctors...
                </div>
              ) : similarDoctors.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
                  {similarDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="text-center my-2 p-1 hover:bg-gray-50 rounded">
                      <Link
                        to={`/doctordetail/${doctor.id}?branches=${branchIds}&specialists=${specialistIds}`}
                        className="block">
                        <img
                          className="h-16 w-16 rounded-full mx-auto object-cover"
                          src={doctor.image}
                          alt={doctor.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/64";
                          }}
                        />
                        <p className="text-sm mt-1 text-gray-700 line-clamp-2">
                          {doctor.name}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-5 font-ubuntu text-center text-gray-800">
                  No similar doctors available
                </div>
              )}
            </div>
            {/* End of Similar Doctor card  */}
          </div>
          {/* Right Side */}
          <div className="w-full md:w-8/12 px-2">
            {/* Profile tab  */}
            {/* About Section  */}
            <div className="bg-white p-3 shadow-lg rounded-xl">
              <div>
                <h1 className="text-[#00984a] p-5 text-center font-ubuntu font-bold text-[26px]">
                  {doctor.experience_summery || "Experienced Specialist"}
                </h1>
              </div>
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="text-[#00984a]">
                  <FaUser className="text-lg" />
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="col-span-1">
                    <div className="px-4 py-2 font-semibold flex items-center">
                      <FaUserMd className="mr-2" /> Degrees:
                    </div>
                    <div className="px-4 py-2 pl-8">{doctor.degree}</div>
                  </div>
                  <div className="col-span-1">
                    <div className="px-4 py-2 font-semibold flex items-center">
                      <FaEnvelope className="mr-2" /> Contact
                    </div>
                    <div className="px-4 py-2 pl-8">
                      {doctor.email ? (
                        <a
                          className="text-[#00984a] hover:underline flex items-center"
                          href={`mailto:${doctor.email}`}>
                          <FaEnvelope className="mr-1" /> {doctor.email}
                        </a>
                      ) : (
                        <span className="text-gray-500">
                          Email not available
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <Link
                to="http://appointment.populardiagnostic.com/appointment"
                target="_blank"
                rel="noopener noreferrer">
                <button
                  className="w-full text-[#00984a] text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4 flex items-center justify-center"
                  onClick={handleClick1}
                  type="button">
                  <FaCalendarAlt className="mr-2" /> Book an Appointment
                </button>
              </Link>
            </div>
            {/* End of about section */}
            <div className="my-4"></div>
            {/* Chamber  */}
            <div className="bg-white p-3 shadow-lg rounded-xl">
              <div>
                <div className="flex justify-center items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                  <span className="text-[#00984a]">
                    <FaMapMarkerAlt className="text-lg" />
                  </span>
                  <span className="tracking-wide text-center">Chamber</span>
                </div>
                {doctor.absent_message && (
                  <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-yellow-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p
                          className="text-sm text-yellow-700"
                          dangerouslySetInnerHTML={{
                            __html: doctor.absent_message,
                          }}></p>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className="chambers-grid m-0 p-0 text-black w-full md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 mx-auto"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "20px",
                  }}>
                  <div className="chamber-card p-4 border border-gray-300 rounded-lg">
                    <h3 className="font-medium text-center">
                      <FaMapMarkerAlt className="inline mr-1" />
                      {formattedChamber.branch} Branch
                    </h3>
                    <p className="text-center">
                      {formattedChamber.building}, Room: {formattedChamber.room}
                    </p>
                    <p className="text-center">
                      <FaPhone className="inline mr-1" />
                      {formattedChamber.assistantMobile}
                    </p>
                    <div className="text-center font-bold text-gray-700 pt-2 text-[24px]">
                      <FaCalendarAlt className="inline mr-2" />
                      Schedule
                    </div>
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
                              {formattedChamber.weekday.map((day, dayIndex) => (
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
                </div>
              </div>
              {/* End of Chamber grid */}
            </div>
            {/* End of profile tab */}
          </div>

          <div className="md:w-1/12 h-screen hidden sm:block">
            {/* Advertise grid */}
            <div className="flex flex-col items-center overflow-x-hidden font-bold h-full">
              <Marquee direction="up" className="h-full">
                <a
                  href="https://www.popular-pharma.com/products/82"
                  target="_blank">
                  <div className="p-10 text-gray-600">
                    {" "}
                    <img src={Adecard} alt="Suggested Medicines" />
                    <h1 className=" text-gray-800 flex justify-center">
                      Adec <span className="text-[#ea7726]">ard</span>
                    </h1>
                  </div>
                </a>
                <a
                  href="https://www.popular-pharma.com/products/519"
                  target="_blank">
                  <div className="p-10 text-gray-600">
                    {" "}
                    <img src={Vonomax} alt="Suggested Medicines" />
                    <h1 className=" text-[#ea7726] flex justify-center">
                      Vono <span className="text-[#087b41]">max</span>
                    </h1>
                  </div>
                </a>
                <a
                  href="https://www.popular-pharma.com/products/82"
                  target="_blank">
                  <div className="p-10 text-gray-600 ">
                    {" "}
                    <img src={Ambrosol} alt="Suggested Medicines" />
                    <h1 className="flex justify-center">
                      Ambro<span className="text-[#087b41]">sol</span>
                    </h1>
                  </div>
                </a>
                <a
                  href="https://www.popular-pharma.com/products/68"
                  target="_blank">
                  <div className="p-10 text-gray-600 ">
                    {" "}
                    <img src={Amlovas} alt="Suggested Medicines" />
                    <h1 className="flex justify-center">
                      Amlo<span className="text-red-700">vas</span>
                    </h1>
                  </div>
                </a>
                <a
                  href="https://www.popular-pharma.com/products/117"
                  target="_blank">
                  <div className="p-10 text-gray-600 ">
                    {" "}
                    <img src={Anorel} alt="Suggested Medicines" />
                    <h1 className="flex justify-center">
                      Ano<span className="text-blue-800">rel</span>
                    </h1>
                  </div>
                </a>
                <a
                  href="https://www.popular-pharma.com/products/129"
                  target="_blank">
                  <div className="p-10 text-gray-600 ">
                    {" "}
                    <img src={Cebergol} alt="Suggested Medicines" />
                    <h1 className=" text-blue-700 flex justify-center">
                      Caber <span className="text-[#ea7726]">gol</span>
                    </h1>
                  </div>
                </a>
              </Marquee>
            </div>
            {/* End of Advertise grid */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
