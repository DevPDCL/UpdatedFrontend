import React, { useEffect, useState } from "react";
import axios from "axios";

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

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Complaints</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Branch</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Complain</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ccomplain;
