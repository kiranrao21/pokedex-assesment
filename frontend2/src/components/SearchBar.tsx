interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

import React, { useState } from "react";

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [value, setValue] = useState("");
  return (
    <div className="sticky top-0 z-10 bg-white p-4">
      <div className="max-w-3xl mx-auto flex items-center gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              onSearch(e.target.value);
            }}
            placeholder="Pokemon Name"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-gray-400 transition-colors"
          />
        </div>
        <div className="bg-yellow-400 px-4 py-2 rounded-lg font-medium text-white">
          Search
        </div>
      </div>
    </div>
  );
};
