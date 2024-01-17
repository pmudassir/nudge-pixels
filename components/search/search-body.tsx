"use client";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { LawItem } from "../LawsItem";

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
    <div className="flex px-56 pt-8">
      <div className="flex flex-wrap">
        {laws.map((law) => (
          <LawItem law={law} key={law._id} />
        ))}
      </div>
    </div>
  );
};
