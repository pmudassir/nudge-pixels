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
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [renameId, setRenameId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [tableData, setTableData] = useState(data.data);

  const router = useRouter();

  const handleRename = () => {
    const updateData = async (renameId: string, newName: string) => {
      const { error } = await supabase
        .from("folders")
        .update({ name: newName })
        .eq("id", renameId);

      if (error) {
        console.error("Error updating data:", error);
      } else {
        fetchData();
        setTableData(data);
      }
    };
    updateData(renameId, newName);

    setNewName("");
    setRenameId("");
    setIsRenameDialogOpen(false);
  };

  const handleDelete = () => {
    const deleteData = async (deleteId: string) => {
      const { error } = await supabase
        .from("folders")
        .delete()
        .eq("id", deleteId);

      if (error) {
        console.error("Error deleting data:", error);
      }
      fetchData();
      setTableData(data);
    };

    deleteData(deleteId);
    setDeleteId("");
    setIsDeleteDialogOpen(false);
  };

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from("folders").select("*");
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setTableData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tableData]);

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
                  setIsDeleteDialogOpen(true);
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
    {
      field: "note",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <p className="gap-2">{params.row.note}</p>
            {params.row.note !== null && (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none flex">
                  <ChevronDown size={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Edit Note</DropdownMenuItem>
                  <DropdownMenuItem>Delete Note</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </>
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
          rows={tableData}
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
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
