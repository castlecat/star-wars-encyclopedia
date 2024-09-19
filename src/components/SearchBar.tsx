import { useState } from "react";

const SearchBar = ({ onSearch }: any) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: any) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative mb-4 group">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 z-10">
        <svg
          className="w-4 h-4 text-gray-300 transition-opacity delay-30 duration-150 ease-in-out group-hover:opacity-70"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search for a character..."
        value={query}
        onChange={handleChange}
        className="peer block w-full p-4 ps-10 text-sm border rounded-lg group-hover:opacity-70 border-swyellow bg-background placeholder-gray-300 text-white outline-none transition-opacity duration-150 ease-in-out"
      />
    </div>
  );
};

export default SearchBar;
