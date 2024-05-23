import React from "react";
import {
  Feedbacks,
  Hero,
  Cor,
  Search,
  HomeContent,
} from "../components";

function Layout() {
  return (
    <div className="bg-[#ffffff]">
      <Hero />
      <Search />
      <HomeContent />
      <Cor />
      <Feedbacks />
    </div>
  );
}

export default Layout;
