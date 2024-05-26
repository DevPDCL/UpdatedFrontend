import React from "react";
import { branch } from "../constants";



const Hotlinecards = (props) => {
    const copyToClipboard = () => {
      navigator.clipboard.writeText(props.Hotline).then(
        () => {
          alert("Copied to clipboard!");
        },
        (err) => {
          console.error("Could not copy text: ", err);
        }
      );
    };

  return (
    <div class="my-3 p-3 bg-white/50 w-96 border-2 rounded-lg flex items-center justify-between ">
      <div class="flex-1 flex justify-between items-center">
        <div class="w-44 p-1 mr-2 text-center bg-gray-500 rounded text-gray-50 font-medium text-[20px]">
          {props.heading}
        </div>
        <div className="flex">
          <a
            href={`tel:${props.Hotline}`}
            class="w-34 p-1 rounded-l-lg bg-[#1b7ced] text-center text-gray-100 font-medium text-[18px]">
            {" "}
            {props.Hotline}{" "}
          </a>
          <button
            onClick={copyToClipboard}
            className="flex items-center py-2 px-3 text-gray-500 hover:text-gray-900 bg-gray-100 border border-gray-300 rounded-e-lg hover:bg-gray-200  "
            type="button">
            <svg
              id="copy-icon"
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20">
              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const Hotlines = () => {
  return (
    <div className="bg-gray-50">
      <div className="min-h-screen flex justify-center px-12">
        <div className="relative w-full max-w-7xl">
          <div class="absolute top-0 -left-4 w-72 h-72 bg-[#82bcff] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob "></div>
          <div class="absolute top-0 -right-4 w-72 h-72 bg-[#95e7bd] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div class="absolute top-96 left-20 w-72 h-72 bg-[#95e7bd] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          <div class="absolute bottom-48 -right-4 w-72 h-72 bg-[#82bcff] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="relative">
            <h2 className="text-gray-900/50 pt-20 text-center text-[28px] font-bold font-ubuntu">
              Hotline Numbers
            </h2>
            <div className="rounded-lg flex justify-center items-center flex-wrap">
              {branch.map((props) => (
                <div className=" flex justify-center w-full lg:w-1/2 2xl:w-1/3 ">
                  <Hotlinecards key={props.branchID} {...props} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotlines;
