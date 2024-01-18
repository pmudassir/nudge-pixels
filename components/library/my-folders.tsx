"use client";
import { FolderPlus } from "lucide-react";
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
import DataTable from "./Table";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export const MyFolders = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folders, setFolders] = useState<any[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

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

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from("folders").select("*");
      if (error) {
        setError(true);
        console.log(error);
      } else {
        setFolders(data);
        console.log("data fetched", data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="pl-20 py-6">
      <div className="text-sm flex items-center gap-3">
        <p>My Folders</p>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            <FolderPlus size={16} />
          </DialogTrigger>
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
      <div className="flex flex-col gap-3 mr-12 mt-6">
        {!folders ? (
          <div className="p-3">No Folders</div>
        ) : (
          <DataTable data={folders} />
        )}
      </div>
    </div>
  );
};
