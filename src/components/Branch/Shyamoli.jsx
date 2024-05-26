import React from "react";
import "@fontsource/ubuntu";
import video from "../../assets/heroVideo.mp4";
import { Search } from "../../components";
import { branch } from "../../constants";

const UnitCard = ({ unit }) => {
  return (
    <div className="sm:w-[399px] w-full p-4 shadow-2xl rounded-2xl">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <img
          src={unit.image}
          alt={`Branch ${unit.BranchUnit}`}
          className="w-full shadow-xl rounded-3xl object-cover p-2 object-center"
        />
        <div className="p-4">
          <h2 className="title-font text-2xl font-medium text-center text-gray-900 mb-3">
            {unit.name}
          </h2>
          <p className="leading-relaxed text-gray-800 mb-3">
            <span className=" font-medium">Address:</span> {unit.address}
          </p>
          <div className=" bg-slate-100 justify-center border-dashed border-2  rounded-lg">
            <iframe
              src={unit.location}
              className="p-2 w-full h-5/6 object-cover rounded-3xl"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe>
            <h1 className="text-center font-medium rounded-md p-2 font-ubuntu text-[18px] text-black shadow-xl">
              Location On Map 🗺️📌
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

const Shyamoli = () => {
  const branchInfo = branch.find((b) => b.heading === "Shyamoli");
  return (
    <section class="relative py-32 lg:py-36 bg-white">
      <h1 className="text-gray-700/70 text-center text-4xl -mt-24 font-bold font-ubuntu">
        Welcome To
      </h1>
      <h1
        class=" text-center text text-3xl mt-5 leading-tight sm:text-4xl md:text-5xl xl:text-6xl
            font-bold text-[#00664a]">
        Popular Diagnostic Center{" "}
        <span class="text-7xl text-transparent bg-clip-text bg-gradient-to-br from-[#00664a]  from-20% via-[#00984a] via-30% to-blue-600">
          {branchInfo.heading}{" "}
        </span>
        Branch.
      </h1>
      <div class="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row gap-10 lg:gap-12 pb-20">
        <div class="absolute w-full lg:w-1/2 inset-y-0 lg:right-0 hidden lg:block">
          <span class="absolute -left-6 md:left-4 top-24 lg:top-60 w-24 h-24 rotate-90 skew-x-12 rounded-3xl bg-[#00984a] blur-xl opacity-60 lg:opacity-80 lg:block hidden"></span>
          <span class="absolute right-4 top-96 w-24 h-24 rounded-3xl bg-blue-600 blur-xl opacity-80"></span>
        </div>
        <span class="w-4/12 aspect-square bg-gradient-to-tr from-blue-600 to-[#00984a] absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span>
        <div class="flex flex-1 pt-10 relative mx-auto ">
          <video
            className=" lg:w-[1000px] lg:h-[500px] mx-auto rounded-3xl object-cover shadow-2xl "
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
      <div className="relative">
        <div className="bg-gradient-to-bl from-transparent from-80% via-[#00984a] via-30% to-[#00664a] mt-12 mx-auto lg:max-w-7xl w-full flex flex-col lg:flex-row justify-evenly rounded-3xl items-end">
          <img
            src={branchInfo.braManImg}
            alt="Late Tahera Akhter"
            className="relative mx-auto h-full w-auto border-[6px] border-[#00984a] rounded-3xl"
          />
          <div className="flex lg:item-start">
            <h1 className="text-gray-500/30 text-center absolute font-bold text-[96px] -mt-10 ml-5 lg:-mt-20 lg:-ml-48 overflow-hidden">
              Branch{" "}
              <h1 className="text-gray-500/20 ml-10 -mt-16 lg:-mt-14 text-[72px] lg:ml-48">
                Manager
              </h1>
            </h1>
            <div className="relative mt-24 p-5">
              <h1 className="text-gray-600 font-bold text-[36px]">
                {branchInfo.braManName}
              </h1>
              <h1 className="text-gray-500 font-bold text-[18px]">
                {branchInfo.braManDesignation}
              </h1>
              <p className="text-black w-full">
                {" "}
                <br />
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia d."
              </p>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-gray-900/50 pt-20 text-center text-[28px] font-bold font-ubuntu">
        Units in {branchInfo.heading}
      </h2>
      <div className="px-5 py-6">
        <div className="flex mx-auto flex-wrap max-w-7xl justify-center gap-4">
          {branchInfo.branchUnits.map((unit) => (
            <UnitCard key={unit.unitID} unit={unit} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shyamoli;
