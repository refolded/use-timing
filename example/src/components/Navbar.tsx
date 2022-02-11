import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({
  routeOptions,
}: {
  routeOptions: Array<{
    path: string;
    label: string;
  }>;
}): React.ReactElement => {
  return (
    <div>
      <div className='mb-2 shadow-lg navbar bg-neutral text-neutral-content rounded-box'>
        <div className='w-full px-2 mx-2 navbar-center lg:flex'>
          <div className='flex items-stretch justify-center w-full'>
            {routeOptions.map((route) => (
              <Link
                to={route.path}
                key={route.label}
                className={`btn btn-ghost btn-lg rounded-btn ${
                  window.location.pathname === route.path ? "text-pink-400" : ""
                }`}
              >
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
