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
  Patient,
  Director,
  Error,
  Tech,
  Dmd,
  Sidemenu,
  Shantinagar,
} from "./components";
import Home from "./adminpanel/Home";
import Stats from "./adminpanel/Stats";
import Layer from "./adminpanel/Layer";
import Appointment from "./adminpanel/Appointment";
import Csample from "./adminpanel/Csample";
import Ccomplain from "./adminpanel/Ccomplain";
import Management from "./adminpanel/Management";
import "./index.css";

const App = () => {
  return (
    <div>
      <Nav />
      <Navbar />
      <Outlet />
      <Sidemenu />
      <Tech />
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
      { path: "/patient", element: <Patient /> },
      { path: "/sample", element: <Sample /> },
      { path: "/search", element: <Search /> },
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
      { path: "/Dmd", element: <Dmd /> },
      { path: "/notice", element: <Notice /> },
      { path: "/contact", element: <Contact /> },
      { path: "/health", element: <Health /> },
      { path: "/details", element: <Details /> },
      { path: "/about", element: <About /> },
      { path: "/layer", element: <Layer /> },
      { path: "/home", element: <Home /> },
      { path: "/stats", element: <Stats /> },
      { path: "/appointment", element: <Appointment /> },
      { path: "/csample", element: <Csample /> },
      { path: "/ccomplain", element: <Ccomplain /> },
      { path: "/management", element: <Management /> },
      { path: "/shantinagar", element: <Shantinagar /> },
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
