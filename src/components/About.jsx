import React, { useState, useEffect } from "react";
import axios from "axios";

const About = () => {
  const [about, setAbout] = useState([]);
  const [about1, setAbout1] = useState([]);
  const [about2, setAbout2] = useState([]);
  const [about3, setAbout3] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.populardiagnostic.com/api/management-team`, {
        params: {
          token: "UCbuv3xIyFsMS9pycQzIiwdwaiS3izz4",
        },
      })
      .then((response) => {
        const row1 = response.data.data["Row - 1"];
        const row2 = response.data.data["Row - 2"];
        const row3 = response.data.data["Row - 3"];
        const row4 = response.data.data["Row - 4"];
        setAbout(row1);
        setAbout1(row2);
        setAbout2(row3);
        setAbout3(row4);
      })
      .catch((error) => {
        console.error("Error fetching about:", error);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mt-20 ">
        {about.length > 0 ? (
          <div className="max-w-7xl me-auto grid md:grid-cols-4 ">
            {about.map((about) => (
              <div
                className="mx-auto col-span-2 shadow rounded p-5"
                key={about.id}
              >
                <img
                  className="mx-auto w-[250px] h-[300px]"
                  src={about.image}
                  alt={about.name}
                />
                <p className="text-center">{about.name}</p>
                <p className="text-center">{about.designation}</p>
              </div>
            ))}
          </div>
        ) : (
          <p></p>
        )}
      </div>

      <div className="mt-20">
        {about1.length > 0 ? (
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 p-5 mt-20 gap-20">
            {about1.map((about) => (
              <div className="mx-auto shadow rounded p-5" key={about.id}>
                <img
                  className="mx-auto w-[250px] h-[300px]"
                  src={about.image}
                  alt={about.name}
                />
                <p className="text-center">{about.name}</p>
                <p className="text-center">{about.designation}</p>
              </div>
            ))}
          </div>
        ) : (
          <p></p>
        )}
      </div>
      <div className="mt-20">
        {about2.length > 0 ? (
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 p-5 mt-20 gap-20">
            {about2.map((about) => (
              <div className="mx-auto shadow rounded  p-5" key={about.id}>
                <img
                  className="mx-auto w-[250px] h-[300px]"
                  src={about.image}
                  alt={about.name}
                />
                <p className="text-center">{about.name}</p>
                <p className="text-center">{about.designation}</p>
              </div>
            ))}
          </div>
        ) : (
          <p></p>
        )}
      </div>
      <div className="mt-20">
        {about3.length > 0 ? (
          <div className="max-w-7xl mx-auto grid md:grid-cols-5 mb-20  mt-20 gap-5">
            {about3.map((about) => (
              <div className="mx-auto shadow rounded p-5" key={about.id}>
                <img
                  className="mx-auto h-[200px]"
                  src={about.image}
                  alt={about.name}
                />
                <p className="text-center">{about.name}</p>
                <p className="text-center">{about.designation}</p>
              </div>
            ))}
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default About;
