"use client";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

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
          console.log(data);
          setLaw(data);
        }
      } catch (error: any) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return <div>{law?.resultText}</div>;
};
