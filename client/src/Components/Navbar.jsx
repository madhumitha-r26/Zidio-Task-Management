import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar bg-base-100 p-4 shadow-md">
      <div className="flex-1">
        <NavLink to="/" className="text-xl font-semibold text-ghost">
            My Task Maker
        </NavLink>
      </div>

      <div className="md:hidden">
        <button onClick={toggleMenu} aria-label="Toggle menu" className="text-xl">
          {isMenuOpen ? <CloseOutlinedIcon /> : <MenuOutlinedIcon />}
        </button>
      </div>

      
      <div className={`absolute md:relative top-16 right-4 md:top-0 md:right-0 bg-base-100 md:bg-transparent shadow-md md:shadow-none w-48 md:w-auto p-4 md:p-0 transition-all duration-300 ${
        isMenuOpen ? "block" : "hidden md:block"
      }`}>
        <ul className="flex flex-col md:flex-row gap-4 text-base">
            <NavLink to={"/"} className='hover:underline'>Home</NavLink>
            <NavLink to={"/login"} className='hover:underline'>Login</NavLink>
            <NavLink to={"/register"} className='hover:underline'>Register</NavLink>  
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
