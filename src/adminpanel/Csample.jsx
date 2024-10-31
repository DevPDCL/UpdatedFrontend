import React, { useEffect, useState } from "react";
import Layer from "./Layer";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Csample = () => {
  const [sampleCollections, setSampleCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSampleCollections = async () => {
      try {
        const response = await axios.get(
          "https://test.populardiagnostic.org/api/sample-collections"
        );
        setSampleCollections(response.data.payload.allSampleCollections);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSampleCollections();
  }, []);

  const getColorCode = (status) => {
    const colorCodes = {
      Submitted: "#ffffff",
      Processing: "#fef9c3",
      "On the way": "#dbeafe",
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
        `https://test.populardiagnostic.org/api/sample-collections/${id}/status`,
        {
          status: newStatus,
        }
      );
      setSampleCollections((prev) =>
        prev.map((sample) =>
          sample._id === id
            ? {
                ...sample,
                status: newStatus,
                colorCode: getColorCode(newStatus),
              }
            : sample
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
      "Sample Collection Status Report",
      pdf.internal.pageSize.getWidth() / 2,
      margin + 10,
      null,
      null,
      "center"
    );

    // Set the autoTable properties
    pdf.autoTable({
      head: [
        [
          "Vendor",
          "Name",
          "Email",
          "Phone",
          "Location",
          "Branch",
          "Time to pick",
          "Status",
        ],
      ],
      body: sampleCollections.map((sampleCollection) => [
        sampleCollection.vendor,
        sampleCollection.patientName,
        sampleCollection.email,
        sampleCollection.phone,
        sampleCollection.location,
        sampleCollection.branchName,
        new Date(sampleCollection.pickupTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sampleCollection.status,
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
    pdf.save("Sample Collection Report.pdf");
  };

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
                  <input
                    type="text"
                    id="table-search"
                    class="block p-2 w-[75%] mr-1 pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search for items"
                  />
                </div>
                <button
                  onClick={downloadPDF}
                  className="mb-4 p-2 bg-blue-500 text-white rounded">
                  Export
                </button>
              </div>
              <table class="w-full text-sm text-left  rtl:text-right text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th className="py-2 px-4 border-b">Vendor</th>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Location</th>
                    <th className="py-2 px-4 border-b">Phone</th>
                    <th className="py-2 px-4 border-b">Picked Time</th>
                    <th className="py-2 px-4 border-b">Branch</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Status</th>
                    {/* <th className="py-2 px-4 border-b">Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {sampleCollections.map((sampleCollection) => (
                    <tr
                      key={sampleCollection._id}
                      style={{ backgroundColor: sampleCollection.colorCode }}>
                      <td className="py-2 px-4 border-b">
                        {sampleCollection.vendor}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {sampleCollection.patientName}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {sampleCollection.location}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {sampleCollection.phone}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {new Date(
                          sampleCollection.pickupTime
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {sampleCollection.branchName}
                      </td>

                      <td className="py-2 px-4 border-b">
                        {sampleCollection.email}
                      </td>

                      <td className="py-2 px-4 border-b">
                        <select
                          value={sampleCollection.status}
                          onChange={(e) =>
                            handleStatusChange(
                              sampleCollection._id,
                              e.target.value
                            )
                          }>
                          <option value="Submitted">Submitted</option>
                          <option value="Processing">Processing</option>
                          <option value="On the way">On the way</option>
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
    </>
  );
};

export default Csample;
