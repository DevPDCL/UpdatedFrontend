import React, { useEffect, useState } from "react";
import "@fontsource/ubuntu";
import axios from "axios";
import { servicePartners } from "../constants";
import Marquee from "react-fast-marquee";
function Cor() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://api.populardiagnostic.com/api/partners`,
          {
            params: {
              token: "UCbuv3xIyFsMS9pycQzIiwdwaiS3izz4",
            },
          }
        ); 
        setImages(response.data.data.data); 
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);
  return (
    <div className="mt-[150px] -mb-[10px]">
      <h3 className="text-gray-900/50 text-center text-[28px] font-ubuntu">
        Corporate Partners
      </h3>
      <div className="flex flex-row p-3 flex-wrap  sm:w-[80%] max-w-screen-xl mx-auto justify-center gap-10">
        <Marquee>
          <div className="flex flex-wrap">
            {images.map((image) => (
              <div key={image.id} className="m-10">
                <img
                  src={image.image}
                  alt={`Image ${image.id}`}
                  className="h-20 w-50"
                />
              </div>
            ))}
          </div>
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
