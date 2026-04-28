import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import SearchBar from "./SearchBar";
import React, { useState } from "react";
import CartDrawer from "../Layout/CartDrawer";
import { HiMiniXMark } from "react-icons/hi2";

function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <>
      <nav className="container mx-auto py-4 px-6 flex justify-between items-center">
        {/* Left Logo */}
        <Link to="/" className="text-2xl font-medium">
          Rabbit
        </Link>
        {/* Center nav Items */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm uppercase font-medium"
          >
            Men
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm uppercase font-medium"
          >
            Women
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm uppercase font-medium"
          >
            Top Wear
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm uppercase font-medium"
          >
            Bottom Wear
          </Link>
        </div>
        {/* Right Icons */}
        <div className="flex items-center space-x-6">
          <Link to="/profile" className="hover:text-black">
            <FaRegUserCircle className="h-6 w-6 text-gray-700" />
          </Link>
          <button
            type="button"
            onClick={toggleDrawer}
            className="relative hover:text-black"
          >
            <FaShoppingCart className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-1 bg-[#ea2e0e] text-white text-xs rounded-full px-2 py-0.5">
              5
            </span>
          </button>
          {/* Search Icon */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>

          <button
            onClick={toggleMobileDrawer}
            className="md:hidden hover:text-black"
          >
            <IoMdMenu className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>
      <CartDrawer toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
      {/* Mobile Navigation menu */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-[65%] bg-white shadow-lg transform transition-transform duration-300 z-50 ${mobileDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button type="button" onClick={toggleMobileDrawer}>
            <HiMiniXMark className="w-6 h-6" />
          </button>
        </div>
        <div className="px-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          {/* Nav Items */}
          <nav className="space-y-4">
            <Link
              to="#"
              onClick={toggleMobileDrawer}
              className="text-gray-600 hover:text-black block"
            >
              Men
            </Link>
            <Link
              to="#"
              onClick={toggleMobileDrawer}
              className="text-gray-600 hover:text-black block"
            >
              Women
            </Link>
            <Link
              to="#"
              onClick={toggleMobileDrawer}
              className="text-gray-600 hover:text-black block"
            >
              Top Wear
            </Link>
            <Link
              to="#"
              onClick={toggleMobileDrawer}
              className="text-gray-600 hover:text-black block"
            >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

export default NavBar;
