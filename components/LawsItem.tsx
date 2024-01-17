import { FaArrowTrendUp } from "react-icons/fa6";
import { ScrollText } from "lucide-react";
import { TbBlockquote, TbBookmarkPlus } from "react-icons/tb";
import { Separator } from "./ui/separator";

interface Law {
  doc_type: string;
  case_no: string;
  date: string;
  resultText: string;
  cited_in: number;
  cited_by: number;
  case_name: string;
}

export const LawItem = ({ law }: { law: Law }) => {
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
      <div className="w-3/4">
        <h1 className="text-[#4667CA] font-semibold">{law.case_name}</h1>
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
            <TbBookmarkPlus />
          </div>
        </div>
      </div>
      <Separator className="my-4" />
    </>
  );
};
