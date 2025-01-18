import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
// import { useAuth } from "../store/AuthContext";
import { MdOutlineShoppingCart } from "react-icons/md";

function Navbar() {
  // const { 
  //   isLoggedIn, 
  //   logout, 
  //   // refreshTokens, 
  //   // accessToken, 
  //   // getRefreshToken,
  //   cartCount
  //  } = useAuth();

  //  const handleLogout = () => {
  //   if(isLoggedIn){
  //     logout()
  //   }
  //  }
  

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
              
            </li>
            <li>
            <button
                  className="duration-200 font-bold text-sm p-2 text-indigo-900"
                  // onClick={()=>handleLogout()}
                  >
                  Logout
                </button>
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
              
            </li>

            <li className="flex items-center justify-center">
              <NavLink
                to="/AddToCart"
                className={({ isActive }) =>
                  `duration-200 font-bold text-sm p-2 ${
                    isActive
                      ? "text-gray-900 hover:underline"
                      : "text-indigo-900"
                  }`
                }
              >
                <div>
                <button className="text-3xl flex " >
                  <MdOutlineShoppingCart /> 
                  <p className="relative text-lg font-bold"  style={{top: -14}} >
                    
                  </p>
                </button>
                </div>
              </NavLink>
            </li>


          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
