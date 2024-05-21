import React from "react";
import "@fontsource/ubuntu";
import { motion } from "framer-motion";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

function Details({ branchPage, onClose }) {
  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
      <motion.div
        className="flex flex-col bg-[#eaf8f2] shadow-2xl rounded-xl mx-5"
        animate={{ y: 80, scale: 0.8 }}
      >
        <motion.button
          onClick={onClose}
          className="text-black bg-slate-100 mt-2 mr-2 border-solid border-2 rounded-lg font-bold place-self-end p-1"
          layout
          transition={spring}
          whileTap={{ scale: 0.9 }}
        >
          ❌
        </motion.button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between  text-black px-5 pb-5 pt-2">
          <div className=" bg-slate-100  justify-center border-solid border-2 border-y-PDCL-green shadow-2xl rounded-lg px-5">
            <img
              className="w-full h-auto object-cover rounded-lg"
              src={branchPage.braManImg}
              alt="Branch_Manager_Image"
            />
            <h1 className="text-center text-gray-600 font-bold font-ubuntu px-2 pt-4 text-[20px]">
              {branchPage.braManName}
            </h1>
            <h1 className="text-center text-gray-500 font-bold font-ubuntu px-2 pb-4 text-[14px]">
              {" "}
              {branchPage.braManDesignation}
            </h1>
          </div>

          <div className=" bg-slate-100 justify-center border-solid border-2 border-y-PDCL-green shadow-2xl rounded-lg p-5">
            <iframe
              src={branchPage.location}
              className="p-2 w-full h-5/6 object-cover rounded-3xl"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            <h1 className="text-center font-bold rounded-md p-5 font-ubuntu text-[18px] shadow-xl">
              Location On Map 🗺️📌
            </h1>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Details;
