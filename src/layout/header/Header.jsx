import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocalStorageUser } from "../../users/providers/UserProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import AvatarMenu from "./AvatarMenu";

export default function Header() {
  const { user } = useLocalStorageUser();
  const nav = useNavigate();


  return (
    <AppBar sx={{ position: "sticky" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* left navbar */}
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography sx={{ mt: "15%" }}>test</Typography>
        </Box>
        {/* split into center and right navbar */}
        {user ? (
          <>
            <Typography>Welcome, {user.firstName}</Typography>
            <AvatarMenu />
          </>
        ) : (
          <Button color="inherit" onClick={() => nav(ROUTES.LOGIN_PAGE)}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
