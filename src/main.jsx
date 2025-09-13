import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Nav, Navbar, Footer, Sidemenu, Error, ScrollToTop } from "./components";
import "./index.css";

const PageLoader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "1.5rem",
      color: "#333",
    }}>
    Loading...
  </div>
);

const App = () => {
  return (
    <div>
      <ScrollToTop />
      <Nav />
      <Navbar />
      <Outlet />
      <Sidemenu />
      <Footer />
    </div>
  );
};

const lazyLoad = (componentName) => {
  return lazy(() =>
    import("./components").then((module) => ({
      default: module[componentName],
    }))
  );
};

const Layout = lazyLoad("Layout");
const ReportDownload = lazyLoad("ReportDownload");
const SampleCollectionMain = lazyLoad("SampleCollectionMain");
const DoctorDetail = lazyLoad("DoctorDetail");
const DoctorSearch = lazyLoad("DoctorSearch");
const Technology = lazyLoad("Technology");
const Goals = lazyLoad("Goals");
const Branch = lazyLoad("Branch");
const Director = lazyLoad("Director");
const Chairman = lazyLoad("Chairman");
const Hotlines = lazyLoad("Hotlines");
const Dmd = lazyLoad("Dmd");
const Notice = lazyLoad("Notice");
const NoticeDetails = lazy(() => import("./components/NoticeDetails")); 
const Videos = lazyLoad("Videos");
const Contact = lazyLoad("Contact");
const Health = lazyLoad("Health");
const About = lazyLoad("About");
const Terms = lazyLoad("Terms");
const Privacy = lazyLoad("Privacy");
const Gallery = lazyLoad("Gallery");
const Refund = lazyLoad("Refund");

// Branch Pages
const Shantinagar = lazyLoad("Shantinagar");
const Shyamoli = lazyLoad("Shyamoli");
const Mirpur = lazyLoad("Mirpur");
const Uttara = lazyLoad("Uttara");
const Bogura = lazyLoad("Bogura");
const Rangpur = lazyLoad("Rangpur");
const Badda = lazyLoad("Badda");
const Barishal = lazyLoad("Barishal");
const Chattogram = lazyLoad("Chattogram");
const Dhanmondi = lazyLoad("Dhanmondi");
const Dinajpur = lazyLoad("Dinajpur");
const EnglishRoad = lazyLoad("EnglishRoad");
const Gazipur = lazyLoad("Gazipur");
const Jatrabari = lazyLoad("Jatrabari");
const Khulna = lazyLoad("Khulna");
const Kushtia = lazyLoad("Kushtia");
const Mymensingh = lazyLoad("Mymensingh");
const Narayangonj = lazyLoad("Narayangonj");
const Noakhali = lazyLoad("Noakhali");
const Rajshahi = lazyLoad("Rajshahi");
const Savar = lazyLoad("Savar");
const UttaraGaribENewaz = lazyLoad("UttaraGaribENewaz");

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: (
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        ),
        children: [
          { path: "/", element: <Layout /> },
          { path: "/patient_portal", element: <ReportDownload /> },
          { path: "/sample-collection", element: <SampleCollectionMain /> },
          { path: "/doctordetail/:doctorId", element: <DoctorDetail /> },
          { path: "/our-doctors", element: <DoctorSearch /> },
          { path: "/tech", element: <Technology /> },
          { path: "/goals", element: <Goals /> },
          { path: "/our-branches", element: <Branch /> },
          { path: "/director", element: <Director /> },
          { path: "/chairman", element: <Chairman /> },
          { path: "/hotlines", element: <Hotlines /> },
          { path: "/dmd", element: <Dmd /> },
          { path: "/notice", element: <Notice /> },
          { path: "/notices/:id", element: <NoticeDetails /> },
          { path: "/video", element: <Videos /> },
          { path: "/contact-us", element: <Contact /> },
          { path: "/health", element: <Health /> },
          { path: "/about", element: <About /> },
          { path: "/terms&conditions", element: <Terms /> },
          { path: "/privacy&policy", element: <Privacy /> },
          { path: "/gallery", element: <Gallery /> },
          { path: "/refund", element: <Refund /> },

          // Branch pages
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
        ],
      },
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
