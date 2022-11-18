import React from "react";
import { useHistory } from "react-router-dom";

const AppFooter = () => {
  return (
    <div
      className=" text-center text-lg-start"
      style={{ background: "#4b4e52" }}
    >
      <div className="text-center p-3">
        <div className="footer-bottom" style={{ color: "white" }}>
          <h4>CoffeNet Copyright Ⓒ Alexander Say</h4>
        </div>
      </div>
    </div>
  );
};

export default AppFooter;
