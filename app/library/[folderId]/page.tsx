import { Folder } from "@/components/folder/folder";
import { LibraryNav } from "@/components/library/library-nav";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const FolderPage = () => {
  return (
    <div className="h-full">
      <div className="md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <div className="md:pl-[72px]">
        <LibraryNav />
        <Folder />
      </div>
    </div>
  );
};

export default FolderPage;
