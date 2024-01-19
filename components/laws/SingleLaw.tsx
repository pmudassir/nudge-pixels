"use client";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  Eye,
  FolderClosed,
  Gavel,
  Info,
  Link,
  Quote,
  ScrollText,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { TbBlockquote } from "react-icons/tb";
import { FaArrowTrendUp } from "react-icons/fa6";
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

interface LawDataProps {
  id: number;
  _id: string;
  doc_type: string;
  url: string;
  case_no: string;
  case_name: string;
  case_info: {
    appellant: string;
    respondent: string;
  };
  date: string;
  counsels: string[];
  citations: number;
  corams: number;
  bench: string;
  cited_in: number;
  cited_by: number;
  result: string;
  court: {
    name: string;
  };
  status: number;
  view_count: number;
  resultText: string;
}

export const SingleLaw = () => {
  const [error, setError] = useState(false);
  const [law, setLaw] = useState<LawDataProps | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folders, setFolders] = useState<any[]>([]);

  const params = useParams();

  const handleAddLaw = async (id: any) => {
    try {
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
      addLawToFolder(law?._id ?? "", id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateFolder = async () => {
    try {
      if (folderName.length === 0) return;

      console.log(folderName);

      const { data, error } = await supabase.from("folders").insert({
        name: folderName,
        updated_at: new Date(),
        type: "Folder",
        client: "-None",
      });

      if (error) {
        setError(true);
      } else {
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

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("laws")
        .select("*")
        .eq("_id", params.lawId)
        .single();

      if (error) {
        setError(error as any);
      } else {
        setLaw(data);
      }
    } catch (error: any) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchFolders();
  }, [handleCreateFolder]);

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="py-10 px-20">
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none flex">
          <FolderClosed size={20} /> <ChevronDown size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Save to:</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {folders.map((folder) => (
            <DropdownMenuItem
              key={folder.id}
              onClick={() => handleAddLaw(folder.id)}>
              <FolderClosed className="mr-2" size={15} /> {folder.name}
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
      <div>
        <div className="flex items-center gap-1 text-rose-600 mt-6 mb-2">
          <ScrollText size={16} />
          <p>{law?.doc_type}</p>
        </div>
        <h1 className="text-[#4667CA] font-semibold text-2xl">
          {law?.case_name}
        </h1>
        <div className="flex justify-between">
          <div className="flex items-center text-sm gap-1">
            <p>{law?.court.name}</p>
            <Separator orientation="vertical" className="h-4 bg-slate-400" />
            <p>{law?.date.split("T")[0]}</p>
            <Separator orientation="vertical" className="h-4 bg-slate-400" />
            <p>{law?.case_no}</p>
          </div>
          <div className="flex items-center gap-1 hover:underline text-blue-600 cursor-pointer">
            <Link size={16} />
            {law?.url}
          </div>
        </div>
        <div className="mt-4">
          <div className="flex text-gray-400 text-xs items-center gap-1 mb-2">
            <Eye size={16} /> {law?.view_count} Views
          </div>
          <p>{law?.resultText}</p>
        </div>
        <div className="flex justify-between gap-1 mt-6 mb-2 text-slate-500">
          <div className="flex flex-col ">
            <div className="flex text-sm gap-1 items-center">
              Case info: <Info size={14} />
            </div>
            <div className="flex flex-col">
              <div className="flex gap-1">
                <p>Appellant:</p>
                {law?.case_info.appellant}
              </div>
              <div className="flex gap-1">
                <p>Respondent:</p>
                {law?.case_info.respondent}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-sm">Counsels:</p>
            {law?.counsels.map((counsel, index) => (
              <p key={index}>{counsel}</p>
            ))}
          </div>
          <div className="flex flex-col">
            <p className="text-sm">Bench:</p>
            {law?.bench}
          </div>
          <div className="flex flex-col">
            <p className="text-sm">Status:</p>
            {law?.status}
          </div>
        </div>
        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <TbBlockquote /> {law?.cited_in} <p>Cited here</p>
          </div>
          <div className="flex items-center gap-1">
            <FaArrowTrendUp /> {law?.cited_by} <p>Cited by</p>
          </div>
          <div className="flex items-center gap-1">
            <User size={15} />
            {law?.corams} <p>Corams</p>
          </div>
          <div className="flex items-center gap-1">
            <Quote size={14} />
            {law?.citations} <p>Citations</p>
          </div>
          <div className="flex items-center gap-1">
            <Gavel size={16} />
            <p>Result:</p>
            {law?.result}
          </div>
        </div>
      </div>
    </div>
  );
};
