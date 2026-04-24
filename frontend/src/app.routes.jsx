import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";
import VerifyOTP from "./features/auth/pages/verify-otp";
import ForgotPassword from "./features/auth/pages/forgot-password";
import ResetPassword from "./features/auth/pages/reset-password";
import OAuthCallback from "./features/auth/pages/oauth-callback";
import Profile from "./features/auth/pages/profile";
import ChangePassword from "./features/auth/pages/change-password";
import LandingPage from "./landing-page/landing-page";
import Dashboard from "./features/interview/pages/dashboard";
import GenerateReport from "./features/interview/pages/generate-report";

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
