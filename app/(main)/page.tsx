import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { SearchBody } from "@/components/search/search-body";
import { SearchHeader } from "@/components/search/search-header";
import { SearchBar } from "@/components/search/searchbar";

const MainHome = () => {
  return (
    <div className="h-full">
      <div className="md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <div className="md:pl-[72px]">
        <SearchBar />
        <SearchHeader />
        {/* <SearchBody /> */}
      </div>
    </div>
  );
};

export default MainHome;
