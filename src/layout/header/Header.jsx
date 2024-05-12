import {
  AppBar,
  Button,
  IconButton,
  Toolbar
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";

export default function Header() {
  return (
      <AppBar sx={{ position:"sticky"}} >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
  );
}
