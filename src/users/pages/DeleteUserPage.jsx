import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import useUserHook from "../hooks/useUserHook";
import LoadSpinner from "../../components/LoadSpinner";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { useLocalStorageUser } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";

export default function DeleteUserPage() {
  const { loading, handleGetUsers, handleDeleteUser, handleLogout } =
    useUserHook();
  const { user } = useLocalStorageUser();
  const [selectedRows, setSelectedRows] = useState([]);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const data = await handleGetUsers();
      if (data != null) {
        setRows(data);
      }
    }
    getData();
  }, [handleGetUsers]);

  const deleteUsers = async () => {
    if (selectedRows.includes(user.id)) {
      if (window.confirm("You are about to delete yourself! Are you sure?")) {
        for (const element of selectedRows) {
          await handleDeleteUser(element);
        }
        handleLogout();
      }
    } else {
      for (const element of selectedRows) {
        await handleDeleteUser(element);
      }
      window.location.reload();
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "email",
      headerName: "Email",
      width: 130,
    },
  ];

  if (!user || user.isAdmin === false) return navigate(ROUTES.ROOT);

  return (
    <>
      <Typography variant="h1" textAlign='center'>Delete Users</Typography>
      <Divider />
      {!loading ? (
        <>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              minwidth: "25vw",
              pt: "3%",
              height: 500,
            }}
          >
            <DataGrid
              columns={columns}
              sx={{ minwidth: "25vw", width: "75%" }}
              rows={rows}
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
              onClick={() => deleteUsers(selectedRows)}
              disabled={selectedRows.length === 0}
            >
              Delete
            </Button>
          </Grid>
        </>
      ) : (
        <LoadSpinner />
      )}
    </>
  );
}
