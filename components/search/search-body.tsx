import { ScrollText } from "lucide-react";
import { TbBlockquote, TbBookmarkPlus } from "react-icons/tb";
import { FaArrowTrendUp } from "react-icons/fa6";

export const SearchBody = () => {
  return (
    <div className="flex px-56 pt-8">
      <div className="w-1/4">
        <div className="flex items-center text-xs gap-1 text-rose-600">
          <ScrollText size={16} />
          <p>ACT</p>
        </div>
        <div className="flex flex-col mt-2 text-sm">
          <p>Consumer protection art</p>
          <p className="text-gray-500">Sep 19, 1969</p>
        </div>
      </div>
      <div className="w-3/4">
        <h1 className="text-[#4667CA] font-semibold">
          D.L.F. Housing & Construction ... vs Sarup Singh And Others
        </h1>
        <p className="text-gray-600 font-light text-sm mt-2">
          ... population. The court reasoned, however, that under our decision
          in James v. Valtierra, 402 U.S. 137, 91 S.Ct. 1331, 28 L.Ed.2d 678
          (1971), such a disparity in racial impact alone does not call for
          strict scrutiny of a municipalitys decision that prevents the
          construction of the low-cost housing.5 ...
        </p>
        <div className="flex justify-between mt-4">
          <div className="flex gap-4">
            <div className="flex items-center text-sm gap-2">
              <TbBlockquote />0 Cited Here
            </div>
            <div className="flex items-center text-sm gap-2">
              <FaArrowTrendUp /> 90 Cited by
            </div>
          </div>
          <div className="cursor-pointer">
            <TbBookmarkPlus />
          </div>
        </div>
      </div>
    </div>
  );
};
