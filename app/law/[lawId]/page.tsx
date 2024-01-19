import { SingleLaw } from "@/components/laws/SingleLaw";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const LawPage = () => {
  return (
    <div className="h-full">
      <div className="md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <div className="md:pl-[72px]">
        <SingleLaw />
      </div>
    </div>
  );
};

export default LawPage;
