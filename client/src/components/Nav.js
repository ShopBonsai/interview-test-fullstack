import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

export const NavHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="h-16 bg-white sticky border-b border-gray-300 top-0 flex items-center justify-between px-6">
      <Link to="/">
        <img src={logo} width="32" />
      </Link>

      <div className="flex-1" />

      <Link to="/login">
        <div className="pr-10 text-gray-500 cursor-pointer hover:text-black">
          Sign In
        </div>
      </Link>

      <Link to="/signup">
        <div className="text-gray-500 cursor-pointer hover:text-black">
          Sign Up
        </div>
      </Link>
    </div>
  );
};
