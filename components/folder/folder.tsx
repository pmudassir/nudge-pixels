"use client";
import { supabase } from "@/lib/supabaseClient";
import { MoveLeft, ScrollText } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Law {
  doc_type: string;
  case_no: string;
  date: string;
  case_name: string;
  _id: string;
}

export const Folder = () => {
  const [law, setLaw] = useState<Law | null>();
  const router = useRouter();
  const params = useParams();

  const getLaws = async () => {
    const { data, error } = await supabase
      .from("folders")
      .select("*")
      .eq("id", params.folderId);

    if (error) {
      console.log(error);
    } else {
      const id = data[0].law_id;
      getLaw(id);
    }
  };

  const getLaw = async (id: string) => {
    const { data, error } = await supabase
      .from("laws")
      .select("*")
      .eq("_id", id);

    if (error) {
      console.log(error);
    } else {
      console.log(data[0]);
      setLaw(data[0]);
      console.log(law);
    }
  };

  useEffect(() => {
    getLaws();
  }, []);

  return (
    <div className="pl-20 py-10">
      <div className="flex gap-3">
        <MoveLeft
          className="cursor-pointer hover:opacity-50"
          onClick={() => router.back()}
        />
        <p>Saved Law:</p>
      </div>
      {law && (
        <div className="mt-5 flex flex-col items-center gap-5">
          <div className="cursor-pointer">
            <h1
              className="text-[#4667CA] font-semibold hover:underline"
              onClick={() => router.push(`/law/${law._id}`)}>
              {law.case_name}
            </h1>
          </div>
          <div>
            <div className="flex items-center text-xs gap-1 text-rose-600">
              <ScrollText size={16} />
              <p>{law.doc_type}</p>
            </div>
            <div className="flex flex-col mt-2 text-sm">
              <p>{law.case_no}</p>
              <p className="text-gray-500">{law.date.split("T")[0]}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
