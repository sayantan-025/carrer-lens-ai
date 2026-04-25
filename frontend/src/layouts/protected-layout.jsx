import React from "react";
import { Outlet, Navigate, useLocation } from "react-router";
import { useAuth } from "../features/auth/hooks/use-auth";
import { Skeleton } from "../components/ui/skeleton";
import Navbar from "../components/ui/navbar";
import LenisScroll from "../components/ui/lenis-scroll";
import { cn } from "../lib/utils";

const AuthenticatedSkeleton = () => (
  <div className="h-screen w-full bg-black flex flex-col overflow-hidden">
    <header className="h-16 border-b border-white/5 bg-zinc-950/40 px-8 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-6">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="h-10 w-32 rounded-xl" />
    </header>
    <main className="flex-1 min-h-0 grid grid-cols-12 overflow-hidden">
      <aside className="col-span-2 border-r border-white/5 p-8 space-y-4">
        <Skeleton className="h-4 w-20 mb-8" />
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-14 w-full rounded-2xl" />)}
      </aside>
      <section className="col-span-10 p-16 space-y-12 overflow-y-auto scrollbar-hidden">
        <div className="space-y-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-16 w-3/4" />
        </div>
        {[1, 2].map(i => <Skeleton key={i} className="h-60 w-full rounded-[2.5rem]" />)}
      </section>
    </main>
  </div>
);

const ProtectedLayout = () => {
  const { isAuthenticated, isLoading, isAuthChecking } = useAuth();
  const location = useLocation();

  if (isAuthChecking || isLoading) {
    return <AuthenticatedSkeleton />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const isFocusedPage = location.pathname.startsWith("/dashboard") || location.pathname === "/generate-report";

  return (
    <div className="min-h-screen relative flex flex-col bg-black overflow-hidden">
      {!isFocusedPage && <LenisScroll />}
      {!isFocusedPage && <Navbar />}
      
      <main className={cn(
        "flex-1 relative z-10 flex flex-col min-h-0",
        isFocusedPage ? "overflow-hidden" : "overflow-y-auto mt-20"
      )}>
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
