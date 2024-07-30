import React from "react";
import Layer from "./Layer"

const Home = () => {
    
  return (
    <div className="bg-white">
      <section className="bg-white w-screen  h-screen overflow-auto">
        <div className=" bg-white">
          <div class="grid grid-cols-12">
            <div className="h-screen col-span-2">
              
                <Layer />
             
            </div>
            <div class="col-span-10 overflow-hidden  flex flex-wrap items-center justify-center z-10 p-5 gap-3 w-full bg-white">
              <div class="w-[300px] h-[200px] p-6 bg-white border border-gray-600 rounded dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-600 dark:text-white">
                    Admin
                  </h5>
                </a>
                <hr className=" border-gray-600"></hr>
                <div className="flex flex-row p-5 ">
                  <div className="bg-gray-600 rounded p-2">
                    <svg
                      className="w-[50px] h-[50px] fill-[#ffffff]"
                      viewBox="0 0 448 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z"></path>
                    </svg>
                  </div>
                  <h1 className="text-gray-600 text-[32px] font-extrabold pl-20 pt-3">
                    31
                  </h1>
                </div>
              </div>
              <div class="w-[300px] h-[200px] p-6 bg-white border border-gray-600 rounded dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-600 dark:text-white">
                    Active Doctors
                  </h5>
                </a>
                <hr className=" border-gray-600"></hr>
                <div className="flex flex-row p-5 ">
                  <div className="bg-blue-500 rounded p-2">
                    <svg
                      className="w-[50px] h-[50px] fill-[#ffffff]"
                      viewBox="0 0 448 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16H336c-8.8 0-16-7.2-16-16s7.2-16 16-16V424c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16H256c-8.8 0-16-7.2-16-16V424c0-29.8 20.4-54.9 48-62V304.9c-6-.6-12.1-.9-18.3-.9H178.3c-6.2 0-12.3 .3-18.3 .9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7V311.2zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"></path>
                    </svg>
                  </div>
                  <h1 className="text-gray-600 text-[32px] font-extrabold pl-20 pt-3">
                    1208
                  </h1>
                </div>
              </div>
              <div class="w-[300px] h-[200px] p-6 bg-white border border-gray-600 rounded dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-600 dark:text-white">
                    Inactive Doctors
                  </h5>
                </a>
                <hr className=" border-gray-600"></hr>
                <div className="flex flex-row p-5 ">
                  <div className="bg-red-500 rounded p-2">
                    <svg
                      className="w-[50px] h-[50px] fill-[#ffffff]"
                      viewBox="0 0 448 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16H336c-8.8 0-16-7.2-16-16s7.2-16 16-16V424c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16H256c-8.8 0-16-7.2-16-16V424c0-29.8 20.4-54.9 48-62V304.9c-6-.6-12.1-.9-18.3-.9H178.3c-6.2 0-12.3 .3-18.3 .9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7V311.2zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"></path>
                    </svg>
                  </div>
                  <h1 className="text-gray-600 text-[32px] font-extrabold pl-20 pt-3">
                    234
                  </h1>
                </div>
              </div>
              <div class="w-[300px] h-[200px] p-6 bg-white border border-gray-600 rounded dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-600 dark:text-white">
                    Doctors in Leave
                  </h5>
                </a>
                <hr className=" border-gray-600"></hr>
                <div className="flex flex-row p-5 ">
                  <div className="bg-yellow-600 rounded p-2">
                    <svg
                      className="w-[50px] h-[50px] fill-[#ffffff]"
                      viewBox="0 0 448 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16H336c-8.8 0-16-7.2-16-16s7.2-16 16-16V424c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16H256c-8.8 0-16-7.2-16-16V424c0-29.8 20.4-54.9 48-62V304.9c-6-.6-12.1-.9-18.3-.9H178.3c-6.2 0-12.3 .3-18.3 .9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7V311.2zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"></path>
                    </svg>
                  </div>
                  <h1 className="text-gray-600 text-[32px] font-extrabold pl-20 pt-3">
                    0
                  </h1>
                </div>
              </div>
              <div class="w-[300px] h-[200px] p-6 bg-white border border-gray-600 rounded dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-600 dark:text-white">
                    News
                  </h5>
                </a>
                <hr className=" border-gray-600"></hr>
                <div className="flex flex-row p-5 ">
                  <div className="bg-orange-500 rounded p-2">
                    <svg
                      className="w-[50px] h-[50px] fill-[#ffffff]"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                      <path d="M168 80c-13.3 0-24 10.7-24 24V408c0 8.4-1.4 16.5-4.1 24H440c13.3 0 24-10.7 24-24V104c0-13.3-10.7-24-24-24H168zM72 480c-39.8 0-72-32.2-72-72V112C0 98.7 10.7 88 24 88s24 10.7 24 24V408c0 13.3 10.7 24 24 24s24-10.7 24-24V104c0-39.8 32.2-72 72-72H440c39.8 0 72 32.2 72 72V408c0 39.8-32.2 72-72 72H72zM176 136c0-13.3 10.7-24 24-24h96c13.3 0 24 10.7 24 24v80c0 13.3-10.7 24-24 24H200c-13.3 0-24-10.7-24-24V136zm200-24h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H376c-13.3 0-24-10.7-24-24s10.7-24 24-24zm0 80h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H376c-13.3 0-24-10.7-24-24s10.7-24 24-24zM200 272H408c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24s10.7-24 24-24zm0 80H408c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24s10.7-24 24-24z"></path>
                    </svg>
                  </div>
                  <h1 className="text-gray-600 text-[32px] font-extrabold pl-20 pt-3">
                    28
                  </h1>
                </div>
              </div>
              <div class="w-[300px] h-[200px] p-6 bg-white border border-gray-600 rounded dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-600 dark:text-white">
                    Media
                  </h5>
                </a>
                <hr className=" border-gray-600"></hr>
                <div className="flex flex-row p-5 ">
                  <div className="bg-red-800 rounded p-2">
                    <svg
                      className="w-[50px] h-[50px] fill-[#ffffff]"
                      viewBox="0 0 576 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                      <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM229.5 173.3l72 144c5.9 11.9 1.1 26.3-10.7 32.2s-26.3 1.1-32.2-10.7L253.2 328H162.8l-5.4 10.7c-5.9 11.9-20.3 16.7-32.2 10.7s-16.7-20.3-10.7-32.2l72-144c4.1-8.1 12.4-13.3 21.5-13.3s17.4 5.1 21.5 13.3zM208 237.7L186.8 280h42.3L208 237.7zM392 256a24 24 0 1 0 0 48 24 24 0 1 0 0-48zm24-43.9V184c0-13.3 10.7-24 24-24s24 10.7 24 24v96 48c0 13.3-10.7 24-24 24c-6.6 0-12.6-2.7-17-7c-9.4 4.5-19.9 7-31 7c-39.8 0-72-32.2-72-72s32.2-72 72-72c8.4 0 16.5 1.4 24 4.1z"></path>
                    </svg>
                  </div>
                  <h1 className="text-gray-600 text-[32px] font-extrabold pl-20 pt-3">
                    46
                  </h1>
                </div>
              </div>
              <div class="w-[300px] h-[200px] p-6 bg-white border border-gray-600 rounded dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-600 dark:text-white">
                    Services
                  </h5>
                </a>
                <hr className=" border-gray-600"></hr>
                <div className="flex flex-row p-5 ">
                  <div className="bg-violet-600 rounded p-2">
                    <svg
                      className="w-[50px] h-[50px] fill-[#ffffff]"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                      <path d="M192 0c-17.7 0-32 14.3-32 32V64c0 .1 0 .1 0 .2c-38.6 2.2-72.3 27.3-85.2 64.1L39.6 228.8C16.4 238.4 0 261.3 0 288V432v48c0 17.7 14.3 32 32 32H64c17.7 0 32-14.3 32-32V432H416v48c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V432 288c0-26.7-16.4-49.6-39.6-59.2L437.2 128.3c-12.9-36.8-46.6-62-85.2-64.1c0-.1 0-.1 0-.2V32c0-17.7-14.3-32-32-32H192zM165.4 128H346.6c13.6 0 25.7 8.6 30.2 21.4L402.9 224H109.1l26.1-74.6c4.5-12.8 16.6-21.4 30.2-21.4zM96 288a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm288 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"></path>
                    </svg>
                  </div>
                  <h1 className="text-gray-600 text-[32px] font-extrabold pl-20 pt-3">
                    21
                  </h1>
                </div>
              </div>
              <div class="w-[300px] h-[200px] p-6 bg-white border border-gray-600 rounded dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-600 dark:text-white">
                    Testimonials
                  </h5>
                </a>
                <hr className=" border-gray-600"></hr>
                <div className="flex flex-row p-5 ">
                  <div className="bg-violet-900 rounded p-2">
                    <svg
                      className="w-[50px] h-[50px] fill-[#ffffff]"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                      <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"></path>
                    </svg>
                  </div>
                  <h1 className="text-gray-600 text-[32px] font-extrabold pl-20 pt-3">
                    2
                  </h1>
                </div>
              </div>
              <div class="w-[300px] h-[200px] p-6 bg-white border border-gray-600 rounded dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-600 dark:text-white">
                    Branches
                  </h5>
                </a>
                <hr className=" border-gray-600"></hr>
                <div className="flex flex-row p-5 ">
                  <div className="bg-pink-600 rounded p-2">
                    <svg
                      className="w-[50px] h-[50px] fill-[#ffffff]"
                      viewBox="0 0 448 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                      <path d="M80 104a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm80-24c0 32.8-19.7 61-48 73.3v87.8c18.8-10.9 40.7-17.1 64-17.1h96c35.3 0 64-28.7 64-64v-6.7C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V160c0 70.7-57.3 128-128 128H176c-35.3 0-64 28.7-64 64v6.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V352 153.3C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm232 0a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM80 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"></path>
                    </svg>
                  </div>
                  <h1 className="text-gray-600 text-[32px] font-extrabold pl-20 pt-3">
                    31
                  </h1>
                </div>
              </div>
              <div class="w-[300px] h-[200px] p-6 bg-white border border-gray-600 rounded dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-600 dark:text-white">
                    Labs
                  </h5>
                </a>
                <hr className=" border-gray-600"></hr>
                <div className="flex flex-row p-5 ">
                  <div className="bg-blue-700 rounded p-2">
                    <svg
                      className="w-[50px] h-[50px] fill-[#ffffff]"
                      viewBox="0 0 448 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                      <path d="M288 0H160 128C110.3 0 96 14.3 96 32s14.3 32 32 32V196.8c0 11.8-3.3 23.5-9.5 33.5L10.3 406.2C3.6 417.2 0 429.7 0 442.6C0 480.9 31.1 512 69.4 512H378.6c38.3 0 69.4-31.1 69.4-69.4c0-12.8-3.6-25.4-10.3-36.4L329.5 230.4c-6.2-10.1-9.5-21.7-9.5-33.5V64c17.7 0 32-14.3 32-32s-14.3-32-32-32H288zM192 196.8V64h64V196.8c0 23.7 6.6 46.9 19 67.1L309.5 320h-171L173 263.9c12.4-20.2 19-43.4 19-67.1z"></path>
                    </svg>
                  </div>
                  <h1 className="text-gray-600 text-[32px] font-extrabold pl-20 pt-3">
                    0
                  </h1>
                </div>
              </div>
              <div class="w-[300px] h-[200px] p-6 bg-white border border-gray-600 rounded dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-600 dark:text-white">
                    Partners
                  </h5>
                </a>
                <hr className=" border-gray-600"></hr>
                <div className="flex flex-row p-5 ">
                  <div className="bg-blue-900 rounded p-2">
                    <svg
                      className="w-[50px] h-[50px] fill-[#ffffff]"
                      viewBox="0 0 640 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                      <path d="M272.2 64.6l-51.1 51.1c-15.3 4.2-29.5 11.9-41.5 22.5L153 161.9C142.8 171 129.5 176 115.8 176H96V304c20.4 .6 39.8 8.9 54.3 23.4l35.6 35.6 7 7 0 0L219.9 397c6.2 6.2 16.4 6.2 22.6 0c1.7-1.7 3-3.7 3.7-5.8c2.8-7.7 9.3-13.5 17.3-15.3s16.4 .6 22.2 6.5L296.5 393c11.6 11.6 30.4 11.6 41.9 0c5.4-5.4 8.3-12.3 8.6-19.4c.4-8.8 5.6-16.6 13.6-20.4s17.3-3 24.4 2.1c9.4 6.7 22.5 5.8 30.9-2.6c9.4-9.4 9.4-24.6 0-33.9L340.1 243l-35.8 33c-27.3 25.2-69.2 25.6-97 .9c-31.7-28.2-32.4-77.4-1.6-106.5l70.1-66.2C303.2 78.4 339.4 64 377.1 64c36.1 0 71 13.3 97.9 37.2L505.1 128H544h40 40c8.8 0 16 7.2 16 16V352c0 17.7-14.3 32-32 32H576c-11.8 0-22.2-6.4-27.7-16H463.4c-3.4 6.7-7.9 13.1-13.5 18.7c-17.1 17.1-40.8 23.8-63 20.1c-3.6 7.3-8.5 14.1-14.6 20.2c-27.3 27.3-70 30-100.4 8.1c-25.1 20.8-62.5 19.5-86-4.1L159 404l-7-7-35.6-35.6c-5.5-5.5-12.7-8.7-20.4-9.3C96 369.7 81.6 384 64 384H32c-17.7 0-32-14.3-32-32V144c0-8.8 7.2-16 16-16H56 96h19.8c2 0 3.9-.7 5.3-2l26.5-23.6C175.5 77.7 211.4 64 248.7 64H259c4.4 0 8.9 .2 13.2 .6zM544 320V176H496c-5.9 0-11.6-2.2-15.9-6.1l-36.9-32.8c-18.2-16.2-41.7-25.1-66.1-25.1c-25.4 0-49.8 9.7-68.3 27.1l-70.1 66.2c-10.3 9.8-10.1 26.3 .5 35.7c9.3 8.3 23.4 8.1 32.5-.3l71.9-66.4c9.7-9 24.9-8.4 33.9 1.4s8.4 24.9-1.4 33.9l-.8 .8 74.4 74.4c10 10 16.5 22.3 19.4 35.1H544zM64 336a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm528 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"></path>
                    </svg>
                  </div>
                  <h1 className="text-gray-600 text-[32px] font-extrabold pl-20 pt-3">
                    180
                  </h1>
                </div>
              </div>
              <div class="w-[300px] h-[200px] p-6 bg-white border border-gray-600 rounded dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-600 dark:text-white">
                    Price List
                  </h5>
                </a>
                <hr className=" border-gray-600"></hr>
                <div className="flex flex-row p-5 ">
                  <div className="bg-blue-800 rounded p-2">
                    <svg
                      className="w-[50px] h-[50px] fill-[#ffffff]"
                      viewBox="0 0 576 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                      <path d="M112 112c0 35.3-28.7 64-64 64V336c35.3 0 64 28.7 64 64H464c0-35.3 28.7-64 64-64V176c-35.3 0-64-28.7-64-64H112zM0 128C0 92.7 28.7 64 64 64H512c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM176 256a112 112 0 1 1 224 0 112 112 0 1 1 -224 0zm80-48c0 8.8 7.2 16 16 16v64h-8c-8.8 0-16 7.2-16 16s7.2 16 16 16h24 24c8.8 0 16-7.2 16-16s-7.2-16-16-16h-8V208c0-8.8-7.2-16-16-16H272c-8.8 0-16 7.2-16 16z"></path>
                    </svg>
                  </div>
                  <h1 className="text-gray-600 text-[32px] font-extrabold pl-20 pt-3">
                    71947
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
