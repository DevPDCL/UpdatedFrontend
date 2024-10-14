import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import {
  Nav,
  Navbar,
  Branch,
  Layout,
  Sample,
  Contact,
  Health,
  Search,
  Technology,
  Details,
  About,
  Complain,
  Chairman,
  Goals,
  Notice,
  ReportDownload,
  Terms,
  Privacy,
  Director,
  Error,
  Footer,
  Dmd,
  Sidemenu,
  Shantinagar,
  Hotlines,
  Shyamoli,
  Mirpur,
  Uttara,
  Bogura,
  Rangpur,
  Refund,
  ServiceSearch,
  Badda,
  Barishal,
  Chattogram,
  Dhanmondi,
  Dinajpur,
  EnglishRoad,
  Gazipur,
  Jatrabari,
  Khulna,
  Kushtia,
  Mymensingh,
  Narayangonj,
  Noakhali,
  Rajshahi,
  Savar,
  UttaraGaribENewaz,
  TestAPI,
} from "./components";
import Home from "./adminpanel/Home";
import Stats from "./adminpanel/Stats";
import Layer from "./adminpanel/Layer";
import Appointment from "./adminpanel/Appointment";
import Csample from "./adminpanel/Csample";
import Ccomplain from "./adminpanel/Ccomplain";
import Management from "./adminpanel/Management";
import Doctors from "./adminpanel/Doctors";
import Cmessages from "./adminpanel/Cmessages";
import "./index.css";

const App = () => {
  return (
    <div>
      <Nav />
      <Navbar />
      <Outlet />
      <Sidemenu />
      <Footer />
    </div>
  );
};
const DoctorDetail = lazy(() => import("./components/DoctorDetail"));
const DoctorSearch = lazy(() => import("./components/DoctorSearch"));

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Layout /> },
      { path: "/patient_portal", element: <ReportDownload /> },
      { path: "/sample", element: <Sample /> },
      { path: "/search", element: <Search /> },
      { path: "/testapi", element: <TestAPI /> },
      {
        path: "/doctordetail/:doctorId",
        element: (
          <Suspense fallback={<h1 className="text-black"> Loading.....</h1>}>
            {" "}
            <DoctorDetail />{" "}
          </Suspense>
        ),
      },
      {
        path: "/DoctorSearch",
        element: (
          <Suspense fallback={<h1 className="text-black"> Loading.....</h1>}>
            {" "}
            <DoctorSearch />{" "}
          </Suspense>
        ),
      },
      { path: "/tech", element: <Technology /> },
      { path: "/goals", element: <Goals /> },
      { path: "/complain", element: <Complain /> },
      { path: "/branch", element: <Branch /> },
      { path: "/director", element: <Director /> },
      { path: "/chairman", element: <Chairman /> },
      { path: "/hotlines", element: <Hotlines /> },
      { path: "/Dmd", element: <Dmd /> },
      { path: "/notice", element: <Notice /> },
      { path: "/contact", element: <Contact /> },
      { path: "/health", element: <Health /> },
      { path: "/details", element: <Details /> },
      { path: "/about", element: <About /> },
      { path: "/layer", element: <Layer /> },
      { path: "/terms&conditions", element: <Terms /> },
      { path: "/privacy&policy", element: <Privacy /> },
      { path: "/home", element: <Home /> },
      { path: "/stats", element: <Stats /> },
      { path: "/appointment", element: <Appointment /> },
      { path: "/csample", element: <Csample /> },
      { path: "/ccomplain", element: <Ccomplain /> },

      { path: "/messages", element: <Cmessages /> },
      { path: "/management", element: <Management /> },
      { path: "/shantinagar", element: <Shantinagar /> },
      { path: "/shyamoli", element: <Shyamoli /> },
      { path: "/mirpur", element: <Mirpur /> },
      { path: "/uttara", element: <Uttara /> },
      { path: "/bogura", element: <Bogura /> },
      { path: "/rangpur", element: <Rangpur /> },
      { path: "/badda", element: <Badda /> },
      { path: "/barishal", element: <Barishal /> },
      { path: "/chattogram", element: <Chattogram /> },
      { path: "/dhanmondi", element: <Dhanmondi /> },
      { path: "/dinajpur", element: <Dinajpur /> },
      { path: "/englishRoad", element: <EnglishRoad /> },
      { path: "/gazipur", element: <Gazipur /> },
      { path: "/jatrabari", element: <Jatrabari /> },
      { path: "/khulna", element: <Khulna /> },
      { path: "/kushtia", element: <Kushtia /> },
      { path: "/mymensingh", element: <Mymensingh /> },
      { path: "/narayangonj", element: <Narayangonj /> },
      { path: "/noakhali", element: <Noakhali /> },
      { path: "/rajshahi", element: <Rajshahi /> },
      { path: "/savar", element: <Savar /> },
      { path: "/uttaragaribenewaz", element: <UttaraGaribENewaz /> },
      { path: "/refund", element: <Refund /> },
      { path: "/servicesearch", element: <ServiceSearch /> },
      { path: "/doctors", element: <Doctors /> },
    ],
    errorElement: <Error />,
  },
];

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
