import React from "react";
import "@fontsource/ubuntu";
import { styles } from "../styles";
function Register() {
  return (
    <>
      <section className="flex flex-wrap">
        <div className=" w-full h-[300px] flex justify-evenly items-center flex-row">
          <div className="flex flex-row  max-w-7xl">
            <div className={"font-bold text-right"}>
              <h1 className="text-[600px] opacity-[30%] text-[#B7E4C7]">O</h1>
            </div>
          </div>
        </div>
      </section>

      <nav
        className={`${styles.paddingX}  w-full  h-auto flex flex-wrap items-center  sm:justify-evenly  bg-none `}
      >
        <div className="w-full h-[135px] flex flex-row justify-between  items-center max-w-7xl mx-auto">
          <Link
            to="/"
            className="flex items-center  gap-2"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <img
              src={logo}
              alt="logo"
              className="w-[120px] h-[120px] p-2 object-contain"
            />
          </Link>
          <div
            class="hidden w-full md:block  mx-auto md:w-auto"
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4  rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0   ">
              <li className="inline-flex flex-row justify-center items-center">
                <div className="flex flex-col  ">
                  <a href="">
                    <p className="text-[blue] ms-5 text-[13px] font-small">
                      Hotline(Dhanmondi)
                    </p>
                  </a>
                  <a href="">
                    <p className="text-[blue] ms-5 text-[13px] font-small">
                      10636
                    </p>
                  </a>
                </div>
              </li>
              <li className="inline-flex flex-row justify-center items-center">
                <div className="flex flex-col  gap-0">
                  <a href="">
                    <p className="text-black ms-5 text-[13px] font-small">
                      We are open 24/7
                    </p>
                  </a>
                  <a href="">
                    <p className="text-black ms-5 text-[13px] font-small">
                      (Only Dhanmondi)
                    </p>
                  </a>
                </div>
              </li>
              <li className="inline-flex flex-row justify-center items-center">
                <div className="flex flex-col  gap-0">
                  <a href="">
                    <p className="text-[red] ms-5 text-[13px] font-small">
                      Email us
                    </p>
                  </a>
                  <a href="">
                    <p className="text-[red] ms-5 text-[13px] font-small">
                      info@populardiagnostic.com
                    </p>
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex flex-1 justify-end ">
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-[33px] h-[33px] object-contain  cursor-pointer"
              onClick={() => setToggle(!toggle)}
            />
            <div
              className={`${
                !toggle ? "hidden" : "flex"
              } p-10 bg-white  absolute top-40 right-20 mx-4 my-2 min-w-[335px] z-10 rounded-xl`}
            >
              <ul className="list-none flex justify-start items-start flex-col gap-[20px]">
                {navLinks.map((link) => (
                  <li
                    key={link.id}
                    className={`${active === link.title} flex flex-row `}
                    onClick={() => {
                      setToggle(!toggle);
                      setActive(link.title);
                    }}
                  >
                    <a href={`#${link.id}`}>
                      <p className="text-black ms-5 text-sm font-small">
                        {link.title}
                        <hr className="h-px w-[250px] my-1 bg-gray-200 border-0 dark:bg-gray-700" />
                      </p>
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    className="text-blue-700  w-[285px] hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ms-auto  dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                  >
                    PATIENT PORTAL
                    <br />
                    (DOWNLOAD REPORT)
                  </button>
                </li>

                <li>
                  {" "}
                  <button
                    type="button"
                    className="text-purple-700  w-[285px] hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                  >
                    ONLINE DOCTOR APPOINTMENT
                  </button>
                </li>

                <li>
                  {" "}
                  <button
                    type="button"
                    className="text-green-700  w-[285px] hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-400 dark:text-green-400 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-green-900"
                  >
                    PATIENT LOGIN
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Register;
