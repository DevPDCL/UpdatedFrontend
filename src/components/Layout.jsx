import React from "react";
import {
  Feedbacks,
  Hero,
  Cor,
  Search,
  Works,
} from "../components";

function Layout() {
  return (
    <div className="bg-[#ffffff]">
      <Hero />
      <Search />
      <Works />
      <Cor />
      <Feedbacks />
    </div>
  );
}

export default Layout;
