import React from "react";
import { Outlet, Navigate } from "react-router";
import { useAuthContext } from "../features/auth/auth.context";
import { Skeleton } from "../components/ui/skeleton";
import GlobalBackground from "../components/ui/global-background";

const AuthLayoutSkeleton = () => (
  <div className="min-h-screen w-full bg-black flex items-center justify-center p-6">
    <Skeleton className="w-full max-w-md h-[600px] rounded-[2.5rem]" />
  </div>
);

const AuthLayout = () => {
  const { isAuthenticated, isLoading, isAuthChecking } = useAuthContext();

  if (isAuthChecking || isLoading) {
    return <AuthLayoutSkeleton />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-black overflow-hidden">
      <div className="tactical-overlay" />
      <GlobalBackground />
      <main className="relative z-10 w-full flex items-center justify-center p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
