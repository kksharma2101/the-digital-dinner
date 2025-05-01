import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/Auth.js";
import { toast } from "react-hot-toast";
import { useCart } from "../../context/cart.js";
import { Badge } from "antd";

const Header = () => {
  const [cart] = useCart();
  const [auth, setAuth] = useAuth();
  const [menuActive, setMenuActive] = useState(false);
  const [userDashboard, setUserDashboard] = useState(false);

  // handle Logout
  const handleLogout = async () => {
    setAuth({
      ...auth,
      user: null,
    });
    localStorage.removeItem("auth");
    toast.success("User logout successfully");
  };

  // handleNabvar
  const handleMenuList = () => {
    setMenuActive(!menuActive);
  };

  // handle user dashboard
  const handleUserDashboard = () => {
    setUserDashboard(!userDashboard);
  };

  return (
    <>
      <nav className="w-full flex justify-between items-center py-2 bg-[#000b10] h-20 z-50">
        <div className="w-fit pl-5">
          <NavLink to="/">
            <h1 className="font-bold text-center rounded-full px-2 py1 bg-white text-black">
              k~Chef
            </h1>
          </NavLink>
        </div>

        <div className="md:hidden mr-5 cursor-pointer" onClick={handleMenuList}>
          <div className="w-8 rounded-sm h-1 bg-white"></div>
          <div className="w-8 rounded-sm h-1 bg-white my-2"></div>
          <div className="w-8 rounded-sm h-1 bg-white"></div>
        </div>

        <div
          className={
            !menuActive
              ? "hidden md:flex text-white text-lg font-bold pr-5"
              : "md:hidden flex justify-center items-center top-[80px] bg-black w-full p-5 text-white absolute z-50 text-lg font-bold"
          }
        >
          <ul className="flex justify-between items-center gap-5 list-none ">
            <li className="hover:text-blue-400 transition duration-300 ease-in-out">
              <Link to="/">Home</Link>
            </li>

            {!auth?.user ? (
              <>
                <li className="hover:text-blue-400 transition duration-300 ease-in-out">
                  <NavLink to="/register">Register</NavLink>
                </li>
                <li className="hover:text-blue-400 transition duration-300 ease-in-out">
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="text-white hover:text-blue-400 transition duration-300 ease-in-out">
                  <p onClick={handleUserDashboard} className="cursor-pointer">
                    {auth?.user?.name}
                  </p>
                  {userDashboard && (
                    <>
                      <ul
                        className={
                          !menuActive
                            ? "absolute top-15 bg-white text-black p-5 rounded-md border right-1"
                            : "absolute  bg-white text-black p-5 rounded-md border "
                        }
                      >
                        <li>
                          <NavLink
                            to={`/dashboard/${
                              auth?.user?.role == "admin" ? "admin" : "user"
                            }`}
                            className="dropdown-item hover:text-blue-400 transition duration-300 ease-in-out"
                          >
                            Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={handleLogout}
                            to="/login"
                            className="dropdown-item hover:text-blue-400 transition duration-300 ease-in-out"
                          >
                            Logout
                          </NavLink>
                        </li>
                      </ul>
                    </>
                  )}
                </li>
              </>
            )}

            <li>
              <Badge count={cart?.length} showZero>
                <NavLink
                  to="/cart"
                  className="text-white text-lg font-bold hover:text-blue-400 transition duration-300 ease-in-out"
                >
                  Cart
                </NavLink>
              </Badge>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
