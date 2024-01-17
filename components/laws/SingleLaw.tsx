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
  const [error, setError] = useState(null);
  const [law, setLaw] = useState<LawDataProps | null>(null);

  const params = useParams();

  useEffect(() => {
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

    fetchData();
  }, []);

  return (
    <div className="py-10 px-20">
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none flex">
          <FolderClosed size={20} /> <ChevronDown size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Save to:</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <FolderClosed size={15} /> Crimes
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FolderClosed size={15} /> Household
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FolderClosed size={15} /> Consumer
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Create a Folder</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
