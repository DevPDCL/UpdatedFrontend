import React from "react";
import {
  Feedbacks,
  Hero,
  Cor,
  Nav,
  Sidemenu,
  Navbar,
  Bottommenu,
  Notification,
  Tech,
  Works,
} from "../components";

function Layout() {
  return (
    <div className="bg-[#F5FFFA]">
      <Nav />

      <Navbar />
      <Sidemenu />
      <Bottommenu />
      <Hero />
      <Notification />
      <Works />
      <Feedbacks />
      <Cor />
      <Tech />
    </div>
  );
}

export default Layout;
