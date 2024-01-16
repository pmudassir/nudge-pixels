import { SearchIcon } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="w-full flex items-center justify-center p-6">
      <div className="relative flex items-center rounded-md px-4 py-2 bg-white border-2 shadow shadow-[#FBFAF5] border-[#f6f4ea] w-[580px] h-[48px]">
        <SearchIcon className="w-6 h-6 mr-3 text-gray-400" strokeWidth={1.5} />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-transparent text-gray-700 focus:outline-none"
        />
      </div>
    </div>
  );
};


// FBFAF5