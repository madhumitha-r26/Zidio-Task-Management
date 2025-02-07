import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar"

function Login() {
 
  return (
    <div>
    <Navbar/>
    <div className="mt-28">
      <div>
        <h1 className="text-center font-semibold text-4xl mb-4">LOGIN</h1>
      </div>
      <form className="flex justify-center items-center">
        <div className="artboard phone-1 space-y-4">
          <input
            type="text"
            placeholder="Enter Email"
            required
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="password"
            placeholder="Enter Password"
            required
            className="input input-bordered w-full max-w-xs"
          />

          <button type="submit" className="btn btn-primary w-full hover:bg-primary">
          Login 
          </button>
          <p className="text-center">Don't have an account? <NavLink to={"/register"} className='text-blue-600'>Register</NavLink>   </p>
        </div>
        
      </form>
</div>

    </div>
  );
}

export default Login;
