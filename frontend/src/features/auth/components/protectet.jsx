import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from "react";
import FullScreenLoader from "../../../components/ui/full-screen-loader";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return <FullScreenLoader />;
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default Protected;
