import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import { Spinner } from "./components/ui/spinner";

const Login = lazy(() => import("./features/auth/pages/login"));
const Register = lazy(() => import("./features/auth/pages/register"));
const VerifyOTP = lazy(() => import("./features/auth/pages/verify-otp"));
const ForgotPassword = lazy(() => import("./features/auth/pages/forgot-password"));
const ResetPassword = lazy(() => import("./features/auth/pages/reset-password"));
const OAuthCallback = lazy(() => import("./features/auth/pages/oauth-callback"));
const Profile = lazy(() => import("./features/auth/pages/profile"));
const ChangePassword = lazy(() => import("./features/auth/pages/change-password"));
const LandingPage = lazy(() => import("./landing-page/landing-page"));
const Dashboard = lazy(() => import("./features/interview/pages/dashboard"));
const GenerateReport = lazy(() => import("./features/interview/pages/generate-report"));

import MainLayout from "./layouts/main-layout";
import AuthLayout from "./layouts/auth-layout";
import ProtectedLayout from "./layouts/protected-layout";

const PageLoader = () => (
  <div className="flex h-[50vh] w-full items-center justify-center">
    <Spinner size="lg" />
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<PageLoader />}>
            <LandingPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/verify-otp",
        element: (
          <Suspense fallback={<PageLoader />}>
            <VerifyOTP />
          </Suspense>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ForgotPassword />
          </Suspense>
        ),
      },
      {
        path: "/reset-password",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ResetPassword />
          </Suspense>
        ),
      },
      {
        path: "/oauth/callback",
        element: (
          <Suspense fallback={<PageLoader />}>
            <OAuthCallback />
          </Suspense>
        ),
      },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/generate-report",
        element: (
          <Suspense fallback={<PageLoader />}>
            <GenerateReport />
          </Suspense>
        ),
      },
      {
        path: "/dashboard/:interviewId",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "/change-password",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ChangePassword />
          </Suspense>
        ),
      },
    ],
  },
]);
