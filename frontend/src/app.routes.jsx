import { lazy } from "react";
import { createBrowserRouter } from "react-router";

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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/verify-otp",
        element: <VerifyOTP />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/oauth/callback",
        element: <OAuthCallback />,
      },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/generate-report",
        element: <GenerateReport />,
      },
      {
        path: "/dashboard/:interviewId",
        element: <Dashboard />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
    ],
  },
]);
