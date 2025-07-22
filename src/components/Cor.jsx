import React, { useEffect, useState } from "react";
import "@fontsource/ubuntu";
import axios from "axios";
import { servicePartners } from "../constants";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { API_TOKEN, BASE_URL } from "../secrets";

function Cor() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/partners`, {
          params: {
            token: `${API_TOKEN}`,
          },
        });
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
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center text-[#00984a] font-bold mb-8 font-ubuntu text-3xl">
        Corporate Partners
      </motion.h2>
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
      <div className="mt-20 border border-[#00984a]/30 bg-gray-100 rounded-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-[#00984a] font-bold pt-8 mb-8 font-ubuntu text-3xl">
          Service Partners
        </motion.h2>

        <div className="flex flex-wrap p-5 gap-4 max-w-screen-xl mx-auto justify-center">
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
    </div>
  );
}

export default Cor;
