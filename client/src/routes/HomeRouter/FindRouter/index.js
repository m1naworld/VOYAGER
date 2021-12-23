import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const FindRouter = () => {
  const location = useLocation();
  if (location.state === null) {
    return <Navigate to="../" />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default FindRouter;
