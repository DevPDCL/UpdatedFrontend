import React from "react";
import "@fontsource/ubuntu";
import video from "../assets/heroVideo.mp4";
import { MdShahiMahmud } from "../assets";
import { Search } from "../components";

const Shantinagar = () => {
  return (
    <section class="relative py-32 lg:py-36 bg-white">
      <div class="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row gap-10 lg:gap-12 pb-20">
        <div class="absolute w-full lg:w-1/2 inset-y-0 lg:right-0 hidden lg:block">
          <span class="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 skew-x-12 rounded-3xl bg-[#00984a] blur-xl opacity-60 lg:opacity-95 lg:block hidden"></span>
          <span class="absolute right-4 bottom-12 w-24 h-24 rounded-3xl bg-blue-600 blur-xl opacity-80"></span>
        </div>
        <span class="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-blue-600 to-[#00984a] absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span>
        <div
          class="relative flex flex-col items-center text-center lg:text-left lg:py-7 xl:py-8 
            lg:items-start lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2">
          <h1
            class="text-3xl leading-tight sm:text-4xl md:text-5xl xl:text-6xl
            font-bold text-[#00664a]">
            Popular Diagnostic Center{" "}
            <span class="text-transparent bg-clip-text bg-gradient-to-br from-[#00664a]  from-20% via-[#00984a] via-30% to-blue-600">
              Shantinagar{" "}
            </span>
            Branch.
          </h1>
          <div class="mt-10  w-full flex max-w-md mx-auto lg:mx-0"></div>
        </div>
        <div class="flex flex-1 relative mx-auto ">
          <video
            className="lg:absolute lg:w-full rounded-3xl object-cover shadow-2xl "
            alt="Hero Video"
            src={video}
            autoPlay
            loop
            muted
          />
        </div>
      </div>
      <div className="relative md:mt-[250px] mb-[100px]">
        <Search />
      </div>
      <div className="Relative">
        <div className="custom-shape-divider-top-1716352701 absolute left-0 w-full overflow-hidden line-height-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[164px]"
            style={{ width: "calc(100% + 1.3px)" }}>
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
              style={{ fill: "#ffffff" }}></path>
          </svg>
        </div>
        <div className="bg-gradient-to-br from-[#00664a] from-20% to-[#00984a] to-60% mt-12 mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col-reverse lg:flex-row-reverse justify-between gap-10 lg:gap-12 rounded-2xl">
          <img
            src={MdShahiMahmud}
            alt="Late Tahera Akhter"
            className="relative h-full w-auto rounded-3xl"
          />
          <div className="flex lg:items-start">
            <h1 className="text-gray-900/20 absolute font-bold text-[96px] -mt-10 -ml-10 overflow-hidden">
              Branch <span>Manager</span>
            </h1>
            <div className="relative mt-24 p-5">
              <h1 className="text-gray-200 font-bold text-[36px]">
                Md. Shahi Mahmud
              </h1>
              <h1 className="text-gray-300 font-bold text-[18px]">
                AGM & Head of Branch
              </h1>
              <p className="text-white">
                {" "}
                <br />
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shantinagar;
