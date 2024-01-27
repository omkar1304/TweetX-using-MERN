import React from "react";
import "./mainbutton.css";

const MainButton = ({ className, value, children }) => {
  return (
    <button className={`main-button ${className ? className : ""}`}>
      {value}
      {children}
    </button>
  );
};

export default MainButton;
