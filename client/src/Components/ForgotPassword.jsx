import React from 'react'
import Navbar from './Navbar'

function ForgotPassword() {
  return (
    <div>
      <Navbar />
      <div className="mt-28">
        <div>
          <h1 className="text-center font-semibold text-4xl mb-4">FORGOT PASSWORD</h1>
        </div>
        <form className="flex justify-center items-center">
          <div className="artboard phone-1 space-y-4">
            <input
              type="text"
              name="name"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="password"
              name="newpassword"
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter New Password"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="password"
              name="confirmpassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter Confirm Password"
              className="input input-bordered w-full max-w-xs"
            />
            <button className="btn btn-primary w-full hover:bg-primary">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword