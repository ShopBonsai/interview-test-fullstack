import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import { useState } from "../state";

export const NavHeader = () => {
  const [state, dispatch] = useState();

  return (
    <div className="h-16 bg-white sticky border-b border-gray-300 top-0 flex items-center justify-between px-6">
      <Link to="/">
        <img src={logo} width="32" />
      </Link>

      <Link to="/products">
        <div className="pl-10 text-gray-500 cursor-pointer hover:text-black">
          Merchants
        </div>
      </Link>

      <div className="flex-1" />

      {state.user ? (
        <div
          className="pr-10 text-gray-500 cursor-pointer hover:text-black"
          onClick={() => dispatch({ type: "CLEAR_JWT" })}
        >
          Sign Out
        </div>
      ) : (
        <>
          <Link to="/login">
            <div className="pr-10 text-gray-500 cursor-pointer hover:text-black">
              Sign In
            </div>
          </Link>

          <Link to="/signup">
            <div className="pr-10 text-gray-500 cursor-pointer hover:text-black">
              Sign Up
            </div>
          </Link>
        </>
      )}
    </div>
  );
};
