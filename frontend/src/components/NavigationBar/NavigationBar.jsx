import { useState } from "react";
import Brand from "../Brand/Brand";
import "./navigationbar.css";

import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";

import { NavLink, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const [active, setActive] = useState("/");
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      <nav className="navbar-section">
        <div className="container navbar">
          <div className="brand-section">
            <Brand className="custom-brand-class" />
          </div>
          <ul className="menu-section">
            <NavLink to="/" id={pathname === "/" ? "active-link" : ""}>
              Feed
            </NavLink>
            <NavLink
              to="/users"
              id={pathname === "/users" ? "active-link" : ""}
            >
              Users
            </NavLink>
            <NavLink
              to="/profile"
              id={pathname === "/profile" ? "active-link" : ""}
            >
              Profile
            </NavLink>
          </ul>
        </div>
      </nav>
      <ul className="mobile-menu-items">
        <NavLink to='/' id={pathname === "/" ? "active-icon" : ""}>
          <FaHome size={25} />
        </NavLink>
        <NavLink to="/users" id={pathname === "/users" ? "active-icon" : ""}>
          <FaUsers size={25} />
        </NavLink>
        <NavLink to="/profile" id={pathname === "/profile" ? "active-icon" : ""}>
          <HiUserCircle size={25} />
        </NavLink>
      </ul>
    </>
  );
};

export default NavigationBar;
