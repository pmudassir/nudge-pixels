"use client";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const Folder = () => {
  const router = useRouter();

  return (
    <div className="pl-20 py-10">
      <div className="flex gap-3">
        <MoveLeft
          className="cursor-pointer hover:opacity-50"
          onClick={() => router.back()}
        />
        <p>Folder Name</p>
      </div>
      <div>Content</div>
    </div>
  );
};
