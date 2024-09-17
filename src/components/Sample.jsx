import React, { useState } from "react";
import "@fontsource/ubuntu";
import {
  Card,
  CardBody,
} from "@material-tailwind/react";
import { Input, Select, Option } from "@material-tailwind/react";

import axios from "axios";

function Sample() {

  const [formData, setFormData] = useState({
    vendor: "",
    patientName: "",
    location : "",
    phone: "",
    pickupTime: "",
    branchName: "",
    email: ""
    
  });
  const branches = [
    "Dhanmondi",
    "English Road",
    "Shantinagar",
    "Shyamoli",
    "Mirpur",
    "Uttara",
    "Uttara Garib-E-Newaz",
    "Badda",
    "Jatrabari",
    "Savar",
    "Gazipur",
    "Narayangonj",
    "Bogura",
    "Rajshahi",
    "Noakhali",
    "Chattogram",
    "Mymensingh",
    "Rangpur",
    "Dinajpur",
    "Khulna",
    "Kushtia",
    "Barishal",
  ];
  const vendors = [
    "Amar Lab",
    "Arrogga",
    
  ];

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
      setSuccess("Message sent successfully!");
      setFormData({
        vendor: "",
        patientName: "",
        location: "",
        phone: "",
        pickupTime: "",
        branchName: "",
        email: ""
      });
    } catch (error) {
      console.error("There was an error sending the message!", error);
      setError("Failed to send message. Please try again.");
    }
  };






  return (
    <div className="bg-[#e2f0e5] p-1">
      <div className=" pt-0">
        
        <Card className="w-full max-w-[40rem] p-3 mx-auto flex-col">
          <CardBody
            shadow={false}
            floated={false}
            className="ml-0 w-full shrink-0 me-auto rounded-r-none"
          >
            <h1 className=" text-[24px] text-black font-medium font-ubuntu">
              Sample Pickup
            </h1>

            <p className=" pb-3 text-[15px] text-black font-small font-ubuntu">
              Sample Collection Services (Amar Lab & Arogga are our Service
              Partner.)
            </p>
            <hr />
            
            <hr />
            <p className=" pt-3 text-[15px] text-[red] font-small font-ubuntu">
              * Indicates required question
            </p>
          </CardBody>
        </Card>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-1 flex flex-col gap-6">
      <div className="bg-[#e2f0e5] pt-3 pb-3">
        
        <Card className="w-full max-w-[40rem] p-3 mx-auto flex-col">
          <CardBody
            shadow={false}
            floated={false}
            className="ml-0 w-full shrink-0 me-auto rounded-r-none"
          >
            <h1 className=" text-[18px] pb-5 text-black font-medium font-ubuntu">
              Vendor{" "}
              <span className=" text-[15px] text-[red] font-medium font-ubuntu">
                *
              </span>
            </h1>

            <select
              name="vendor"
              value={formData.vendor}
              onChange={handleChange}>
              {vendors.map((vendor) => (
                <option key={vendor} value={vendor}>
                  {vendor}
                </option>
              ))}
            </select>

            <p className=" pt-3 text-[12px] text-[red] font-small font-ubuntu">
              This is a required question
            </p>
          </CardBody>
        </Card>
      </div>
      
      <div className="bg-[#e2f0e5] pt-3 pb-3">
        <Card className="w-full max-w-[40rem] p-3 mx-auto flex-col">
          <CardBody
            shadow={false}
            floated={false}
            className="ml-0 w-full shrink-0 me-auto rounded-r-none"
          >
            <h1 className=" text-[18px] text-black font-medium font-ubuntu">
              Patient Name{" "}
              <span className=" text-[15px] text-[red] font-medium font-ubuntu">
                *
              </span>
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
            <p className=" pt-3 text-[12px] text-[red] font-small font-ubuntu">
              This is a required question
            </p>
          </CardBody>
        </Card>
      </div>

      <div className="bg-[#e2f0e5]  pb-3">
        <Card className="w-full max-w-[40rem] p-3 mx-auto flex-col">
          <CardBody
            shadow={false}
            floated={false}
            className="ml-0 w-full shrink-0 me-auto rounded-r-none"
          >
            <h1 className=" text-[18px] text-black font-medium font-ubuntu">
              Location{" "}
              <span className=" text-[15px] text-[red] font-medium font-ubuntu">
                *
              </span>
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
            <p className=" pt-3 text-[12px] text-[red] font-small font-ubuntu">
              This is a required question
            </p>
          </CardBody>
        </Card>
      </div>

      <div className="bg-[#e2f0e5] pb-3">
        <Card className="w-full max-w-[40rem] p-3 mx-auto flex-col">
          <CardBody
            shadow={false}
            floated={false}
            className="ml-0 w-full shrink-0 me-auto rounded-r-none"
          >
            <h1 className=" text-[18px] text-black font-medium font-ubuntu">
              Phone Number{" "}
              <span className=" text-[15px] text-[red] font-medium font-ubuntu">
                *
              </span>
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
            <p className=" pt-3 text-[12px] text-[red] font-small font-ubuntu">
              This is a required question
            </p>
          </CardBody>
        </Card>

      </div>
      <div className="bg-[#e2f0e5]  ">
        <Card className="w-full max-w-[40rem] p-3 mx-auto flex-col">
          <CardBody
            shadow={false}
            floated={false}
            className="ml-0 w-full shrink-0 me-auto rounded-r-none"
          >
            <h1 className=" text-[18px] text-black font-medium font-ubuntu">
              Sample Pickup Time{" "}
              <span className=" text-[15px] text-[red] font-medium font-ubuntu">
                *
              </span>
            </h1>
            <Input
              className="border-b-[1px] bg-white m-1 p-2 text-black"
                name="pickupTime"
                variant="static"
                type="date"
                placeholder="Your Answer"
                value={formData.pickupTime}
                onChange={handleChange}
                required
            />
            <p className=" pt-3 text-[12px] text-[red] font-small font-ubuntu">
              This is a required question
            </p>
          </CardBody>
        </Card>
      </div>

      <div className="bg-[#e2f0e5] pt-3 pb-3">
        <Card className="w-full max-w-[40rem] p-3 mx-auto flex-col">
          <CardBody
            shadow={false}
            floated={false}
            className="ml-0 w-full shrink-0 me-auto rounded-r-none"
          >
            <h1 className=" text-[18px] text-black font-medium font-ubuntu">
              Preferred Popular Branch For Test{" "}
              <span className=" text-[15px] text-[red] font-medium font-ubuntu">
                *
              </span>
            </h1>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}>
                {branches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            <p className=" pt-3 text-[12px] text-[red] font-small font-ubuntu">
              This is a required question
            </p>
          </CardBody>
        </Card>
        
      </div>

        <div className="bg-[#e2f0e5] pt-3 ">
          <Card className="w-full max-w-[40rem] p-3 mx-auto flex-col">
            <CardBody
              shadow={false}
              floated={false}
              className="ml-0 w-full shrink-0 me-auto rounded-r-none"
            >
              <h1 className=" text-[18px] text-black font-medium font-ubuntu">
                Email Address
              </h1>
              <Input
                className="border-b-[1px] bg-white m-1 p-2 text-black"
                name="email"
                variant="static"
                type="text"
                placeholder="Your Answer"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <p className=" pt-3 text-[12px] text-[green] font-small font-ubuntu">
                This is a optional question
              </p>
            </CardBody>
          </Card>
        </div>
      <div className="flex max-w-[40rem]  bg-[#e2f0e5] pb-3 mx-auto">
        
          <button type="submit" className="bg-[#00984a] p-2 mt-10 rounded ms-auto">Submit</button>
      </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
      </form>
     
      <div className="flex max-w-[40rem]  bg-[#e2f0e5] pb-3 mx-auto">
        <p className=" pt-0 text-[11px]  mx-auto text-[black] font-small font-ubuntu">
          This form was created inside of Popular Pharmaceuticals Ltd.. Report
          Abuse
        </p>
      </div>
      <div className="flex max-w-[40rem]  bg-[#e2f0e5] pb-3 mx-auto">
        <p className=" pt-0 text-[24px] mx-auto text-gray-900/50 font-bold font-ubuntu">
          PDCL Forms
        </p>
      </div>
    </div>
  );
}

export default Sample;
