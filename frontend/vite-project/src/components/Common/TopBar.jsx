import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const TopBar = () => {
  return (
    <div className="bg-[#ea2e0e] text-white">
      <div className="container mx-auto py-3 px-4 flex justify-between items-center ">
        <div className=" hidden md:flex items-center space-x-4">
          <a href="#" className="hover:text-gray-300">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <FaInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <FaTwitter className="h-5 w-5" />
          </a>
        </div>
        <div className="text-sm text-center grow">
          We ship worldwide - Fast and reliable shipping
        </div>
        <div className="text-sm hidden md:block">
          <a href="tel:+919876543210" className="hover:text-gray-300">
            +91 9876543210
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
