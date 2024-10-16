import React, { useEffect, useState } from "react";
import Layer from "./Layer";
import axios from "axios";
const Csample = () => {
  const [sampleCollections, setSampleCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSampleCollections = async () => {
      try {
        const response = await axios.get("http://51.20.54.185/api/sample-collections");
        setSampleCollections(response.data.payload.allSampleCollections);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSampleCollections();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }
  return (
    <>
      <section className="bg-white w-screen h-screen md:h-screen overflow-auto">
        <div class="grid grid-cols-12">
          <div className="h-screen col-span-2">
            <Layer />
          </div>
          <div class="col-span-10 flex flex-wrap  z-10 p-5 w-full bg-white">
            <div class="relative overflow-x-auto w-full p-5  sm:rounded-lg">
              <div class="pb-4 bg-white p-5  dark:bg-gray-900">
                <label for="table-search" class="sr-only">
                  Search
                </label>
                <div class="relative flex flex-row mt-1">
                  <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="table-search"
                    class="block p-2 w-[75%] mr-1 pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for items"
                  />

                </div>
              </div>
              <table class="w-full text-sm text-left  rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="py-2 px-4 border-b">Vendor</th>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Location</th>
                    <th className="py-2 px-4 border-b">Phone</th>
                    <th className="py-2 px-4 border-b">Picked Time</th>
                    <th className="py-2 px-4 border-b">Branch</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    {/* <th className="py-2 px-4 border-b">Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {sampleCollections.map((sampleCollection) => (
                    <tr key={sampleCollection._id}>
                      <td className="py-2 px-4 border-b">{sampleCollection.vendor}</td>
                      <td className="py-2 px-4 border-b">{sampleCollection.patientName}</td>
                      <td className="py-2 px-4 border-b">{sampleCollection.location}</td>
                      <td className="py-2 px-4 border-b">{sampleCollection.phone}</td>
                      <td className="py-2 px-4 border-b">
                        {new Date(sampleCollection.pickupTime).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border-b">{sampleCollection.branchName}</td>
                      
                      <td className="py-2 px-4 border-b">{sampleCollection.email}</td>
                      {/*<td className="py-2 px-4  border-b"><button className="mr-5 p-1 text-white rounded bg-red-600">Delete</button><button className="mr-5 p-1 text-white rounded bg-green-600">Edit</button></td>*/}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Csample