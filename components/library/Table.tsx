"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

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
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Add a Note</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function DataTable(data: any) {
  const router = useRouter();

  const handleCellClick = (params: any) => {
    if (params.field === "name") {
      const folderId = params.row.id;
      router.push(`/library/${folderId}`);
    }
  };

  return (
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
  );
}
