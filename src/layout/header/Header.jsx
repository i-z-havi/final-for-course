import {
  AppBar,
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

export default function Header() {
  const { user } = useLocalStorageUser();
  const nav = useNavigate();

  return (
    <AppBar sx={{ position: "sticky" }}>
      <Toolbar sx={{ justifyContent:'space-between'}}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        {user ? (
          <>
            <Typography>Welcome, {user.firstName}</Typography>
            <Button color="inherit">Log Out</Button>
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
