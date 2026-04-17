import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";
import LandingPage from "./landing-page/landing-page";
import Protected from "./features/auth/components/protectet";
import Dashboard from "./features/interview/pages/Dashboard";
import GenerateReport from "./features/interview/pages/generate-report";


import MainLayout from "./layouts/main-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/generate-report",
        element: (
          <Protected>
            <GenerateReport />
          </Protected>
        ),
      },
      {
        path: "/dashboard/:interviewId",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
