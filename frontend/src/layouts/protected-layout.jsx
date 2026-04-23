import React from "react";
import { Outlet, Navigate, useLocation } from "react-router";
import { useAuth } from "../features/auth/hooks/use-auth";
import Navbar from "../components/ui/navbar";
import LenisScroll from "../components/ui/lenis-scroll";
import FullScreenLoader from "../components/ui/full-screen-loader";
import GlobalBackground from "../components/ui/global-background";
import { cn } from "../lib/utils";

const ProtectedLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const isGenerateReport = location.pathname === "/generate-report";

  return (
    <div className="h-screen flex flex-col relative overflow-hidden bg-black">
      <GlobalBackground />

      <Navbar />
      <main className={cn(
        "flex-1 relative z-10 flex flex-col min-h-0 mt-20 overflow-y-auto"
      )}>
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
