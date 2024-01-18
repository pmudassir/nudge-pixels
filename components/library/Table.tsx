"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";

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
];

export default function DataTable(data: any) {
  const router = useRouter();

  const handleRowClick = (params: any) => {
    const folderId = params.row.id;
    router.push(`/library/${folderId}`);
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
        onRowClick={(params) => {
          handleRowClick(params);
        }}
      />
    </div>
  );
}
