import { Bookmark, ChevronDown, ListFilter, SearchIcon } from "lucide-react";

export const SearchHeader = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-center mb-4 items-center gap-2 text-rose-600">
        <SearchIcon size={16} />
        <p> All Results</p>
      </div>
      <div className="flex items-center justify-between border-y-2 border-gray-100 py-2">
        <div className="pl-6 flex items-center">
          <div className="flex items-center gap-1 text-rose-600 border border-rose-600 rounded-full px-4 py-1 cursor-pointer">
            <ListFilter size={16} />
            <span className="text-sm">FILTERS</span>
          </div>
        </div>
        <div className="flex gap-10">
          <span>871 results for housing and construction</span>
          <div className="flex text-[#0075AD] text-sm items-center gap-2 cursor-pointer">
            <Bookmark size={16} />
            <span>Save Search</span>
          </div>
        </div>
        <div className="pr-6 flex items-center">
          <div className="flex items-center bg-gray-100 text-rose-400 font-semibold text-xs rounded-full px-4 py-1 gap-2 cursor-pointer">
            <span>Most Relevant</span>
            <ChevronDown size={16} color="black" />
          </div>
        </div>
      </div>
    </div>
  );
};
