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
  Videos,
  Gallery,
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
  ChatWidget
} from "./components";
import "./index.css";
import NoticeDetails from "./components/NoticeDetails";

const App = () => {
  return (
    <div>
      <Nav />
      <Navbar />
      {/* <ChatWidget /> */}
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
          <Suspense fallback={null}>
            {" "}
            <DoctorDetail />{" "}
          </Suspense>
        ),
      },
      {
        path: "/our-doctors",
        element: (
          <Suspense fallback={null}>
            {" "}
            <DoctorSearch />{" "}
          </Suspense>
        ),
      },
      { path: "/tech", element: <Technology /> },
      { path: "/goals", element: <Goals /> },
      { path: "/complain", element: <Complain /> },
      { path: "/our-branches", element: <Branch /> },
      { path: "/director", element: <Director /> },
      { path: "/chairman", element: <Chairman /> },
      { path: "/hotlines", element: <Hotlines /> },
      { path: "/Dmd", element: <Dmd /> },
      { path: "/notice", element: <Notice /> },
      { path: "/notices/:id", element: <NoticeDetails /> },
      { path: "/video", element: <Videos /> },
      { path: "/contact-us", element: <Contact /> },
      { path: "/health", element: <Health /> },
      { path: "/details", element: <Details /> },
      { path: "/about", element: <About /> },
      { path: "/terms&conditions", element: <Terms /> },
      { path: "/privacy&policy", element: <Privacy /> },
      { path: "/gallery", element: <Gallery /> },
      { path: "/refund", element: <Refund /> },
      { path: "/servicesearch", element: <ServiceSearch /> },

      // branch pages
      { path: "/shantinagar", element: <Shantinagar /> },
      { path: "/shyamoli", element: <Shyamoli /> },
      { path: "/mirpur", element: <Mirpur /> },
      { path: "/uttarasector4", element: <Uttara /> },
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
      { path: "/uttarasector13", element: <UttaraGaribENewaz /> },
      //end of branch pages
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
