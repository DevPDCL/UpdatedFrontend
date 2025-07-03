import React from "react";
import { Link } from "react-router-dom";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Dhanmondi, objective } from "../assets";
import goals1 from "../assets/goals1.jpg";
import goals2 from "../assets/goals2.jpg";
import mirpur from "../assets/PDCLbranches/MirpurU2.webp";
import goals3 from "../assets/goals3.jpg";

const Goals = () => {
  const brandColor = "#00984a";
  const brandLight = "#e6f5ee";
  const brandDark = "#007a3d";

  return (
    <div className="bg-gradient-to-b from-[#F5FFFA] to-white">
      <section className="relative pt-16 sm:pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            The New Way to{" "}
            <span className="text-[#00984a]">Diagnostic Treatment</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
            Popular is committed to render the possible standard service to the
            people of the country at an affordable cost. This will definitely
            reduce the burden of the government and will make the path of
            "Health for all".
          </p>
          <Link to="/about" className="inline-block" aria-label="Meet our team">
            <button
              className={`bg-[${brandColor}] hover:bg-[${brandDark}] text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[${brandLight}]`}
              style={{ backgroundColor: brandColor }}>
              Meet Our Team
            </button>
          </Link>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 sm:p-8 lg:p-10 flex items-center">
              <img
                src={Dhanmondi}
                className="w-full h-auto rounded-xl shadow-md object-cover transition-transform duration-300 hover:scale-[1.02]"
                alt="Dhanmondi Branch"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 relative before:absolute before:bottom-0 before:left-0 before:w-16 before:h-1 before:bg-[#00984a] before:rounded-full pb-2">
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
              <div className="mt-4 p-4 bg-[#e6f5ee] rounded-lg border-l-4 border-[#00984a]">
                <p className="text-gray-700 font-medium">
                  <span className="font-bold text-[#00984a]">
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

      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 sm:p-8 lg:p-10 flex items-center order-last lg:order-first">
              <img
                src={objective}
                className="w-full h-auto rounded-xl shadow-md object-cover transition-transform duration-300 hover:scale-[1.02]"
                alt="Our Objectives"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 relative before:absolute before:bottom-0 before:left-0 before:w-16 before:h-1 before:bg-[#00984a] before:rounded-full pb-2">
                Our Vision
              </h2>
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[#00984a] mb-3">
                  Our Goal
                </h3>
                <p className="text-gray-600 pl-4 border-l-2 border-[#b3e0cc]">
                  To establish a referral Diagnostic and Medical Services Centre
                  that sets the benchmark for healthcare excellence.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#00984a] mb-3">
                  Our Objectives
                </h3>
                <ul className="space-y-3">
                  {[
                    "To render world standard diagnostic service at an affordable cost and limit patient outflow abroad.",
                    "Out door basis treatment by renowned General Practitioners, Consultants and Professors.",
                    "To promote Health Education & Medical Services through community engagement.",
                    "Day care Centre for follow-up cardiac, renal and oncology patients.",
                    "To build a full fledged specialized (Tertiary) Hospital with cutting-edge facilities.",
                    "Expand network with Satellite collection Centres nationwide.",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 bg-[#e6f5ee] text-[#00984a] rounded-full p-1 mr-3 mt-1">
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
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Our <span className="text-[#00984a]">Journey</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            How we started and grew to serve the nation with excellence in
            healthcare.
          </p>
        </div>

        <div className="relative">
          <VerticalTimeline lineColor="#e5e7eb">
            {[
              {
                year: "1983",
                title: "Our Humble Beginnings",
                description:
                  "Started our activities with a vision to revolutionize diagnostic services in Bangladesh.",
                image: goals1,
              },
              {
                year: "2016",
                title: "Expanding Our Reach",
                description:
                  "New branches opened at Badda, Dinajpur and Mirpur to serve more communities across the country.",
                image: mirpur,
              },
              {
                year: "2017",
                title: "Comprehensive Healthcare",
                description:
                  "Started six new 'Model Pharmacies' all over Bangladesh to provide complete healthcare solutions.",
                image: goals3,
              },
            ].map((item, index) => (
              <VerticalTimelineElement
                key={index}
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "white",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.75rem",
                }}
                contentArrowStyle={{ borderRight: "12px solid white" }}
                date={item.year}
                dateClassName="text-[#00984a] font-bold"
                iconStyle={{
                  background: "white",
                  boxShadow: `0 0 0 4px ${brandColor}, inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05)`,
                  color: brandColor,
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                }}>
                <div className="overflow-hidden rounded-lg mb-4">
                  <img
                    src={item.image}
                    className="w-full h-48 sm:h-64 object-cover object-bottom"
                    alt={`${item.year} Milestone`}
                    loading={index > 0 ? "lazy" : "eager"}
                    decoding="async"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div
          className={`bg-gradient-to-r from-[${brandColor}] to-[${brandDark}] rounded-2xl p-8 sm:p-12 text-center`}
          style={{
            background: `linear-gradient(to right, ${brandColor}, ${brandDark})`,
          }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Experience World-Class Diagnostic Services?
          </h2>
          <p className="text-[#e6f5ee] mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied patients who trust us for accurate
            diagnostics and compassionate care.
          </p>
          <Link
            to="/contact"
            className="inline-block"
            aria-label="Contact us today">
            <button className="bg-white hover:bg-gray-100 text-[#00984a] font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              Contact Us Today
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Goals;
