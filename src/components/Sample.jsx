import React, { useState } from "react";
import "@fontsource/ubuntu";
import axios from "axios";
import {
  Card,
  CardBody,
  Button,
} from "@material-tailwind/react";
import { Input, Select, Option } from "@material-tailwind/react";
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
        "https://test.populardiagnostic.org/api/sample-collections",
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
        <Card className="w-full max-w-[40rem] p-3  mx-auto  flex-col">
          <CardBody
            shadow={false}
            floated={false}
            className="ml-0 w-full shrink-0 me-auto rounded-r-none">
            <h1 className=" text-[24px] text-black font-medium font-ubuntu">
              Home Collection
            </h1>
            <p className=" pb-3 text-[15px] text-black font-small font-ubuntu">
              Sample Collection Services (Amar Lab our Service Partner.)
            </p>

            <hr />
            <p className=" pt-3 text-[15px] text-[red] font-small font-ubuntu">
              * Indicates required question
            </p>
          </CardBody>
        </Card>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-1  flex flex-col gap-6">
          <div className="bg-[#e2f0e5] pt-3 pb-3">
            <Card className="w-full max-w-[40rem] p-3 mx-auto flex-col">
              <CardBody
                shadow={false}
                floated={false}
                className="ml-0 w-full shrink-0 me-auto rounded-r-none">
                <h1 className=" text-[18px] text-black font-medium font-ubuntu">
                  Vendor{" "}
                  {/* <span className=" text-[15px] text-[red] font-medium font-ubuntu">
                    *
                  </span> */}
                </h1>
                {vendors.map((vendor) => (
                  <div key={vendor}>
                    <input
                      type="checkbox"
                      name="vendor"
                      value={vendor}
                      checked={formData.vendor.includes(vendor)}
                      onChange={handleChange}
                      required
                    />
                    <label>{vendor}</label>
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>

          <div className="bg-[#e2f0e5] pt-3 pb-3">
            <div>
              <Card className="w-full max-w-[40rem] p-3 mx-auto flex-col">
                <CardBody
                  shadow={false}
                  floated={false}
                  className="ml-0 w-full shrink-0 me-auto rounded-r-none">
                  <h1 className=" text-[18px] text-black font-medium font-ubuntu">
                    Name{" "}
                  </h1>
                  <Input
                    className="border-b-[1px] bg-white m-1 p-2 text-black"
                    name="patientName"
                    variant="static"
                    type="text"
                    placeholder="Your Answer"
                    value={formData.patientName}
                    onChange={handleChange}
                    required
                  />
                </CardBody>
              </Card>
            </div>
          </div>

          <div className="bg-[#e2f0e5]  pb-3">
            <div>
              <Card className="w-full max-w-[40rem] p-3 mx-auto flex-col">
                <CardBody
                  shadow={false}
                  floated={false}
                  className="ml-0 w-full shrink-0 me-auto rounded-r-none">
                  <h1 className=" text-[18px] text-black font-medium font-ubuntu">
                    Location{" "}
                  </h1>
                  <Input
                    className="border-b-[1px] bg-white m-1 p-2 text-black"
                    name="location"
                    variant="static"
                    type="text"
                    placeholder="Your Answer"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </CardBody>
              </Card>
            </div>
          </div>

          <div className="bg-[#e2f0e5] pb-3">
            <div>
              <Card className="w-full max-w-[40rem] p-3 mx-auto flex-col">
                <CardBody
                  shadow={false}
                  floated={false}
                  className="ml-0 w-full shrink-0 me-auto rounded-r-none">
                  <h1 className=" text-[18px] text-black font-medium font-ubuntu">
                    Phone{" "}
                  </h1>
                  <Input
                    className="border-b-[1px] bg-white m-1 p-2 text-black"
                    name="phone"
                    variant="static"
                    type="text"
                    placeholder="Your Answer"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </CardBody>
              </Card>
            </div>
          </div>

          <div className="bg-[#e2f0e5] pb-3">
            <div>
              <Card className="w-full max-w-[40rem] p-3 mx-auto flex-col">
                <CardBody
                  shadow={false}
                  floated={false}
                  className="ml-0 w-full shrink-0 me-auto rounded-r-none">
                  <h1 className=" text-[18px] text-black font-medium font-ubuntu">
                    Pickup Time{" "}
                  </h1>
                  <Input
                    className="border-b-[1px] bg-white m-1 p-2 text-black"
                    name="pickupTime"
                    variant="static"
                    type="time"
                    placeholder="Your Answer"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    required
                  />
                </CardBody>
              </Card>
            </div>
          </div>

          <div className="bg-[#e2f0e5] pb-3">
            <div>
              <Card className="w-full max-w-[40rem] p-3 mx-auto flex-col">
                <CardBody
                  shadow={false}
                  floated={false}
                  className="ml-0 w-full shrink-0 me-auto rounded-r-none">
                  <h1 className=" text-[18px] text-black font-medium font-ubuntu">
                    Branch Name{" "}
                  </h1>
                  <select
                    className="border-b-[1px] bg-white m-1 p-2 text-black"
                    name="branchName"
                    variant="static"
                    type="text"
                    placeholder="Your Answer"
                    value={formData.branchName}
                    onChange={handleChange}
                    required>
                    {branches.map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                </CardBody>
              </Card>
            </div>
          </div>

          <div className="bg-[#e2f0e5] pb-3">
            <div>
              <Card className="w-full max-w-[40rem] p-3 mx-auto flex-col">
                <CardBody
                  shadow={false}
                  floated={false}
                  className="ml-0 w-full shrink-0 me-auto rounded-r-none">
                  <h1 className=" text-[18px] text-black font-medium font-ubuntu">
                    Email{" "}
                  </h1>
                  <Input
                    className="border-b-[1px] bg-white m-1 p-2 text-black"
                    name="email"
                    variant="static"
                    type="email"
                    placeholder="Your Answer"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </CardBody>
              </Card>
            </div>
          </div>
          <div className="flex max-w-[40rem]  bg-[#e2f0e5] pb-3 mx-auto">
            <button
              type="submit"
              className="bg-[#00984a] p-2 mt-10 rounded ms-auto">
              Submit
            </button>
          </div>
          <div className="flex max-w-[40rem]  bg-[#e2f0e5] pb-3 mx-auto">
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Sample;