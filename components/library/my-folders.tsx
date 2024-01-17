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
import { DataTableDemo } from "./Table";

export const MyFolders = () => {
  return (
    <div className="pl-20 py-6">
      <div className="text-sm flex items-center gap-3">
        <p>My Folders</p>
        <Dialog>
          <DialogTrigger>
            <FolderPlus size={16} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
              <DialogDescription>
                <Input type="text" placeholder="Folder Name" className="my-3" />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="submit">Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col gap-3 mr-12 mt-6">
        <div className="p-3">No Folders</div>
        {/* Table sample */}

        <DataTableDemo />

        {/* Table sample end */}
      </div>
    </div>
  );
};
