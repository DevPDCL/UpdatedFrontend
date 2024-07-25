import React from 'react'
import "@fontsource/ubuntu";
import { Dhanmondi, objective } from "../assets";
import { Link } from "react-router-dom";

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import goals1 from "../assets/goals1.jpg"
import goals2 from "../assets/goals2.jpg"
import goals3 from "../assets/goals3.jpg"

import 'react-vertical-timeline-component/style.min.css';
const Goals = () => {
  return (
    <div className="bg-[#F5FFFA]">
      <div>
        <div className="pt-[70px] sm:w-[80%] max-w-7xl mx-auto">
          <div className="flex flex-col  max-w-7xl mx-auto">
            <h1 className="text-[36px] p-5 text-gray-900">
              The New Way to Diagnostic Treatment
            </h1>
          </div>
          <div className="  flex-row max-w-7xl mx-auto">
            <p className="text-[20px] p-5 me-auto text-gray-500">
              Popular is committed to render the possible standard service to
              the people of the country at an affordable cost. This will
              definitely reduce the burden of the government and will make the
              path of "Health for all".
            </p>
            <Link to="/about">
              <button className="bg-[#f0f0f0] p-2 pl-5 pr-5 w-[200px]  rounded-xl ml-5 mx-auto">
                SEE OUR TEAM
              </button>
            </Link>
          </div>
        </div>
        <div className="overflow-hidden -mt-[50px]  py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-7xl grid-cols-1 shadow bg-white p-5 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <div className="me-auto h-auto w-auto">
                    <img src={Dhanmondi} className="h-auto  p-5 w-auto" />
                  </div>
                </div>
              </div>
              <div className=" m-1 p-10   text-start">
                <div className="flex flex-row  max-w-7xl   ">
                  <div className="me-auto h-auto w-auto">
                    <h1 className="font-bold text-gray-900 p-5">Who We Are</h1>
                    <p className="text-gray-500 p-5">
                      Popular Diagnostic Centre Ltd. is an advanced Centre for
                      diagnostic and medical services. It is one of the
                      prestigious diagnostic complexes of Bangladesh which
                      started its activities in 1983. Popular Diagnostic Centre
                      Ltd. is the largest diagnostic services provider
                      organization in private sector of the country. It is been
                      pioneer in introducing world latest medical equipments and
                      advanced technology to provide round the clock medical
                      investigations and consultancy services. LEGAL STATUS
                      Popular Diagnostic Centre Ltd. is a private limited
                      company registered with the Ministry of Health & Family
                      Welfare, People’s Republic Govt. of Bangladesh having
                      License No. 1275 &688 & Trade License Number
                      TRAD/DSCC/211718/2019
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden  -mt-[170px] py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-7xl grid-cols-1 shadow bg-white p-5 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <div className="me-auto h-auto w-auto">
                    <img src={objective} className="h-auto  p-5 w-auto" />
                  </div>
                </div>
              </div>
              <div className=" m-1 p-10   text-start">
                <div className="flex flex-row  max-w-7xl   ">
                  <div className="me-auto  h-auto w-auto">
                    <h1 className="text-gray-900 font-bold p-5">Our Goal</h1>
                    <p className="text-gray-500 p-5">
                      To establish a referral Diagnostic and Medical Services
                      Centre.
                    </p>

                    <h1 className="text-gray-900 font-bold p-5">
                      Our Objective
                    </h1>
                    <p className="text-gray-500 p-5  h-auto">
                      To render the world standard diagnostic service to the
                      people of the country at an affordable cost and in turn to
                      limit the outflow of the patient abroad at the expense of
                      heard earn foreign currency by providing quality
                      diagnostic services.<br></br> Out door basis treatment by
                      renowned General Practitioners, Consultants and Professors
                      in different medical fields.<br></br>To promote Health
                      Education & Medical Services.<br></br>
                      Day care Centre for follow-up cardiac renal and oncology
                      patients.<br></br>To build a full fledged specialized
                      (Tertiary) Hospital.<br></br>
                      Set up Satellite collection Centre.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" max-w-7xl mx-auto items-center relative justify-center">
          <VerticalTimeline>
            <VerticalTimelineElement
              className="vertical-timeline-element "
              contentStyle={{ background: "#f0f0f0", color: "#000000" }}
              contentArrowStyle={{ borderRight: "10px solid  #f0f0f0" }}
              iconStyle={{ background: "#f0f0f0", color: "#000000" }}
              icon={
                <p className="flex  justify-center text-black font-extrabold text-center">
                  1983
                </p>
              }>
              <img src={goals1} className="object-cover w-full mx-auto" />
              <p>Started our activities</p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element"
              contentStyle={{ background: "#f0f0f0", color: "#000000" }}
              contentArrowStyle={{ borderRight: "10px solid  #f0f0f0" }}
              iconStyle={{ background: "#f0f0f0", color: "#000000" }}
              icon={
                <p className="flex  justify-center text-black font-extrabold text-center">
                  2016
                </p>
              }>
              <img src={goals2} className="object-cover w-full mx-auto" />
              <p>New branches opened at Badda, Dinajpur and Mirpur.</p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element"
              contentStyle={{ background: "#f0f0f0", color: "#000000" }}
              contentArrowStyle={{ borderRight: "10px solid  #f0f0f0" }}
              iconStyle={{ background: "#f0f0f0", color: "#000000" }}
              icon={
                <p className="flex  justify-center text-black font-extrabold text-center">
                  2017
                </p>
              }>
              <img src={goals3} className=" object-cover w-full mx-auto" />
              <p>Started six new 'Model Pharmacies' all over Bangladesh</p>
            </VerticalTimelineElement>
          </VerticalTimeline>
        </div>
      </div>
    </div>
  );
}

export default Goals