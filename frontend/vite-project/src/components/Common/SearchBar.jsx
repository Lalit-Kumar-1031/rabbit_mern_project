import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { HiMiniXMark } from "react-icons/hi2";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const handleSearchToggle = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search ==>", searchQuery);
    setIsSearchBarOpen(false);
  };

  return (
    <div
      className={`flex items-center justify-center transition-all duration-300 ${isSearchBarOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"}`}
    >
      {isSearchBarOpen ? (
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex items-center justify-center w-full"
        >
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              className="bg-gray-100 px-4 py-2 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <IoSearchOutline className="h-6 w-6" />
            </button>
          </div>
          <button
            type="button"
            onClick={handleSearchToggle}
            className="absolute right-4 top-1/2 transform -translate-1/2 text-gray-600 hover:text-gray-800"
          >
            <HiMiniXMark className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <IoSearchOutline className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
