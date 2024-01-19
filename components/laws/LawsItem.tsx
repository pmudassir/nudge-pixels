"use client";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FolderClosed, ScrollText } from "lucide-react";
import { TbBlockquote, TbBookmarkPlus } from "react-icons/tb";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Law {
  doc_type: string;
  case_no: string;
  date: string;
  resultText: string;
  cited_in: number;
  cited_by: number;
  case_name: string;
  _id: string;
}

export const LawItem = ({ law }: { law: Law }) => {
  const [error, setError] = useState(false);
  const [folders, setFolders] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");

  const router = useRouter();

  const lawId = law._id;

  const handleAddLaw = async (id: any) => {
    try {
      console.log("lawId:", lawId, "selectedFolder:", id);
      const addLawToFolder = async (lawId: string, id: any) => {
        const { error } = await supabase
          .from("folders")
          .update({
            law_id: lawId,
          })
          .eq("id", id);

        if (error) {
          console.error("Error adding law to folder:", error);
        } else {
          console.log("Law added to folder:", id);
        }
      };
      addLawToFolder(lawId, id);
    } catch (error) {
      console.log(error);
    } finally {
      setSelectedFolder("");
    }
  };

  const handleCreateFolder = async () => {
    try {
      if (folderName.length === 0) return;

      const { data, error } = await supabase.from("folders").insert({
        name: folderName,
        updated_at: new Date(),
        type: "Folder",
        client: "-None",
      });

      if (error) {
        setError(true);
      } else {
        fetchFolders();
        setFolderName("");
        setIsOpen(false);
      }
    } catch (error) {
      setError(true);
    }
  };

  const fetchFolders = async () => {
    try {
      const { data, error } = await supabase.from("folders").select("*");
      if (error) {
        setError(true);
        console.log(error);
      } else {
        setFolders(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <>
      <div className="w-1/4">
        <div className="flex items-center text-xs gap-1 text-rose-600">
          <ScrollText size={16} />
          <p>{law.doc_type}</p>
        </div>
        <div className="flex flex-col mt-2 text-sm">
          <p>{law.case_no}</p>
          <p className="text-gray-500">{law.date.split("T")[0]}</p>
        </div>
      </div>
      <div className="w-3/4 cursor-pointer">
        <h1
          className="text-[#4667CA] font-semibold hover:underline"
          onClick={() => router.push(`/law/${lawId}`)}>
          {law.case_name}
        </h1>
        <p className="text-gray-600 font-light text-sm mt-2">
          {law.resultText}
        </p>
        <div className="flex justify-between mt-4">
          <div className="flex gap-4">
            <div className="flex items-center text-sm gap-2">
              <TbBlockquote />
              {law.cited_in} Cited Here
            </div>
            <div className="flex items-center text-sm gap-2">
              <FaArrowTrendUp /> {law.cited_by} Cited by
            </div>
          </div>
          <div className="cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none flex">
                <TbBookmarkPlus />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Save to:</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {folders.map((folder, index) => (
                  <DropdownMenuItem
                    key={folder.id}
                    onClick={() => handleAddLaw(folder.id)}>
                    <FolderClosed
                      className="mr-2"
                      size={15}
                      onClick={() => setSelectedFolder(folder.id)}
                    />{" "}
                    {folder.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsOpen(true)}>
                  Create a Folder
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Folder</DialogTitle>
                  <DialogDescription>
                    <Input
                      type="text"
                      onChange={(e) => setFolderName(e.target.value)}
                      placeholder="Folder Name"
                      className="my-3"
                    />
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button type="submit" onClick={handleCreateFolder}>
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <Separator className="my-4" />
    </>
  );
};
