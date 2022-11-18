import React from "react";

const Dashboard = () => {
  return (
    <div className="flex justify-content-center login">
      <img src="assets/layout/images/pages/logo.ico" />
    </div>
  );
};

const comparisonFn = function (prevProps, nextProps) {
  return (
    prevProps.location.pathname === nextProps.location.pathname &&
    prevProps.colorMode === nextProps.colorMode
  );
};

export default React.memo(Dashboard, comparisonFn);
