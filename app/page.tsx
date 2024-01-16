import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col h-full bg-[#FBFAF5] w-20 border-r-[0.5px] border-[#DCD6D9]">
      <div className="mt-5 items-center flex flex-col gap-1 justify-center">
        <Image src={"/logo.png"} alt="logo" width={50} height={50} />
        <p className="bg-[#121217] text-white p-1 text-[8px] rounded-sm">JUDGEMENT</p>
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
}
