import React from "react";
import { Outlet, Navigate } from "react-router";
import { useAuthContext } from "../features/auth/auth.context";
import FullScreenLoader from "../components/ui/full-screen-loader";
import GlobalBackground from "../components/ui/global-background";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center">
      <GlobalBackground />
      <main className="relative z-10 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
