import React from "react";
import "./brand.css";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Brand = ({ className }) => {
  const navigate = useNavigate();

  return (
    <>
      <h2
        className={`brand-name ${className ? className : ""}`}
        onClick={() => navigate("/")}
      >
        TweetX
      </h2>
      <img
        src={Logo}
        alt="logo"
        className="brand-logo"
        onClick={() => navigate("/")}
      />
    </>
  );
};

export default Brand;
