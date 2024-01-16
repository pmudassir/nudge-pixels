import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const MainHome = () => {
  return (
    <div className="h-full">
      <div className="md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
    </div>
  );
};

export default MainHome;
