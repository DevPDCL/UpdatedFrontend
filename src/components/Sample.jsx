import React from "react";
import {
  Card,
  CardBody,
  Button,
} from "@material-tailwind/react";
import { Input, Select, Option } from "@material-tailwind/react";

import {  Link } from "react-router-dom";

function Sample() {
  return (
    <div className="bg-[#e2f0e5] p-1">
      <div className=" pt-0">
        <Link to="/">
          <svg
            className="w-[80px] h-[80px]  mx-auto p-3  fill-[#00984a]"
            viewBox="0 0 576 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
            <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"></path>
          </svg>
        </Link>
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
            <p className="pt-3 text-[15px] text-black font-bold font-ubuntu">
              info@populardiagnostic.com{" "}
              <span className=" pl-10 pb-2 text-[12px] text-[blue] font-small font-ubuntu">
                Switch account
              </span>
            </p>
            <p className="pb-3 text-[15px] text-black font-small font-ubuntu">
              Not shared
            </p>
            <hr />
            <p className=" pt-3 text-[15px] text-[red] font-small font-ubuntu">
              * Indicates required question
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
            <h1 className=" text-[18px] pb-5 text-black font-medium font-ubuntu">
              Vendor{" "}
              <span className=" text-[15px] text-[red] font-medium font-ubuntu">
                *
              </span>
            </h1>

            <div class="flex">
              <div class="flex items-center me-4">
                <input
                  id="inline-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="inline-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Amar Lab
                </label>
              </div>
              <div class="flex items-center me-4">
                <input
                  id="inline-2-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="inline-2-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Arogga
                </label>
              </div>
            </div>

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
              variant="static"
              placeholder="Your Answer"
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
              variant="static"
              placeholder="Your Answer"
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
              variant="static"
              placeholder="Your Answer"
            />
            <p className=" pt-3 text-[12px] text-[red] font-small font-ubuntu">
              This is a required question
            </p>
          </CardBody>
        </Card>

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
                variant="static"
                placeholder="Your Answer"
              />
              <p className=" pt-3 text-[12px] text-[green] font-small font-ubuntu">
                This is a optional question
              </p>
            </CardBody>
          </Card>
        </div>
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
              type="Time"
              variant="static"
              placeholder="Your Answer"
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
            <Select
              className="border-b-[1px] m-1 p-2 text-black"
              variant="static"
              placeholder="Your Answer"
            >
              <Option className=" text-black">DHANMONDI</Option>
              <Option className=" text-black">ENGLISH ROAD</Option>
            </Select>
            <p className=" pt-3 text-[12px] text-[red] font-small font-ubuntu">
              This is a required question
            </p>
          </CardBody>
        </Card>
      </div>

      <div className="flex max-w-[40rem]  bg-[#e2f0e5] pb-3 mx-auto">
        
        <p className=" pt-3 text-[15px] text-center justify-center me-auto text-[#00984a] font-bold font-ubuntu">
          Clear form
        </p>
        <Button className="bg-[#00984a] ms-auto">Submit</Button>
      </div>
      <Link to="/">
        <svg
          className="w-[80px] h-[80px]  mx-auto p-3  fill-[#00984a]"
          viewBox="0 0 576 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
          <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"></path>
        </svg>
      </Link>
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
