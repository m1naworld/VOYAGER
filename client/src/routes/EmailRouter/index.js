import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";

const EmailRouter = () => {
  const location = useLocation();
  if (!location.search) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default EmailRouter;
