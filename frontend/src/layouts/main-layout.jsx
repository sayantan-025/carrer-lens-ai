import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/ui/navbar";
import Footer from "../components/ui/footer";
import LenisScroll from "../components/ui/lenis-scroll";
import GlobalBackground from "../components/ui/global-background";

const MainLayout = () => {
  return (
    <div className="min-h-screen relative flex flex-col">
      <LenisScroll />
      <GlobalBackground />
      <Navbar />
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
