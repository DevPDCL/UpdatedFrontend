import React from "react";
import "@fontsource/ubuntu";
import { DrMostafizurRahman } from "../assets";

const Director = () => {
  return (
    <div className="bg-[#F5FFFA]">
      <div className="overflow-hidden bg-white py-16 sm:py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-gray-100/5 p-6 rounded-lg shadow-lg">
            {/* Image & Title Section */}
            <div className="relative flex flex-col items-center text-center">
              {/* SVG Background */}
              <div className="relative w-full h-[400px] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 288 288"
                  className="absolute bottom-5 h-full w-auto opacity-50 scale-150 sm:scale-125 sm:left-10"
                >
                  <linearGradient
                    id="PSgrad_0"
                    x1="70.711%"
                    x2="0%"
                    y1="70.711%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#52CC99" />
                    <stop offset="100%" stopColor="#00984a" />
                  </linearGradient>
                  <path fill="url(#PSgrad_0)">
                    <animate
                      repeatCount="indefinite"
                      attributeName="d"
                      dur="5s"
                      values="M37.5,186c-12.1-10.5-11.8-32.3-7.2-46.7c4.8-15,13.1-17.8,30.1-36.7C91,68.8,83.5,56.7,103.4,45 c22.2-13.1,51.1-9.5,69.6-1.6c18.1,7.8,15.7,15.3,43.3,33.2c28.8,18.8,37.2,14.3,46.7,27.9c15.6,22.3,6.4,53.3,4.4,60.2 c-3.3,11.2-7.1,23.9-18.5,32c-16.3,11.5-29.5,0.7-48.6,11c-16.2,8.7-12.6,19.7-28.2,33.2c-22.7,19.7-63.8,25.7-79.9,9.7 c-15.2-15.1,0.3-41.7-16.6-54.9C63,186,49.7,196.7,37.5,186z; M51,171.3c-6.1-17.7-15.3-17.2-20.7-32c-8-21.9,0.7-54.6,20.7-67.1c19.5-12.3,32.8,5.5,67.7-3.4C145.2,62,145,49.9,173,43.4 c12-2.8,41.4-9.6,60.2,6.6c19,16.4,16.7,47.5,16,57.7c-1.7,22.8-10.3,25.5-9.4,46.4c1,22.5,11.2,25.8,9.1,42.6 c-2.2,17.6-16.3,37.5-33.5,40.8c-22,4.1-29.4-22.4-54.9-22.6c-31-0.2-40.8,39-68.3,35.7c-17.3-2-32.2-19.8-37.3-34.8 C48.9,198.6,57.8,191,51,171.3z; M37.5,186c-12.1-10.5-11.8-32.3-7.2-46.7c4.8-15,13.1-17.8,30.1-36.7C91,68.8,83.5,56.7,103.4,45 c22.2-13.1,51.1-9.5,69.6-1.6c18.1,7.8,15.7,15.3,43.3,33.2c28.8,18.8,37.2,14.3,46.7,27.9c15.6,22.3,6.4,53.3,4.4,60.2 c-3.3,11.2-7.1,23.9-18.5,32c-16.3,11.5-29.5,0.7-48.6,11c-16.2,8.7-12.6,19.7-28.2,33.2c-22.7,19.7-63.8,25.7-79.9,9.7 c-15.2-15.1,0.3-41.7-16.6-54.9C63,186,49.7,196.7,37.5,186z"
                    />
                  </path>
                </svg>

                {/* Image */}
                <img
                  src={DrMostafizurRahman}
                  alt="Late Tahera Akhter"
                  className="relative z-10 h-[300px] w-auto rounded-3xl object-cover"
                />
              </div>

              {/* Name & Title */}
              <h1 className="text-gray-800 text-[28px] sm:text-[32px] md:text-[36px] font-bold mt-4">
                Dr. Mostafizur Rahman
              </h1>
              <p className="text-[#00984a] text-[18px] sm:text-[20px] font-medium">
                Managing Director
              </p>
            </div>

            {/* Text Section */}
            <div className="text-gray-600 text-justify px-2 sm:px-4">
              <p className="text-[16px] leading-relaxed">
                Popular started its journey as diagnostic centre in June 1983
                with a Promise to render the possible standard service to the
                people of the country at an affordable cost and in turn to limit
                the outflow of the patient abroad at the expense of heard earn
                foreign currency. When I started working in pathology department
                of Dhaka Medical College Hospital, I saw that thousands of
                people of our country are going to abroad every year only for
                treatment. The country was losing millions of taka worth foreign
                currency. That time I felt, as a Doctor I must do something
                about it. I had the spirit but didn't have the resources. From
                that inspiration I started Popular Diagnostic.
                <br />
                <br />
                Bangladesh is a developing country. We have tremendous scope and
                potentiality in our industry especially in health sector.
                Basically my father was a Doctor. None of my family members were
                engaged in business. My dream was to be a surgeon. But necessity
                and circumstances force me to start diagnostic business.
                Challenges and problems are many. But solving strategies are
                very few and precise. As a businessman we should relentlessly
                concern about our commitment and quality.
                <br />
                <br />
                To achieve the goal and ensure the quality service need highly
                skilled manpower who will continue to produce high level
                productivity relentlessly maintaining high standard of medical
                services. I always higher the skilled manpower and motivate
                them. Being an entrepreneur of a health services provider
                organization I always concern to ensure the right man in the
                right place. I believe that if a person whether he is a doctor
                or not works hard, has merit, good behaviour and remains honest,
                he will be a successful businessman. Success is nothing but a
                goal of achievement. In an every success has positive
                productivity, which is dedicated for the welfare of mankind.
                Almighty God, Honorable Doctors and my beloved colleagues are
                always inspired me to do good and take challenges. My all afford
                to happy them..
               
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Director;
