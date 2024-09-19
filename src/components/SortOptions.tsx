import React from "react";

const SortOptions = ({ sortOrder, setSortOrder }: any) => {
  return (
    <div className="mb-4">
      <button
        onClick={() => setSortOrder("asc")}
        className={`mr-2 p-2 rounded-lg bg-background border transition-all delay-30 ease-in-out duration-150 ${
          sortOrder === "asc"
            ? "border-swyellow text-swyellow"
            : "border-gray-600 text-gray-300 hover:border-swyellow hover:text-swyellow hover:opacity-70"
        }`}
      >
        Sort Ascending
      </button>
      <button
        onClick={() => setSortOrder("desc")}
        className={`p-2 rounded-lg bg-background border transition-all delay-30 ease-in-out duration-150 ${
          sortOrder === "desc"
            ? "border-swyellow text-swyellow"
            : "border-gray-600 text-gray-300 hover:border-swyellow hover:text-swyellow hover:opacity-70"
        }`}
      >
        Sort Descending
      </button>
    </div>
  );
};

export default SortOptions;
