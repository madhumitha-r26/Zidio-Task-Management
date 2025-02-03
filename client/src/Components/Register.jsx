import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

function Register() {
  return (
    <div>
    <Navbar/>
    <div className="mt-28">
      <div>
        <h1 className="text-center font-semibold text-4xl mb-4">REGISTER</h1>
      </div>
      <div className="flex justify-center items-center">
        <div className="artboard phone-1 space-y-4">
          <input
            type="text"
            placeholder="Enter Email"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="password"
            placeholder="Enter New Password"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full max-w-xs"
          />
          <button className="btn btn-primary w-full hover:bg-primary">
            Register
          </button>
          <p className="text-center">Already have an account? <NavLink to={"/login"} className='text-blue-600'>Login</NavLink> </p>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Register;
