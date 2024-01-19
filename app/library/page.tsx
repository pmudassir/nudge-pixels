import { LibraryNav } from "@/components/library/library-nav";
import { MyFolders } from "@/components/library/my-folders";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const Library = () => {
  return (
    <div className="h-full">
      <div className="md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <div className="md:pl-[72px]">
        <LibraryNav />
        <MyFolders />
      </div>
    </div>
  );
};

export default Library;
