import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Wrapper = ({ children }) => {
  const location = useLocation();

  const excludedRoutes = ["/", "/register", "/login"];

  const isExcluded = excludedRoutes.includes(location.pathname);

  return (
    <div>
      {!isExcluded && (
        <div>
          <Navbar />
        </div>
      )}
      {children}
    </div>
  );
};

export default Wrapper;
