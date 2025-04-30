import React from "react";
import "@fontsource/ubuntu";
import { LateTaheraAkhter } from "../assets";

const Chairman = () => {
  return (
    <div className="bg-gradient-to-b from-[#F5FFFA] to-white">
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Leadership <span className="text-[#00984a]">Legacy</span>
          </h1>
          <p className="text-lg text-gray-600">
            Visionary leadership that transformed healthcare in Bangladesh
          </p>
        </div>


        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative p-8 lg:p-10 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-8 sm:-inset-12 blur-2xl opacity-30">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-full animate-pulse duration-7000"></div>
                </div>

                <div className="relative z-10 mx-auto w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
                  <img
                    src={LateTaheraAkhter}
                    alt="Late Tahera Akhter"
                    className="w-full h-full object-cover"
                    style={{
                      imageRendering: "optimizeQuality",
                      transform: "scale(1.0)", 
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }}
                  />
                </div>
\
                <div className="text-center mt-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Late Tahera Akhter
                  </h2>
                  <p className="text-[#00984a] text-xl font-medium mt-2">
                    Visionary Chairman
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p className="mb-6 leading-relaxed">
                  After the liberation war, Bangladesh's health sector was in
                  disarray due to political instability. Tragically, many lives
                  were lost to incomplete diagnoses and inadequate treatment.
                  Recognizing this crisis, we established Popular Diagnostic
                  Centre Ltd. in Elephant Road, Dhaka, with a singular mission:
                  to bring modern diagnostic facilities to the people of
                  Bangladesh.
                </p>

                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg mb-6">
                  <p className="text-emerald-700 font-medium italic">
                    "Our vision was clear - to create a healthcare institution
                    that would set new standards in diagnostic accuracy and
                    patient care."
                  </p>
                </div>

                <p className="mb-6 leading-relaxed">
                  Since its inception in June 1983, Popular quickly became
                  synonymous with reliability and trust, earning the confidence
                  of both medical professionals and patients nationwide. We
                  pioneered the introduction of cutting-edge medical technology
                  in Bangladesh's private sector, continually upgrading our
                  facilities to ensure precise diagnoses.
                </p>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-emerald-100 text-[#00984a] rounded-full p-1 mr-3 mt-1">
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
                    <span>
                      First private diagnostic center with world-class medical
                      equipment
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-emerald-100 text-[#00984a] rounded-full p-1 mr-3 mt-1">
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
                    <span>
                      Commitment to affordable, high-quality diagnostic services
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-emerald-100 text-[#00984a] rounded-full p-1 mr-3 mt-1">
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
                    <span>
                      Reducing government healthcare burden through private
                      sector excellence
                    </span>
                  </li>
                </ul>

                <p className="leading-relaxed">
                  Today, Popular Diagnostic Centre remains committed to its
                  founding principles - delivering world-standard healthcare
                  services at affordable costs, making "Health for All" not just
                  a slogan but a tangible reality for the people of Bangladesh.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#00984a] to-[#007a3d] rounded-2xl p-8 sm:p-12 text-center text-white">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Continuing the Vision
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            The legacy of Late Tahera Akhter lives on through our unwavering
            commitment to healthcare excellence
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[200px]">
              <div className="text-3xl font-bold mb-2">40+</div>
              <div className="text-sm">Years of Service</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[200px]">
              <div className="text-3xl font-bold mb-2">100+</div>
              <div className="text-sm">Advanced Diagnostics</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[200px]">
              <div className="text-3xl font-bold mb-2">1M+</div>
              <div className="text-sm">Patients Served Annually</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Chairman;
