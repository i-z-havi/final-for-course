import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { useLocalStorageUser } from "../../users/providers/UserProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import useUserHook from "../../users/hooks/useUserHook";

export default function Header() {
  const { user } = useLocalStorageUser();
  const { handleLogout } = useUserHook();
  const nav = useNavigate();


  return (
    <AppBar sx={{ position: "sticky" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* left navbar */}
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{ mt: "15%" }}>test</Typography>
        </Box>
        {/* split into center and right navbar */}
        {user ? (
          <>
            <Typography>Welcome, {user.firstName}</Typography>
            <Button
              color="inherit"
              onClick={() => {
                handleLogout();
              }}
            >
              Log Out
            </Button>
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
