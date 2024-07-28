import React from "react"

import Layer from "./Layer";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
const Doctors = () =>{
    return (
        <>
            <section className="bg-white w-screen h-screen md:h-screen  overflow-scroll">
                <div class="grid grid-cols-12">
                    <div className="h-screen col-span-2">
                        <Layer />
                    </div>
                
                    <form className="col-span-10 flex  mt-10 justify-center">
                        <div className="">
                   
                       
                                <div className="">
                                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                        Doctor Name
                                    </label>
                                    <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 mx-auto max-w-7xl">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                            <input
                                                id="username"
                                                name="username"
                                                type="text"
                                            placeholder="Prof. Dr. Md. Asadul Kabir"
                                                autoComplete="username"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                            <div className="">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Doctor Specility
                                </label>


                                <form class="max-w-sm mx-auto">
                                    <select id="countries" class="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mx-auto max-w-7xl block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Choose a Specility</option>
                                        <option value="US">Medicine</option>
                                        <option value="CA">Chest Medicine</option>
                                        <option value="FR">ENT, Head & Neck Surgery</option>
                                        <option value="DE">Neuro Medicine</option>
                                    </select>
                                </form>


                            </div>
                            <div className="">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Doctor Degree
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 mx-auto max-w-7xl">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="MBBS (DMC), BCS (Health), FCPS (Pediatrics)"
                                            autoComplete="username"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Doctor Current Practice
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 mx-auto max-w-7xl">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="Former Head of the Department of Medicine"
                                            autoComplete="username"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Doctor Branch
                                </label>


                                <form class="max-w-sm mx-auto">
                                    <select id="countries" class="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mx-auto max-w-7xl block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Choose a Branch</option>
                                        <option value="US">Dhanmondi</option>
                                        <option value="CA">Shantinagar</option>
                                        <option value="FR">Bogura</option>
                                        <option value="DE">English Road</option>
                                    </select>
                                </form>


                            </div>
                            <div className="">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Doctor Bhaban
                                </label>


                                <form class="max-w-sm mx-auto">
                                    <select id="countries" class="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mx-auto max-w-7xl block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Choose a Bhaban</option>
                                        <option value="US">Bhaban 1</option>
                                        <option value="CA">Bhaban 2</option>
                                        <option value="FR">Bhaban 3</option>
                                        <option value="DE">Bhaban 4</option>
                                    </select>
                                </form>


                            </div>
                            <div className="">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Doctor Room
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 mx-auto max-w-7xl">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="301"
                                            autoComplete="username"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>


                            <h3 class="block text-sm font-medium leading-6 text-gray-900">Doctor Active Days</h3>
                            <ul class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                    <div class="flex items-center ps-3">
                                        <input id="vue-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label for="vue-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Saterday</label>
                                    </div>
                                </li>
                                <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                    <div class="flex items-center ps-3">
                                        <input id="react-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label for="react-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sunday</label>
                                    </div>
                                </li>
                                <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                    <div class="flex items-center ps-3">
                                        <input id="angular-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label for="angular-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Monday</label>
                                    </div>
                                </li>
                                <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                    <div class="flex items-center ps-3">
                                        <input id="laravel-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label for="laravel-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tuesday</label>
                                    </div>
                                </li>
                                <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                    <div class="flex items-center ps-3">
                                        <input id="laravel-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label for="laravel-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Wednessday</label>
                                    </div>
                                </li>
                                <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                    <div class="flex items-center ps-3">
                                        <input id="laravel-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label for="laravel-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Thusday</label>
                                    </div>
                                </li>
                                <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                    <div class="flex items-center ps-3">
                                        <input id="laravel-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label for="laravel-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Friday</label>
                                    </div>
                                </li>
                            </ul>
                            <div className="">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Doctor Gender
                                </label>
                                <ul class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                    <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                        <div class="flex items-center ps-3">
                                            <input id="vue-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label for="vue-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">M</label>
                                        </div>
                                    </li>
                                    <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                        <div class="flex items-center ps-3">
                                            <input id="react-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label for="react-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">F</label>
                                        </div>
                                    </li>
                                   
                                </ul>
                            </div>

                            <div className="">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Doctor Room
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 mx-auto max-w-7xl">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="301"
                                            autoComplete="username"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                        
                </div>

            </form>
                </div>
            </section>
        
        </>
    )
}
export default Doctors