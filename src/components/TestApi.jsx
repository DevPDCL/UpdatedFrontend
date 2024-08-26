import React, { useState, useEffect } from "react";

const API = "https://apex.oracle.com/pls/apex/hospitalmanagement/TEST_NAME/TEST_DATA";




const TestApi = () => {


const [test, setTest] = useState([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch(API);
        if (response.ok) {
          const test = await response.json();
          setTest(test.items);
        } else {
          console.error("Error fetching data from the API");
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    fetchTests();
  }, []);

  return (
    <div className="h-screen">
       
      <h1 className="text-gray-900/50 p-10 text-center text-[28px] font-bold font-ubuntu">Test Prices</h1>
       <div className= "flex justify-center"> 
<table className="border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">Test Code</th>
            <th className="border border-gray-400 px-4 py-2">Test Name</th>
            <th className="border border-gray-400 px-4 py-2">Test Rate</th>
          </tr>
        </thead>
        <tbody>
          {test.map((test) => (
            <tr key={test.id} className="border border-gray-400">
                <td className="border border-gray-400 px-4 py-2">{test.test_code}</td>
                <td className="border border-gray-400 px-4 py-2">{test.test_name}</td>
                <td className="border border-gray-400 px-4 py-2">
                {test.test_rate.toLocaleString("en-BD", {
                  style: "currency",
                  currency: "BDT",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default TestApi