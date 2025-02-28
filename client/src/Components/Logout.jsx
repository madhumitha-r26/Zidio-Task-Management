import React from "react";
import { NavLink,useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    console.log("Logged out");
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 w-full">
    <div className="navbar-start">
      <a className="bg-ghost text-xl font-bold">My Task Maker</a>
    </div>
    <div className="navbar-end">
      <NavLink to={"/"}>
        <button className="btn btn-primary w-full hover:bg-primary" onClick={handleLogout}>
          Logout
        </button>
      </NavLink>
    </div>
  </div>
  );
};

export default Logout;
