import image from "../assets/logo1.webp";
import React, { useState, useEffect, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dialog, Transition, Menu } from "@headlessui/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const NavLink = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-4 py-2 text-base font-medium rounded-lg transition-all duration-150 ${
        isActive
          ? "text-[#00984a]"
          : "text-gray-700 hover:bg-gray-100 hover:text-[#00984a]"
      }`}
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-0">
              <img
                src={image}
                alt="Logo"
                className="w-[45px] h-[45px] bg-none object-contain"
              />
            </Link>

            <nav className="hidden lg:flex space-x-4">
              <Menu as="div" className="relative">
                <Menu.Button className="inline-flex items-center px-3 py-2  text-[16px] font-medium text-gray-700 hover:text-[#00984a] hover:bg-gray-100 rounded-lg">
                  About
                  <ChevronDownIcon className="w-4 h-4 ml-1" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0">
                  <Menu.Items className="absolute z-10 mt-2 w-[350px] bg-white shadow-lg rounded-lg py-2">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/goals"
                          className={`block px-4 py-2 text-sm ${
                            active
                              ? "bg-gray-100 text-[#00984a]"
                              : "text-gray-700"
                          }`}>
                          <div className="flex col-span-1 items-center">
                            <p className="pl-5">Objectives & Goals</p>
                          </div>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/chairman"
                          className={`block px-4 py-2 text-sm ${
                            active
                              ? "bg-gray-100 text-[#00984a]"
                              : "text-gray-700"
                          }`}>
                          <div className="flex col-span-1 items-center">
                            <p className="pl-5"> Message from Chairman</p>
                          </div>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/director"
                          className={`block px-4 py-2 text-sm ${
                            active
                              ? "bg-gray-100 text-[#00984a]"
                              : "text-gray-700"
                          }`}>
                          <div className="flex col-span-1 items-center">
                            <p className="pl-5">
                              Message from Managing Director
                            </p>
                          </div>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/dmd"
                          className={`block px-4 py-2 text-sm ${
                            active
                              ? "bg-gray-100 text-[#00984a]"
                              : "text-gray-700"
                          }`}>
                          <div className="flex col-span-1 items-center">
                            <p className="pl-5">
                              Message from Deputy Managing Director
                            </p>
                          </div>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/about"
                          className={`block px-4 py-2 text-sm ${
                            active
                              ? "bg-gray-100 text-[#00984a]"
                              : "text-gray-700"
                          }`}>
                          <div className="flex col-span-1 items-center">
                            <p className="pl-5"> Management Team</p>
                          </div>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/notice"
                          className={`block px-4 py-2 text-sm ${
                            active
                              ? "bg-gray-100 text-[#00984a]"
                              : "text-gray-700"
                          }`}>
                          <div className="flex col-span-1 items-center">
                            <p className="pl-5">Notices</p>
                          </div>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/tech"
                          className={`block px-4 py-2 text-sm ${
                            active
                              ? "bg-gray-100 text-[#00984a]"
                              : "text-gray-700"
                          }`}>
                          <div className="flex col-span-1 items-center">
                            <p className="pl-5">Our Technologies</p>
                          </div>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/gallery"
                          className={`block px-4 py-2 text-sm ${
                            active
                              ? "bg-gray-100 text-[#00984a]"
                              : "text-gray-700"
                          }`}>
                          <div className="flex col-span-1 items-center">
                            <p className="pl-5">Gallery</p>
                          </div>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/video"
                          className={`block px-4 py-2 text-sm ${
                            active
                              ? "bg-gray-100 text-[#00984a]"
                              : "text-gray-700"
                          }`}>
                          <div className="flex col-span-1 items-center">
                            <p className="pl-5">Corporate Videos</p>
                          </div>
                        </Link>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
              <NavLink to="/health">Packages</NavLink>
              <NavLink to="/doctorsearch">Doctors</NavLink>
              <NavLink to="/branch">Branches</NavLink>
              <NavLink to="/patient_portal">
                <div className="flex">
                  {" "}
                  Patient Portal{" "}
                  <svg
                    className="w-[16px] h-[16px] fill-[#00984a] ml-1"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg">
                    {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                    <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"></path>
                  </svg>{" "}
                </div>
              </NavLink>
              {/* <NavLink to="/sample">Home Collection</NavLink> */}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfnFAHgePOjueWSh2mAoPOuyCjw93Iwdp7jwK7vHvzvVIWxJw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-base font-medium rounded-lg transition-all duration-150 text-gray-700 hover:bg-gray-100 hover:text-[#00984a]">
                Home Collection
              </a>
              <NavLink to="/contact">Contact</NavLink>
            </nav>

            <div className="lg:hidden">
              <button
                onClick={() => setMobileOpen(true)}
                className="text-gray-700">
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <Transition appear show={mobileOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setMobileOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="scale-95 opacity-0"
                enterTo="scale-100 opacity-100"
                leave="ease-in duration-200"
                leaveFrom="scale-100 opacity-100"
                leaveTo="scale-95 opacity-0">
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center mb-4">
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setMobileOpen(false)}>
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="space-y-3 ">
                    <Menu as="div" className="relative ">
                      <Menu.Button className="inline-flex items-center ml-1 text-[16px] px-3 py-2   font-medium text-gray-700 hover:text-[#00984a] hover:bg-gray-100 rounded-lg">
                        About
                        <ChevronDownIcon className="w-4 h-4 ml-5" />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0">
                        <Menu.Items className="absolute z-10 mt-2 w-full h-40 overflow-scroll bg-white shadow-lg rounded-lg py-2">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/goals"
                                onClick={() => setMobileOpen(false)}
                                className={`block px-4 py-2 text-sm ${
                                  active
                                    ? "bg-gray-100 text-[#00984a]"
                                    : "text-gray-700"
                                }`}>
                                <div className="flex col-span-1 items-center">
                                  <p className="pl-5 font-medium">
                                    Objectives & Goals
                                  </p>
                                </div>
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/chairman"
                                onClick={() => setMobileOpen(false)}
                                className={`block px-4 py-2 text-sm ${
                                  active
                                    ? "bg-gray-100 text-[#00984a]"
                                    : "text-gray-700"
                                }`}>
                                <div className="flex col-span-1 items-center">
                                  <p className="pl-5 font-medium">
                                    {" "}
                                    Message from Chairman
                                  </p>
                                </div>
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/director"
                                onClick={() => setMobileOpen(false)}
                                className={`block px-4 py-2 text-sm ${
                                  active
                                    ? "bg-gray-100 text-[#00984a]"
                                    : "text-gray-700"
                                }`}>
                                <div className="flex col-span-1 items-center">
                                  <p className="pl-5 font-medium">
                                    Message from MD
                                  </p>
                                </div>
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/dmd"
                                onClick={() => setMobileOpen(false)}
                                className={`block px-4 py-2 text-sm ${
                                  active
                                    ? "bg-gray-100 text-[#00984a]"
                                    : "text-gray-700"
                                }`}>
                                <div className="flex col-span-1 items-center">
                                  <p className="pl-5 font-medium">
                                    Message from DMD
                                  </p>
                                </div>
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/about"
                                onClick={() => setMobileOpen(false)}
                                className={`block px-4 py-2 text-sm ${
                                  active
                                    ? "bg-gray-100 text-[#00984a]"
                                    : "text-gray-700"
                                }`}>
                                <div className="flex col-span-1 items-center">
                                  <p className="pl-5 font-medium">
                                    {" "}
                                    Management Team
                                  </p>
                                </div>
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/notice"
                                onClick={() => setMobileOpen(false)}
                                className={`block px-4 py-2 text-sm ${
                                  active
                                    ? "bg-gray-100 text-[#00984a]"
                                    : "text-gray-700"
                                }`}>
                                <div className="flex col-span-1 items-center">
                                  <p className="pl-5 font-medium">Notices</p>
                                </div>
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/tech"
                                onClick={() => setMobileOpen(false)}
                                className={`block px-4 py-2 text-sm ${
                                  active
                                    ? "bg-gray-100 text-[#00984a]"
                                    : "text-gray-700"
                                }`}>
                                <div className="flex col-span-1 items-center">
                                  <p className="pl-5 font-medium">
                                    Our Technologies
                                  </p>
                                </div>
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/gallery"
                                onClick={() => setMobileOpen(false)}
                                className={`block px-4 py-2 text-sm ${
                                  active
                                    ? "bg-gray-100 text-[#00984a]"
                                    : "text-gray-700"
                                }`}>
                                <div className="flex col-span-1 items-center">
                                  <p className="pl-5 font-medium">Gallery</p>
                                </div>
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/video"
                                onClick={() => setMobileOpen(false)}
                                className={`block px-4 py-2 text-sm ${
                                  active
                                    ? "bg-gray-100 text-[#00984a]"
                                    : "text-gray-700"
                                }`}>
                                <div className="flex col-span-1 items-center">
                                  <p className="pl-5 font-medium">
                                    Corporate Videos
                                  </p>
                                </div>
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    <NavLink to="/health" onClick={() => setMobileOpen(false)}>
                      Packages
                    </NavLink>
                    <NavLink
                      to="/doctorsearch"
                      onClick={() => setMobileOpen(false)}>
                      Doctors
                    </NavLink>
                    <NavLink to="/branch" onClick={() => setMobileOpen(false)}>
                      Branches
                    </NavLink>

                    <NavLink
                      to="/patient_portal"
                      onClick={() => setMobileOpen(false)}>
                      Patient Portal
                    </NavLink>
                    {/* <NavLink to="/sample" onClick={() => setMobileOpen(false)}>
                      Sample Collection
                    </NavLink> */}
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSfnFAHgePOjueWSh2mAoPOuyCjw93Iwdp7jwK7vHvzvVIWxJw/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-2 text-base font-medium rounded-lg transition-all duration-150 text-gray-700 hover:bg-gray-100 hover:text-[#00984a]">
                      Sample Collection
                    </a>
                    <NavLink to="/contact" onClick={() => setMobileOpen(false)}>
                      Contact
                    </NavLink>
                    <NavLink
                      to="/complain"
                      onClick={() => setMobileOpen(false)}>
                      Complain and Advise
                    </NavLink>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Navbar;
