import React from "react";
import { Outlet, Navigate, useLocation } from "react-router";
import { useAuth } from "../features/auth/hooks/use-auth";
import Navbar from "../components/ui/navbar";
import LenisScroll from "../components/ui/lenis-scroll";
import FullScreenLoader from "../components/ui/full-screen-loader";
import GlobalBackground from "../components/ui/global-background";

const ProtectedLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="h-screen flex flex-col relative overflow-hidden">
      <GlobalBackground />
      <Navbar />
      <main className="flex-1 mt-20 relative z-10 flex flex-col min-h-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
