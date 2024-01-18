"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
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
import { supabase } from "@/lib/supabaseClient";

export default function DataTable(data: any) {
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [renameId, setRenameId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [tableData, setTableData] = useState(data.data);

  const router = useRouter();

  const handleRename = () => {
    const updateData = async (renameId: string, newName: string) => {
      const { data, error } = await supabase
        .from("folders")
        .update({ name: newName })
        .eq("id", renameId);

      if (error) {
        console.error("Error updating data:", error);
      } else {
        console.log("Data updated successfully:", data);
      }
    };
    updateData(renameId, newName);

    const updatedData = tableData.map((item: any) => {
      if (item.id === renameId) {
        return { ...item, name: newName };
      }
      return item;
    });
    setTableData(updatedData);

    setIsRenameDialogOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 450 },
    { field: "client", headerName: "Client", width: 150 },
    {
      field: "type",
      headerName: "Type",
      type: "number",
      width: 120,
    },
    {
      field: "updated_at",
      headerName: "Last Modified",
      width: 200,
    },
    {
      field: "Options",
      // headerName: "Option",
      width: 100,
      renderCell: (params) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none flex">
              <ChevronDown size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  setRenameId(params.row.id);
                  setIsRenameDialogOpen(true);
                }}>
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDeleteId(params.row.id);
                }}>
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Add a Note</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleCellClick = (params: any) => {
    if (params.field === "name") {
      const folderId = params.row.id;
      router.push(`/library/${folderId}`);
    }
  };

  return (
    <>
      <div style={{ height: 640, width: "100%" }}>
        <DataGrid
          rows={data.data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          onCellClick={(params) => {
            handleCellClick(params);
          }}
        />
      </div>
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Rename Folder"
              className="mt-5"
            />
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleRename}>Save</Button>
            <Button onClick={() => setIsRenameDialogOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
