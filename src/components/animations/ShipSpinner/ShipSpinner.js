import React from "react";
// import "../Spinner/spinner.css";
// import "./ShipSpinner.scss";

const ShipSpinner = () => {
  return (
    <div className="body" style={{ backgroundColor: "#202020" }}>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="Card">
          <div className="Front">
            <img
              src={process.env.PUBLIC_URL + "/image/icons/mina.png"}
              alt="mina"
            />
          </div>
          <div className="Back">
            <img
              src={process.env.PUBLIC_URL + "/image/icons/brave.png"}
              alt="mina"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipSpinner;
