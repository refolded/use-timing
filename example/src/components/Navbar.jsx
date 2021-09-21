import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className='mb-2 shadow-lg navbar bg-neutral text-neutral-content rounded-box'>
        <div className='w-full px-2 mx-2 navbar-center lg:flex'>
          <div className='flex items-stretch justify-center w-full'>
            <Link
              to='/'
              className={`btn btn-ghost btn-lg rounded-btn ${
                window.location.pathname === "/" ? "text-pink-400" : ""
              }`}
            >
              useInterval
            </Link>
            <Link
              to='/cycle'
              className={`btn btn-ghost btn-lg rounded-btn ${
                window.location.pathname === "/cycle" ? "text-pink-400" : ""
              }`}
            >
              useCycle
            </Link>
            <Link
              to='/inout'
              className={`btn btn-ghost btn-lg rounded-btn ${
                window.location.pathname === "/inout" ? "text-pink-400" : ""
              }`}
            >
              useInOut
            </Link>
            <Link
              to='/countdown'
              className={`btn btn-ghost btn-lg rounded-btn ${
                window.location.pathname === "/countdown" ? "text-pink-400" : ""
              }`}
            >
              useCountdown
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
