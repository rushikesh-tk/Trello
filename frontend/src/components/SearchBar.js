import React from "react";
import InputField from "./InputField";

const SearchBar = () => {
  return (
    <div className="bg-white mb-2 m-2 rounded-md sm:flex  p-2 items-center sm:justify-between">
      <div className="flex items-center justify-center">
        <label
          htmlFor="email"
          className="block font-bold text-md text-gray-600 mr-2"
        >
          Search:
        </label>
        <input
          type="text"
          id="search"
          className="p-1 block w-full border border-gray-500 rounded-md focus:outline-none"
          placeholder="Search..."
        />
      </div>

      <div>Sort By</div>
    </div>
  );
};

export default SearchBar;
