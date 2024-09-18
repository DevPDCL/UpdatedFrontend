import React, { useState } from "react";
import "@fontsource/ubuntu";
import axios from "axios";

function Sample() {
  const [formData, setFormData] = useState({
    vendor: [],
    patientName: "",
    location: "",
    phone: "",
    pickupTime: "",
    branchName: "Dhanmondi",
    email: "",
  });

  const branches = [
    "Dhanmondi", "English Road", "Shantinagar", "Shyamoli", "Mirpur", "Uttara", 
    "Uttara Garib-E-Newaz", "Badda", "Jatrabari", "Savar", "Gazipur", "Narayangonj", 
    "Bogura", "Rajshahi", "Noakhali", "Chattogram", "Mymensingh", "Rangpur", 
    "Dinajpur", "Khulna", "Kushtia", "Barishal"
  ];
  const vendors = ["Amar Lab", "Arogga"];

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        vendor: checked
          ? [...prevData.vendor, value]
          : prevData.vendor.filter((v) => v !== value)
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(
        "http://51.20.54.185/api/sample-collections",
        formData
      );
      setSuccess("Sample collection request submitted successfully!");
      setFormData({
        vendor: [],
        patientName: "",
        location: "",
        phone: "",
        pickupTime: "",
        branchName: "Dhanmondi",
        email: "",
      });
    } catch (error) {
      console.error(
        "There was an error sending sample collection request!",
        error
      );
      setError("Failed to submit sample collection request. Please try again.");
    }
  };

  return (
    <div className="bg-[#e2f0e5] p-1">
      <div className=" pt-0">
        <h1>Sample Pickup</h1>
        <hr />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-1 flex flex-col gap-6">
          <div className="bg-[#e2f0e5] pt-3 pb-3">
            <div>
              <label>Vendor:</label>
              {vendors.map((vendor) => (
                <div key={vendor}>
                  <input
                    type="checkbox"
                    name="vendor"
                    value={vendor}
                    checked={formData.vendor.includes(vendor)}
                    onChange={handleChange}
                  />
                  <label>{vendor}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#e2f0e5] pt-3 pb-3">
            <div>
              <label>Patient Name:</label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="bg-[#e2f0e5]  pb-3">
            <div>
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="bg-[#e2f0e5] pb-3">
            <div>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="bg-[#e2f0e5] pb-3">
            <div>
              <label>Pickup Time:</label>
              <input
                type="time"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="bg-[#e2f0e5] pb-3">
            <div>
              <label>Branch Name:</label>
              <select
                name="branchName"
                value={formData.branchName}
                onChange={handleChange}
              >
                {branches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-[#e2f0e5] pb-3">
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
      </form>
    </div>
  );
}

export default Sample;