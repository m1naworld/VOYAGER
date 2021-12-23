import React from "react";

const PrivateRouter = ({ component: Component, fallback: Fallback, user }) => {
  return user ? <Component /> : <Fallback />;
};

export default PrivateRouter;
