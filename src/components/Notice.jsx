import React, { useState, useEffect } from "react";
import axios from "axios";

const Notice = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.populardiagnostic.com/api/news-and-notices`, {
        params: {
          token: "UCbuv3xIyFsMS9pycQzIiwdwaiS3izz4",
        },
      }) 
      .then((response) => {
        setNotices(response.data.data.data);
      })
      .catch((error) => {
        console.error("Error fetching notices:", error);
      });
  }, []);

  return (
    <div>
      {notices.length > 0 ? (
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 p-5 mt-20 gap-10">
          {notices.map((notice) => (
            <div className="" key={notice._id}>
              <h3 className="font-bold mb-3">{notice.title}</h3>
              <img className="h-60 w-full" src={notice.image} />
              <button className="mt-2 bg-[#00984a] p-2 rounded text-white">See more</button>
            </div>
          ))}
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Notice
