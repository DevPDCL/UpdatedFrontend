import React, { useState } from "react";
import "@fontsource/ubuntu";
import {
  Card,
  CardBody,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { Input, Select, Option } from "@material-tailwind/react";



function Complain() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    branch: "",
    complain: ""
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
        "https://test.populardiagnostic.org/api/complaints",
        formData
      );
      setSuccess("Message sent successfully!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        date: "",
        time: "",
        branch: "",
        complain: ""
      });
    } catch (error) {
      console.error("There was an error sending the message!", error);
      setError("Failed to send message. Please try again.");
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
              Advice & Complain
            </h1>
            <p className=" pb-3 text-[15px] text-black font-small font-ubuntu">
              We are too much careful for our patients and their relatives. We
              always wants to give you better support then yesterday. If you
              find anything wrong, Please let us know about your complain. We
              will try to take actions after Investigation. We need some
              information to inquiries about your complain. Please fill the form
              correctly. Thanks
            </p>
            
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
                className="ml-0 w-full shrink-0 me-auto rounded-r-none">
                <h1 className=" text-[18px] text-black font-medium font-ubuntu">
                  Name{" "}
                  <span className=" text-[15px] text-[red] font-medium font-ubuntu">
                    *
                  </span>
                </h1>
                <Input
                  className="border-b-[1px] bg-white m-1 p-2 text-black"
                  name="name"
                  variant="static"
                  type="text"
                  placeholder="Your Answer"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
               
              </CardBody>
            </Card>
          </div>

          <div className="bg-[#e2f0e5] pb-3">
            <Card className="w-full max-w-[40rem] p-3 mx-auto flex-col">
              <CardBody
                shadow={false}
                floated={false}
                className="ml-0 w-full shrink-0 me-auto rounded-r-none">
                <h1 className=" text-[18px] text-black font-medium font-ubuntu">
                  Phone Number{" "}
                  <span className=" text-[15px] text-[red] font-medium font-ubuntu">
                    *
                  </span>
                </h1>
                <Input
                  className="border-b-[1px] bg-white m-1 p-2 text-black"
                  variant="static"
                  type="text"
                  name="phone"
                  placeholder="Your Answer"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                
              </CardBody>
            </Card>

            <div className="bg-[#e2f0e5] pt-3 ">
              <Card className="w-full max-w-[40rem] p-3  mx-auto flex-col">
                <CardBody
                  shadow={false}
                  floated={false}
                  className="ml-0 w-full shrink-0 me-auto rounded-r-none">
                  <h1 className=" text-[18px] text-black font-medium font-ubuntu">
                    Email Address{" "}
                    <span className=" text-[15px] text-[red] font-medium font-ubuntu">
                      *
                    </span>
                  </h1>
                  <Input
                    className="border-b-[1px] bg-white m-1 p-2 text-black"
                    variant="static"
                    name="email"
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
          <div className="bg-[#e2f0e5]  pb-3">
            <Card className="w-full max-w-[40rem] p-3 mx-auto flex-col">
              <CardBody
                shadow={false}
                floated={false}
                className="ml-0 w-full shrink-0 me-auto rounded-r-none">
                <h1 className=" text-[18px] text-black font-medium font-ubuntu">
                  Date{" "}
                  <span className=" text-[15px] text-[red] font-medium font-ubuntu">
                    *
                  </span>
                </h1>
                <Input
                  className="border-b-[1px] bg-white m-1 p-2 text-black"
                  type="Date"
                  name="date"
                  variant="static"
                  placeholder="Your Answer"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
               
              </CardBody>
            </Card>
          </div>

          <div className="bg-[#e2f0e5]  ">
            <Card className="w-full max-w-[40rem] p-3 mx-auto flex-col">
              <CardBody
                shadow={false}
                floated={false}
                className="ml-0 w-full shrink-0 me-auto rounded-r-none">
                <h1 className="text-[18px] text-black font-medium font-ubuntu">
                  Time{" "}
                  <span className=" text-[15px] text-[red] font-medium font-ubuntu">
                    *
                  </span>
                </h1>
                <Input
                  className="border-b-[1px] bg-white m-1 p-2 text-black"
                  type="Time"
                  name="time"
                  variant="static"
                  placeholder="Your Answer"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
                
              </CardBody>
            </Card>
          </div>

          <div className="bg-[#e2f0e5] pt-3 pb-3">
            <Card className="w-full max-w-[40rem] p-3 mx-auto flex-col">
              <CardBody
                shadow={false}
                floated={false}
                className="ml-0 w-full shrink-0 me-auto rounded-r-none">
                <h1 className=" text-[18px] text-black font-medium font-ubuntu">
                  Branch Name{" "}
                  <span className=" text-[15px] text-[red] font-medium font-ubuntu">
                    *
                  </span>
                </h1>
                <select
                  className="border-b-[1px] bg-white m-1 p-2 text-black"
                  name="branch"
                  variant="static"
                  type="text"
                  placeholder="Your Answer"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                >
                  {branches.map((branch) => (
                    <option key={branch}>
                      {branch}
                    </option>
                  ))}
                </select>


              </CardBody>
            </Card>
          </div>
          <div className="bg-[#e2f0e5] pb-3 ">
            <Card className="w-full max-w-[40rem] p-3 mx-auto flex-col">
              <CardBody
                shadow={false}
                floated={false}
                className="ml-0 w-full shrink-0 me-auto rounded-r-none">
                <h1 className=" text-[18px] text-black font-medium font-ubuntu">
                  Write Briefly About Your Complain/ আপনার অভিযোগ সম্পর্কে
                  বিস্তারিত লিখুন।{" "}
                  <span className=" text-[15px] text-[red] font-medium font-ubuntu">
                    *
                  </span>
                </h1>
                <Input
                  className="border-b-[1px] bg-white m-1 p-2 text-black"
                  variant="static"
                  type="text"
                  name="complain"
                  placeholder="Your Answer"
                  value={formData.complain}
                  onChange={handleChange}
                  required
                />
               
              </CardBody>
            </Card>
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

      <div className="flex max-w-[40rem]  bg-[#e2f0e5] pb-3 mx-auto">
        <p className=" pt-0 text-[11px] mx-auto text-[black] font-small font-ubuntu">
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

export default Complain;