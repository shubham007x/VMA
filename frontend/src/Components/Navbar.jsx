import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./Context/Auth"; // Import AuthContext

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state, logout } = useContext(AuthContext); // Access state, login, and logout
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout(); // Logout function will set state to false
    setTimeout(() => {
      navigate("/"); // Redirect to home or login after logging out
    }, 5000);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Sierra
          </span>
        </a>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {state && (
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 px-3 ${
                      isActive ? "text-white bg-blue-700" : "text-gray-900"
                    } rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500`
                  }
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
            )}
            {!state && (
              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `block py-2 px-3 ${
                      isActive ? "text-white bg-blue-700" : "text-gray-900"
                    } rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500`
                  }
                >
                  Signup
                </NavLink>
              </li>
            )}
            {state ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="block py-2 px-3 text-gray-900 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `block py-2 px-3 ${
                      isActive ? "text-white bg-blue-700" : "text-gray-900"
                    } rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500`
                  }
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
