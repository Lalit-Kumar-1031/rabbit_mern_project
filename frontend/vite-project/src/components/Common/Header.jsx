import React from "react";
import TopBar from "./TopBar";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <header className="border-b border-gray-200">
      {/* Top Bar */}
      <TopBar></TopBar>

      {/* NavBar */}
      <NavBar />
      {/* Cart Drawer */}
    </header>
  );
};

export default Header;
