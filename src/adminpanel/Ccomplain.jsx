import React, { useEffect, useState } from "react";
import axios from "axios";
import Layer from "./Layer";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Ccomplain = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(false);

    try {
      const response = await axios.get(`https://test.populardiagnostic.org/api/complaints/search?name=${searchTerm}`);
      setResults(response.data); 
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm) {
        setLoading(false);
        try {
          const response = await axios.get(`https://test.populardiagnostic.org/api/complaints/search?name=${searchTerm}`);
          setComplaints(response.data);
        } catch (err) {
          setError('Error fetching data');
        } finally {
          setLoading(false);
        }
      } else {

        fetchComplaints();
      }
    };
    fetchSearchResults();
  }, [searchTerm])
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          "https://test.populardiagnostic.org/api/complaints"
        );
        setComplaints(response.data.payload.allComplaints);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

 

  const getColorCode = (status) => {
    const colorCodes = {
      Submitted: "#ffffff",
      Processing: "#fef9c3",
      "Customer Reply": "#dbeafe",
      Completed: "#dcfce7",
    };
    return colorCodes[status] || "#ffffff"; // Default to white if status is invalid
  };
 
  const handleStatusChange = async (id, newStatus) => {
    // Show confirmation alert
    const confirmed = window.confirm(
      `Are you sure you want to change the status to "${newStatus}"?`
    );

    if (!confirmed) {
      return; // Exit the function if the user clicked "No"
    }

    try {
      await axios.patch(
        `https://test.populardiagnostic.org/api/complaints/${id}/status`,
        {
          status: newStatus,
        }
      );
      setComplaints((prev) =>
        prev.map((complaint) =>
          complaint._id === id
            ? {
                ...complaint,
                status: newStatus,
                colorCode: getColorCode(newStatus),
              }
            : complaint
        )
      );
    } catch (err) {
      console.error(err);
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  // Function to generate PDF
  const downloadPDF = async () => {
    // Wait for the component to render before trying to capture the table
    await new Promise((resolve) => setTimeout(resolve, 100));

    const pdf = new jsPDF("l", "mm", "a4");

    // Set margins
    const margin = 10; // margin in mm

    // Add header
    pdf.setFontSize(20);
    pdf.text(
      "Complaint Status Report",
      pdf.internal.pageSize.getWidth() / 2,
      margin + 10,
      null,
      null,
      "center"
    );

    // Set the autoTable properties
    pdf.autoTable({
      head: [
        ["Name", "Phone", "Email", "Branch", "Date", "Complain", "Status"],
      ],
      body: complaints.map((complaint) => [
        complaint.name,
        complaint.phone,
        complaint.email,
        complaint.branch,
        new Date(complaint.date).toLocaleDateString(),
        complaint.complain,
        complaint.status,
      ]),
      startY: margin + 30,
      margin: { horizontal: margin },
      styles: {
        cellPadding: 3,
        fontSize: 11,
        valign: "middle",
        halign: "center",
      },
      headStyles: {
        fillColor: [22, 160, 133], // header color
        textColor: [255, 255, 255], // White text
        fontSize: 14,
      },
      theme: "grid",
    });

    // Save the PDF
    pdf.save("complaints.pdf");
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
          <div class="relative overflow-x-auto w-full p-5 mx-10 sm:rounded-lg">
            <div class="pb-4 bg-white p-5 flex justify-between">
              <div class="relative flex flex-row">
                <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500"
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
                <div>
                  
                  <form  onSubmit={handleSearchSubmit}>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      placeholder="Enter name to search"
                    />
                    <button type="submit">Search</button>
                  </form>

                 

                 
                </div>
              </div>
              <button
                onClick={downloadPDF}
                className="mb-4 p-2 bg-blue-500 text-white rounded">
                Export
              </button>
            </div>
            <table className="min-w-full text-sm text-gray-500 border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 border-b text-center text-gray-700 uppercase">
                    Name
                  </th>
                  <th className="py-2 px-4 border-b text-center text-gray-700 uppercase">
                    Phone
                  </th>
                  <th className="py-2 px-4 border-b text-center text-gray-700 uppercase">
                    Email
                  </th>
                  <th className="py-2 px-4 border-b text-center text-gray-700 uppercase">
                    Branch
                  </th>
                  <th className="py-2 px-4 border-b text-center text-gray-700 uppercase">
                    Date
                  </th>
                  <th className="py-2 px-4 border-b text-center text-gray-700 uppercase">
                    Complain
                  </th>
                  <th className="py-2 px-4 border-b text-center text-gray-700 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr
                    key={complaint._id}
                    style={{ backgroundColor: complaint.colorCode }}
                    className="text-center">
                    <td className="py-2 px-4 border-b">{complaint.name}</td>
                    <td className="py-2 px-4 border-b">{complaint.phone}</td>
                    <td className="py-2 px-4 border-b">{complaint.email}</td>
                    <td className="py-2 px-4 border-b">{complaint.branch}</td>
                    <td className="py-2 px-4 border-b">
                      {new Date(complaint.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">{complaint.complain}</td>
                    <td className="py-3 px-4 border-b">
                      <select
                        value={complaint.status}
                        onChange={(e) =>
                          handleStatusChange(complaint._id, e.target.value)
                        }
                        className="border rounded px-2 py-1 text-center">
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
