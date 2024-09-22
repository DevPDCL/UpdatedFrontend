import React, {useEffect, useState} from 'react'
import Layer from "./Layer";
import axios from "axios"
const Ccomplain = () => {
  const [complains, setComplains] =useState([])
  useEffect(()=> {
    axios.get('http://51.20.54.185/api/complaints')
      .then(complains => setComplains(complains.data))
      .catch(err => console.log(err))
  }, [])
  return (
    <>
      <section className="bg-white w-screen h-screen md:h-screen ">
        <div class="grid grid-cols-12">
          <div className="h-screen col-span-2">
            <Layer />
          </div>
          <div class="col-span-10 flex flex-wrap  z-10 p-5 w-full bg-white">
            <div class="relative overflow-x-auto w-full p-5 shadow-md sm:rounded-lg">
              <div class="pb-4 bg-white p-5  dark:bg-gray-900">
                <label for="table-search" class="sr-only">
                  Search
                </label>
                <div class="relative flex flex-row mt-1">
                  <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
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
                    class="block p-2 w-[75%] mr-1 pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for items"
                  />
                  <button
                    type="button"
                    class="focus:outline-none ms-auto text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    <span className="text-[24px] font-extrabold">-</span>
                  </button>

                  <button
                    type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    <span className="text-[24px] font-extrabold">+</span>
                  </button>
                </div>
              </div>
              <table class="w-full text-sm text-left  rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                   
                    <th scope="col" class="px-6 py-3">
                      Complainers Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Mobile
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Email
                    </th>
                    
                    <th scope="col" class="px-6 py-3">
                      Complain Time
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Branch
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Complain Brief
                    </th>

                    <th scope="col" class="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>

                  {
                    complains.map(complain => {
                      return (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                  
                    <td class="px-6 py-4">{complain.name}</td>
                    <td class="px-6 py-4">{complain.phone}</td>
                    <td class="px-6 py-4">{complain.email}</td>
                    <td class="px-6 py-4">{complain.date}</td>
                    <td class="px-6 py-4">{complain.branch}</td>
                    <td class="px-6 py-4">{complain.complain}</td>
                    

                    <td class="px-6 py-4">
                      <a
                        href="#"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                    </td>
                </tr>
                      ) }) }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Ccomplain