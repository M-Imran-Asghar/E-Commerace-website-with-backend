import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

function Navbar() {
  const { isLoggedIn, 
    logout, 
    refreshTokens, 
    accessToken, 
    getRefreshToken
   } = useAuth();

  

  return (
    <div className="sticky bg-slate-400 inset-0 h-14 rounded-t-xl">
      <div className="grid grid-cols-3 items-center">
        <p className="text-indigo-900 font-bold text-lg flex p-2">App Logo</p>
        <nav className="">
          <ul className="flex text-center justify-center items-center gap-8">

            <li className="  ">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `duration-200 font-bold text-sm p-2 ${
                    isActive
                      ? "text-gray-900 hover:underline"
                      : "text-indigo-900"
                  }`
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `duration-200 font-bold text-sm p-2 ${
                    isActive
                      ? "text-gray-900 hover:underline"
                      : "text-indigo-900"
                  }`
                }
              >
                Register
              </NavLink>
            </li>

            <li>
              {isLoggedIn ? 
                <button
                  className="duration-200 font-bold text-sm p-2 text-indigo-900"
                  onClick={logout}
                  >
                  Logout
                </button>
               : 
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `duration-200 font-bold text-sm p-2 ${
                      isActive
                        ? "text-gray-900 hover:underline"
                        : "text-indigo-900"
                    }`
                  }
                >
                  Login
                </NavLink>
              }
            </li>

            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `duration-200 font-bold text-sm p-2 ${
                    isActive
                      ? "text-gray-900 hover:underline"
                      : "text-indigo-900"
                  }`
                }
              >
                Profile
              </NavLink>
            </li>

            <li>
              {isLoggedIn ? (
                <NavLink
                  to="/AddProduct"
                  className={({ isActive }) =>
                    `duration-200 font-bold text-sm p-2 ${
                      isActive
                        ? "text-gray-900 hover:underline"
                        : "text-indigo-900"
                    }`
                  }
                >
                  Add Product
                </NavLink>
              ) : (
                ""
              )}
            </li>

            <li>
              
                <NavLink
                  to="/store"
                  className={({ isActive }) =>
                    `duration-200 font-bold text-sm p-2 ${
                      isActive
                        ? "text-gray-900 hover:underline"
                        : "text-indigo-900"
                    }`
                  }
                >
                 Store
                </NavLink>
              
            </li>

          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
