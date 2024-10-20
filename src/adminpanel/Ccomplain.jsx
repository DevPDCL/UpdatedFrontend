import React, { useEffect, useState } from "react";
import axios from "axios";
import Layer from "./Layer";
const Ccomplain = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://51.20.54.185/api/complaints");
        setComplaints(response.data.payload.allComplaints);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://51.20.54.185/api/complaints/${id}/status`, {
        status: newStatus,
      });
      setComplaints((prev) =>
        prev.map((complaint) =>
          complaint._id === id ? { ...complaint, status: newStatus } : complaint
        )
      );
    } catch (err) {
      console.error(err); // Log the full error
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
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
                    viewBox="0 0 20 20">
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
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Phone</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Branch</th>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Complain</th>
                  <th className="py-2 px-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr key={complaint._id}>
                    <td className="py-2 px-4 border-b">{complaint.name}</td>
                    <td className="py-2 px-4 border-b">{complaint.phone}</td>
                    <td className="py-2 px-4 border-b">{complaint.email}</td>
                    <td className="py-2 px-4 border-b">{complaint.branch}</td>
                    <td className="py-2 px-4 border-b">
                      {new Date(complaint.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">{complaint.complain}</td>
                    <td className="py-2 px-4 border-b">
                      <select
                        value={complaint.status}
                        onChange={(e) =>
                          handleStatusChange(complaint._id, e.target.value)
                        }>
                        <option value="Submitted">Submitted</option>
                        <option value="Processing">Processing</option>
                        <option value="Customer Reply">Customer Reply</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ccomplain;
