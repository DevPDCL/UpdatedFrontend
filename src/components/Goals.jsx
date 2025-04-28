import React from "react";
import "@fontsource/ubuntu";
import { Dhanmondi, objective } from "../assets";
import { Link } from "react-router-dom";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import goals1 from "../assets/goals1.jpg";
import goals2 from "../assets/goals2.jpg";
import goals3 from "../assets/goals3.jpg";
import "react-vertical-timeline-component/style.min.css";

const Goals = () => {
  return (
    <div className="bg-gradient-to-b from-[#F5FFFA] to-white">
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            The New Way to{" "}
            <span className="text-emerald-600">Diagnostic Treatment</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
            Popular is committed to render the possible standard service to the
            people of the country at an affordable cost. This will definitely
            reduce the burden of the government and will make the path of
            "Health for all".
          </p>
          <Link to="/about" className="inline-block">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-200">
              Meet Our Team
            </button>
          </Link>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 sm:p-8 lg:p-10 flex items-center">
              <img
                src={Dhanmondi}
                className="w-full h-auto rounded-xl shadow-md object-cover transition-transform duration-500 hover:scale-105"
                alt="Dhanmondi Branch"
              />
            </div>
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 relative before:absolute before:bottom-0 before:left-0 before:w-16 before:h-1 before:bg-emerald-500 before:rounded-full pb-2">
                Who We Are
              </h2>
              <p className="text-gray-600 mb-4">
                Popular Diagnostic Centre Ltd. is an advanced Centre for
                diagnostic and medical services. It is one of the prestigious
                diagnostic complexes of Bangladesh which started its activities
                in 1983.
              </p>
              <p className="text-gray-600 mb-4">
                Popular Diagnostic Centre Ltd. is the largest diagnostic
                services provider organization in private sector of the country.
                It has been pioneer in introducing world latest medical
                equipments and advanced technology to provide round the clock
                medical investigations and consultancy services.
              </p>
              <div className="mt-4 p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                <p className="text-gray-700 font-medium">
                  <span className="font-bold text-emerald-600">
                    Legal Status:
                  </span>{" "}
                  Registered with the Ministry of Health & Family Welfare,
                  People's Republic Govt. of Bangladesh (License No. 1275 & 688)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 sm:p-8 lg:p-10 flex items-center order-last lg:order-first">
              <img
                src={objective}
                className="w-full h-auto rounded-xl shadow-md object-cover transition-transform duration-500 hover:scale-105"
                alt="Our Objectives"
              />
            </div>
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 relative before:absolute before:bottom-0 before:left-0 before:w-16 before:h-1 before:bg-emerald-500 before:rounded-full pb-2">
                Our Vision
              </h2>
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-emerald-600 mb-3">
                  Our Goal
                </h3>
                <p className="text-gray-600 pl-4 border-l-2 border-emerald-200">
                  To establish a referral Diagnostic and Medical Services Centre
                  that sets the benchmark for healthcare excellence.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-emerald-600 mb-3">
                  Our Objectives
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-emerald-100 text-emerald-600 rounded-full p-1 mr-3 mt-1">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                    </span>
                    <span className="text-gray-600">
                      To render world standard diagnostic service at an
                      affordable cost and limit patient outflow abroad.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-emerald-100 text-emerald-600 rounded-full p-1 mr-3 mt-1">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                    </span>
                    <span className="text-gray-600">
                      Out door basis treatment by renowned General
                      Practitioners, Consultants and Professors.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-emerald-100 text-emerald-600 rounded-full p-1 mr-3 mt-1">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                    </span>
                    <span className="text-gray-600">
                      To promote Health Education & Medical Services through
                      community engagement.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-emerald-100 text-emerald-600 rounded-full p-1 mr-3 mt-1">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                    </span>
                    <span className="text-gray-600">
                      Day care Centre for follow-up cardiac, renal and oncology
                      patients.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-emerald-100 text-emerald-600 rounded-full p-1 mr-3 mt-1">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                    </span>
                    <span className="text-gray-600">
                      To build a full fledged specialized (Tertiary) Hospital
                      with cutting-edge facilities.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-emerald-100 text-emerald-600 rounded-full p-1 mr-3 mt-1">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                    </span>
                    <span className="text-gray-600">
                      Expand network with Satellite collection Centres
                      nationwide.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-emerald-600">Journey</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            How we started and grew to serve the nation with excellence in
            healthcare.
          </p>
        </div>

        <div className="relative">
          <VerticalTimeline lineColor="#e5e7eb">
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{
                background: "white",
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                border: "1px solid #e5e7eb",
                borderRadius: "0.75rem",
              }}
              contentArrowStyle={{ borderRight: "12px solid white" }}
              date="1983"
              dateClassName="text-emerald-600 font-bold"
              iconStyle={{
                background: "white",
                boxShadow:
                  "0 0 0 4px #10b981, inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05)",
                color: "#10b981",
                fontSize: "1.25rem",
                fontWeight: "bold",
              }}>
              <div className="overflow-hidden rounded-lg mb-4">
                <img
                  src={goals1}
                  className="w-full h-48 sm:h-64 object-cover transition-transform duration-500 hover:scale-105"
                  alt="1983 Milestone"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Our Humble Beginnings
              </h3>
              <p className="text-gray-600">
                Started our activities with a vision to revolutionize diagnostic
                services in Bangladesh.
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{
                background: "white",
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                border: "1px solid #e5e7eb",
                borderRadius: "0.75rem",
              }}
              contentArrowStyle={{ borderRight: "12px solid white" }}
              date="2016"
              dateClassName="text-emerald-600 font-bold"
              iconStyle={{
                background: "white",
                boxShadow:
                  "0 0 0 4px #10b981, inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05)",
                color: "#10b981",
                fontSize: "1.25rem",
                fontWeight: "bold",
              }}>
              <div className="overflow-hidden rounded-lg mb-4">
                <img
                  src={goals2}
                  className="w-full h-48 sm:h-64 object-cover transition-transform duration-500 hover:scale-105"
                  alt="2016 Milestone"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Expanding Our Reach
              </h3>
              <p className="text-gray-600">
                New branches opened at Badda, Dinajpur and Mirpur to serve more
                communities across the country.
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{
                background: "white",
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                border: "1px solid #e5e7eb",
                borderRadius: "0.75rem",
              }}
              contentArrowStyle={{ borderRight: "12px solid white" }}
              date="2017"
              dateClassName="text-emerald-600 font-bold"
              iconStyle={{
                background: "white",
                boxShadow:
                  "0 0 0 4px #10b981, inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05)",
                color: "#10b981",
                fontSize: "1.25rem",
                fontWeight: "bold",
              }}>
              <div className="overflow-hidden rounded-lg mb-4">
                <img
                  src={goals3}
                  className="w-full h-48 sm:h-64 object-cover transition-transform duration-500 hover:scale-105"
                  alt="2017 Milestone"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Comprehensive Healthcare
              </h3>
              <p className="text-gray-600">
                Started six new 'Model Pharmacies' all over Bangladesh to
                provide complete healthcare solutions.
              </p>
            </VerticalTimelineElement>
          </VerticalTimeline>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Experience World-Class Diagnostic Services?
          </h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied patients who trust us for accurate
            diagnostics and compassionate care.
          </p>
          <Link to="/contact" className="inline-block">
            <button className="bg-white hover:bg-gray-100 text-emerald-600 font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              Contact Us Today
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Goals;
