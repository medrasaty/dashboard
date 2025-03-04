"use client";
import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import Link from "next/link";
import { useSchoolUsers } from "../queries";

const columns: GridColDef[] = [
  {
    field: "full_name",
    headerName: "Full name",
    flex: 1.5,
    minWidth: 200,
    renderCell: (props: GridRenderCellParams) => {
      const userId = props.row["id"];
      return (
        <Link
          style={{ color: "lightskyblue", textDecoration: "underline" }}
          href={`/dashboard/users/${userId}`}
        >
          {props.value}
        </Link>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1.5,
    minWidth: 200,
  },
  {
    field: "type",
    headerName: "Type",
    flex: 1,
    minWidth: 100,
    renderCell: (props: any) => {
      const type = props.value;
      return (
        <Chip
          label={type}
          color={type == "STUDENT" ? "info" : "success"}
          variant="outlined"
        />
      );
    },
  },
];

export default function UsersList() {
  const query = useSchoolUsers();

  return (
    <DataGrid
      checkboxSelection
      rows={query.data ?? []}
      disableRowSelectionOnClick
      columns={columns}
      loading={query.isPending}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      density="standard"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: "outlined",
              size: "small",
            },
            columnInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            operatorInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: "outlined",
                size: "small",
              },
            },
          },
        },
      }}
    />
  );
}
