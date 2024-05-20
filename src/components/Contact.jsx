import React from "react";
import { Sidemenu } from "../components";
import { Card, Typography } from "@material-tailwind/react";
import { Input, Button } from "@material-tailwind/react";

import { Link } from "react-router-dom";
function Contact() {
  return (
    <div className="bg-[#ffffff]">
      <Sidemenu />
      <div className="flex flex-col pt-[80px] mx-auto max-w-7xl">
        <h2 className="text-gray-900/50 pb-5 text-center pl-2 text-[28px] font-bold font-ubuntu">
          CONNECTING WITH US
        </h2>
      </div>
      <div
        className={`inset-0 justify-center  items-center mb-[20px]   text-center flex flex-wrap `}>
        <div className="max-w-7xl">
          <div className=" p-10  text-start">
            <h1 className="text-slate-900/50 text-center font-ubuntu font-extrabold text-[36px]">
              DISCOVER{" "}
              <span className="text-[#00984a] font-ubuntu">POPULAR</span>
            </h1>

            <p className="mb-2 font-ubuntu text-center text-[24px]  text-gray-900">
              House #16, Road # 2, Dhanmondi R/A, Dhaka-1205, Bangladesh
            </p>

            <p className="mb-2 font-ubuntu text-center text-[24px]  text-gray-900">
              E-mail : info@populardiagnostic.com
            </p>
            <p className="mb-2 font-ubuntu text-center text-[24px]  text-gray-900">
              Phone : 09666 787801, 10636
            </p>
          </div>
        </div>
      </div>
      <div
        className={`justify-center  items-center p-2 text-center flex flex-col  text-white`}>
        <div className=" flex-col  max-w-7xl container sm:w-[80%] block items-stretch md:flex-row    mx-auto">
          <Card
            className="mx-auto w-full bg-gray-100/5 mt-[40px] shadow-2xl  rounded-[10px] max-w-7xl"
            shadow={true}>
            <form className="mt-1 mb-2 w-full p-5 max-w-7xl  sm:w-300">
              <div className="mb-1 flex flex-col gap-6">
                <h5 className="text-[44px] p-5 font-ubuntu font-bold text-[#00984a]">
                  Send us a message
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="text-[#00984a] text-start">
                      Your Email
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="name@mail.com"
                      className=" !border-t-blue-gray-200 bg-white text-[#00984a] p-2 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                  <div>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className=" text-[#00984a] text-start">
                      Your FullName
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="Name"
                      className=" !border-t-blue-gray-200 bg-white text-[#00984a] p-2 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                  <div>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="text-[#00984a] text-start">
                      Your Mobile
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="01712345678"
                      className=" !border-t-blue-gray-200 bg-white text-[#00984a] p-2 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                  <div>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className=" text-[#00984a] text-start">
                      Your Messages
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="Write Support Queries"
                      className=" !border-t-blue-gray-200 bg-white text-[#00984a] p-2 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                </div>
              </div>

              <Link to="/report">
                <Button className="mt-6 bg-[#00984a] " fullWidth>
                  SEND MESSAGES
                </Button>
              </Link>
            </form>
          </Card>
        </div>
      </div>

      <div
        className={`inset-0 justify-center items-center  text-center flex flex-wrap  text-white`}>
        <div className="flex-col  max-w-screen-xl container rounded sm:w-[80%]  block items-stretch md:flex-row  mt-[20px] mx-auto">
          <div className="relative flex flex-wrap p-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.2197080792394!2d90.37959757619976!3d23.73954337867781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8ca7af5f82b%3A0xce7d1ab6b16a027!2sPopular%20Diagnostic%20Centre%20Ltd.!5e0!3m2!1sen!2sbd!4v1706512680599!5m2!1sen!2sbd"
              width="1270"
              height="600"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>

          <div className="w-full">
            <ul
              className="flex ml-2 mr-2 list-none flex-wrap pt-1 pb-2 flex-row"
              role="tablist">
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
