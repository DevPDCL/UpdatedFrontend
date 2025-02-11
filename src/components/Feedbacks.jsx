import React, { useState, useEffect } from "react";
import axios from "axios";

const Feedbacks = () => {
  const [testimonal, setTestimonal] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.populardiagnostic.com/api/testimonials`, {
        params: {
          token: "UCbuv3xIyFsMS9pycQzIiwdwaiS3izz4",
        },
      })
      .then((response) => {
        setTestimonal(response.data.data.data);
      })
      .catch((error) => {
        console.error("Error fetching testimonal:", error);
      });
  }, []);

  return (
    <div>
      {testimonal.length > 0 ? (
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 p-5 mt-20 gap-20">
          {testimonal.map((testimonal) => (
            <div className="mx-auto shadow rounded p-5 " key={testimonal._id}>
              <img
                className="mx-auto"
                src={testimonal.image}
              />
              <span className="font-bold text-[25px]">"</span>
              <h3>{testimonal.comment}</h3>
              <span className="font-bold text-[25px]">"</span>
              <p className="text-center">{testimonal.company}</p>
              <p className="text-center">{testimonal.person}</p>
            </div>
          ))}
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Feedbacks;
