"use client";
import { supabase } from "@/lib/supabaseClient";
import { Bookmark, ChevronDown, ListFilter, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { LawItem } from "../laws/LawsItem";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";

interface LawProps {
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

export const SearchBody = () => {
  const [laws, setLaws] = useState<LawProps[]>([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("laws").select("*");
        if (error) {
          setError(error as any);
        } else {
          setLaws(data);
        }
      } catch (error: any) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center p-6">
        <div className="relative flex items-center rounded-md px-4 py-2 bg-white border-2 shadow shadow-[#FBFAF5] border-[#f6f4ea] w-[580px] h-[48px]">
          <SearchIcon
            className="w-6 h-6 mr-3 text-gray-400"
            strokeWidth={1.5}
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent text-gray-700 focus:outline-none"
          />
        </div>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type to search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Laws">
              {laws.map((law) => (
                <div
                  key={law._id}
                  onClick={() => {
                    console.log("click");
                    router.push(`/law/${law._id}`);
                    setOpen(false);
                  }}>
                  <CommandItem>{law.case_name}</CommandItem>
                </div>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
      <div className="w-full flex flex-col">
        <div className="flex justify-center mb-4 items-center gap-2 text-rose-600 underline decoration-solid decoration-4 decoration-red-500 underline-offset-[20px]">
          <SearchIcon size={16} />
          <p>All Results</p>
        </div>
        <div className="flex items-center justify-between border-y-2 border-gray-100 py-2">
          <div className="pl-6 flex items-center">
            <div className="flex items-center gap-1 text-rose-600 border border-rose-600 rounded-full px-4 py-1 cursor-pointer">
              <ListFilter size={16} />
              <span className="text-sm">FILTERS</span>
            </div>
          </div>
          <div className="flex gap-10">
            <span>871 results for housing and construction</span>
            <div className="flex text-[#0075AD] text-sm items-center gap-2 cursor-pointer">
              <Bookmark size={16} />
              <span>Save Search</span>
            </div>
          </div>
          <div className="pr-6 flex items-center">
            <div className="flex items-center bg-gray-100 text-rose-400 font-semibold text-xs rounded-full px-4 py-1 gap-2 cursor-pointer">
              <span>Most Relevant</span>
              <ChevronDown size={16} color="black" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex px-56 pt-8">
        <div className="flex flex-wrap">
          {laws.map((law) => (
            <LawItem law={law} key={law._id} />
          ))}
        </div>
      </div>
    </>
  );
};
