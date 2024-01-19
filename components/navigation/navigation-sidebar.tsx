"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { History, LibraryBig, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const NavigationSidebar = () => {
  const [selected, setSelected] = useState(1);
  const router = useRouter();

  const handleClick = () => {
    setSelected(2);
    router.push("/library");
  };

  return (
    <div className="flex flex-col h-full bg-[#FBFAF5] w-full border-r-[0.5px] border-[#DCD6D9]">
      <div
        className="mt-5 items-center flex flex-col gap-1 justify-center cursor-pointer"
        onClick={() => router.push("/")}>
        <Image src={"/logo.png"} alt="logo" width={50} height={50} />
        <p className="bg-[#121217] text-white p-1 text-[8px] rounded-sm">
          JUDGEMENT
        </p>
      </div>
      <div className="mt-5 flex flex-col items-center gap-2">
        <div
          className={cn(
            selected === 1 ? "bg-[#EDEDE8] text-black" : "text-gray-500",
            "flex flex-col items-center text-xs py-3 px-1.5 rounded cursor-pointer"
          )}
          onClick={() => {
            setSelected(1);
            router.push("/");
          }}>
          <Search strokeWidth={1.25} />
          <p>Search</p>
        </div>
        <div
          className={cn(
            selected === 2 ? "bg-[#EDEDE8] text-black" : "text-gray-500",
            "flex flex-col items-center text-xs py-3 px-1.5 rounded cursor-pointer"
          )}
          onClick={handleClick}>
          <LibraryBig strokeWidth={1.25} />
          <p>Library</p>
        </div>
        <div
          className={cn(
            selected === 3 ? "bg-[#EDEDE8] text-black" : "text-gray-500",
            "flex flex-col items-center text-xs py-3 px-1.5 rounded cursor-pointer"
          )}
          onClick={() => setSelected(3)}>
          <History strokeWidth={1.25} />
          <p>History</p>
        </div>
      </div>
      <div className="mt-auto pb-3 flex items-center flex-col gap-y-4">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  );
};
