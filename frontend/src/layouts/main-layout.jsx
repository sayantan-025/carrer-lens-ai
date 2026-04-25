import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/ui/navbar";
import Footer from "../components/ui/footer";
import LenisScroll from "../components/ui/lenis-scroll";
import GlobalBackground from "../components/ui/global-background";
import { useAuthContext } from "../features/auth/auth.context";
import { Skeleton } from "../components/ui/skeleton";

const LandingPageSkeleton = () => (
  <div className="w-full space-y-20 pb-20">
    {/* Hero Skeleton */}
    <div className="pt-32 px-6 flex flex-col items-center text-center space-y-8">
      <Skeleton className="h-6 w-32 rounded-full" />
      <div className="space-y-4 w-full max-w-4xl flex flex-col items-center">
        <Skeleton className="h-20 w-full rounded-2xl" />
        <Skeleton className="h-20 w-3/4 rounded-2xl" />
      </div>
      <Skeleton className="h-6 w-full max-w-2xl rounded-md" />
      <div className="flex gap-4 pt-4">
        <Skeleton className="h-14 w-44 rounded-full" />
        <Skeleton className="h-14 w-44 rounded-full" />
      </div>
      <Skeleton className="mt-12 h-[500px] w-full max-w-6xl rounded-[3rem]" />
    </div>
    
    {/* Features Skeleton */}
    <div className="px-6 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {[1, 2, 3].map(i => (
        <Skeleton key={i} className="h-80 w-full rounded-[2.5rem]" />
      ))}
    </div>
  </div>
);

const MainLayout = () => {
  return (
    <div className="min-h-screen relative flex flex-col bg-black">
      <LenisScroll />
      <GlobalBackground />
      <Navbar />
      <main className="flex-1 relative z-10 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
