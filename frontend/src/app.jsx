import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { InterviewProvider } from "./features/interview/interview.context.jsx";
import { ToastProvider } from "./context/toast-context.jsx";

const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <InterviewProvider>
          <RouterProvider router={router} />
        </InterviewProvider>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
