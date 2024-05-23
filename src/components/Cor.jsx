import React from "react";
import "@fontsource/ubuntu";
import { servicePartners, corporatePartners } from "../constants";
import Marquee from "react-fast-marquee";
function Cor() {
  return (
    <div className="mt-[150px] -mb-[10px]">
      <h3 className="text-gray-900/50 text-center text-[28px] font-ubuntu">
        Corporate Partners
      </h3>
        <div className="flex flex-row p-3 flex-wrap mt-10 sm:w-[80%] max-w-screen-xl mx-auto justify-center gap-10">
           <Marquee>
          {corporatePartners.map((technology) => (
            <div className="mx-5 w-28 h-28" key={technology.name}>
              {/* Set explicit width and height on the image element */}
              <img
                src={technology.icon}
                alt={technology.name}
                width="112"
                height="112"
              />
            </div>
          ))}
          </Marquee>
        </div>
      <h3 className="text-gray-900/50 text-center text-[28px] font-ubuntu">
        Service Partners
      </h3>

      <div className="flex flex-wrap p-5 max-w-screen-xl mx-auto justify-center">
        {servicePartners.map((technology) => (
          <div className="w-[300px] p-5 h-28" key={technology.id}>
            <img
              src={technology.icon}
              alt={technology.name}
              width="300"
              height="112"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cor;
