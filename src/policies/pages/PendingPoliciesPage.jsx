import { Button, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import usePolicy from "../hooks/usePolicy";
import LoadSpinner from "../../components/LoadSpinner";
import { DataGrid } from "@mui/x-data-grid";

export default function PendingPoliciesPage() {
  const { isLoading, handleGetPendingPolicies, handleAllowPolicy } = usePolicy();
  const [selectedRows, setSelectedRows] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await handleGetPendingPolicies();
      if (data != null) {
        setRows(data);
      }
    }
    getData();
  }, [handleGetPendingPolicies]);

  const deleteUsers = async () => {
    for (const element of selectedRows) {
      await handleAllowPolicy(element);
    }
    window.location.reload();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "creatorId", headerName: "Creator Id", width: 300 },
    { field: "title", headerName: "Title", width: 130 },
    { field: "subtitle", headerName: "Subtitle", width: 130 },
    { field: "description", headerName: "Description", width: 130 },
    { field: "details", headerName: "Details", width: 100 },
    { field: "signatures", headerName: "Signatures", width: 100 },
  ];

  return (
    <div>
      <Typography variant="h1" align="center">
        Petitions
      </Typography>
      <Divider />
      <>
        {!isLoading ? (
          <>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                minwidth: "25vw",
                pt: "3%",
                height: "75vh",
              }}
            >
              <DataGrid
                columns={columns}
                rows={rows}
                sx={{ minwidth: "25vw", width: "75%" }}
                onRowSelectionModelChange={(data) => {
                  setSelectedRows(data);
                }}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
              ></DataGrid>
              <Button
                variant="contained"
                sx={{ margin: 1 }}
                disabled={selectedRows.length === 0}
                onClick={() => deleteUsers(selectedRows)}
              >
                Allow
              </Button>
            </Grid>
          </>
        ) : (
          <LoadSpinner />
        )}
      </>
    </div>
  );
}
