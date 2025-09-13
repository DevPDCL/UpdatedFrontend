import React, { useEffect, useState } from "react";
import "@fontsource/ubuntu";
import video from "../../assets/heroVideo.mp4";
import { SearchBoxBranch } from "../../components";
import { branch } from "../../constants/branches";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUserMd, FaFlask, FaAward, FaParking, FaTv } from "react-icons/fa";

const Dhanmondi = () => {
  const branchInfo = branch.find((b) => b.heading === "Dhanmondi");
  const branchName = branchInfo.heading;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const branchId = queryParams.get("id");

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDoctors = async (pageNum = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.populardiagnostic.com/api/doctors?token=UCbuv3xIyFsMS9pycQzIiwdwaiS3izz4&branches=1&page=${pageNum}`
      );
      setDoctors(response.data.data.data);
      setTotalPages(response.data.data.last_page);
      setPage(pageNum);
    } catch (error) {
      // Error fetching doctors - handled silently
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="font-[Ubuntu]">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <video
          className="w-full h-[70vh] object-cover"
          alt="Dhanmondi Branch Video"
          src={video}
          autoPlay
          loop
          muted
        />
        <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Popular Diagnostic Centre
            </h1>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 inline-block">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {branchName} Branch
              </h2>
            </div>
            <p className="mt-6 text-lg text-white max-w-2xl mx-auto drop-shadow-md">
              Established June 1983 | 7 Units | House # 16, Road # 2, Dhanmondi,
              Dhaka 1205
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 bg-[#00664a] hover:bg-[#00984a] text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-lg">
              Book an Appointment
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#00664a]">
              Why Choose Our Dhanmondi Branch?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600">
              As our flagship location since 1983, we offer unparalleled
              diagnostic services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaFlask className="text-4xl text-[#00664a]" />,
                title: "Advanced Technology",
                description:
                  "State-of-the-art diagnostic equipment for accurate results",
              },
              {
                icon: <FaUserMd className="text-4xl text-[#00664a]" />,
                title: "Expert Specialists",
                description: "200+ renowned doctors across all specialties",
              },
              {
                icon: <FaAward className="text-4xl text-[#00664a]" />,
                title: "40 Years of Trust",
                description: "Pioneers in diagnostic services since 1983",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-center mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="py-16 bg-gray-50 relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <span className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-[#00984a]/10 blur-3xl"></span>
          <span className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl"></span>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#00664a]">
                Book an Appointment or Find Services
              </h2>
              <p className="mt-2 text-gray-600">
                Search for doctors, services, or book appointments at our{" "}
                {branchName} branch
              </p>
            </div>
            <SearchBoxBranch branchId={branchId} />
          </motion.div>
        </div>
      </div>

      {/* Enhanced Doctors Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#00664a]">
              Our Specialist Doctors
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600">
              Meet our team of experienced medical professionals
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00664a]"></div>
            </div>
          ) : (
            <>
              <div className="relative">
                <div className="flex space-x-4 overflow-x-auto pb-6 scrollbar-hide">
                  {doctors.map((doctor) => (
                    <motion.div
                      key={doctor.id}
                      whileHover={{ y: -5 }}
                      className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-full h-full object-cover"
                        />
                        {doctor.on_leave && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            On Leave
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-[#00664a]">
                          {doctor.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {doctor.degree}
                        </p>
                        <div className="flex items-center text-sm text-blue-600">
                          <FaUserMd className="mr-1" />
                          {doctor.specialists?.[0]?.specialist?.name ||
                            "General"}
                        </div>
                        <button className="mt-3 w-full bg-[#00664a] hover:bg-[#00984a] text-white py-2 rounded-md text-sm transition-colors">
                          View Profile
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => fetchDoctors(page > 1 ? page - 1 : 1)}
                  disabled={page === 1}
                  className="px-4 py-2 mx-1 rounded-md bg-gray-200 disabled:opacity-50">
                  Previous
                </button>
                {[...Array(Math.min(5, totalPages)).keys()].map((num) => (
                  <button
                    key={num}
                    onClick={() => fetchDoctors(num + 1)}
                    className={`px-4 py-2 mx-1 rounded-md ${
                      page === num + 1
                        ? "bg-[#00664a] text-white"
                        : "bg-gray-200"
                    }`}>
                    {num + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    fetchDoctors(page < totalPages ? page + 1 : totalPages)
                  }
                  disabled={page === totalPages}
                  className="px-4 py-2 mx-1 rounded-md bg-gray-200 disabled:opacity-50">
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Facilities Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#00664a]">
              Our Facilities
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600">
              Modern amenities for your comfort and convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Advanced Imaging Center",
                description: "MRI, CT Scan, Digital X-Ray, Ultrasound",
                icon: "🖼️",
              },
              {
                title: "Cardiac Care Unit",
                description: "Echo, ECG, Stress Test, Holter Monitoring",
                icon: "❤️",
              },
              {
                title: "Pathology Lab",
                description: "Fully automated analyzers for accurate results",
                icon: "🧪",
              },
              {
                title: "Comfortable Waiting Area",
                description: "Spacious seating with TV and magazines",
                icon: "🛋️",
              },
              {
                title: "Ample Parking",
                description: "Secure parking facility available",
                icon: "🚗",
              },
              {
                title: "Cafeteria",
                description: "Healthy food options available",
                icon: "☕",
              },
            ].map((facility, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all">
                <div className="text-4xl mb-4">{facility.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-[#00664a]">
                  {facility.title}
                </h3>
                <p className="text-gray-600">{facility.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section (Optional) */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#00664a]">
              Patient Experiences
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600">
              What our patients say about our Dhanmondi branch
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "The most accurate diagnostic reports I've ever received. The doctors are extremely knowledgeable.",
                author: "Rahman Khan",
                rating: "★★★★★",
              },
              {
                quote:
                  "Clean facilities and professional staff. The waiting time was much less than I expected.",
                author: "Nusrat Jahan",
                rating: "★★★★☆",
              },
              {
                quote:
                  "As a long-time patient since 1995, I can attest to their consistent quality and care.",
                author: "Abdul Mannan",
                rating: "★★★★★",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg">
                <div className="text-yellow-400 text-xl mb-2">
                  {testimonial.rating}
                </div>
                <p className="text-gray-700 italic mb-4">
                  "{testimonial.quote}"
                </p>
                <p className="font-semibold text-[#00664a]">
                  — {testimonial.author}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dhanmondi;
