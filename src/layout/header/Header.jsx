import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useLocalStorageUser } from "../../users/providers/UserProvider";
import { useNavigate } from "react-router-dom";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ROUTES from "../../routes/routesModel";
import AvatarMenu from "./AvatarMenu";
import { ColorModeContext } from "../../theme/MyThemeProvider";

export default function Header() {
  const { user } = useLocalStorageUser();
  const {colorMode,mode} = useContext(ColorModeContext);
  const nav = useNavigate();


  return (
    <AppBar sx={{ position: "sticky" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* left navbar */}
        <Box sx={{
          display: "flex", flexDirection: "row",
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <IconButton onClick={() => nav(ROUTES.ROOT)}>
            <img src="../../favicon.ico" alt="Icon" width={32} height={32} />
          </IconButton>
          <Typography sx={{ ml: 1 }}>People's Petitions</Typography>
        </Box>
        {user && <Typography sx={{ mr: "10vw" }}>Welcome, {user.firstName}</Typography>}
        <Stack direction='row'>
          {/* split into center and right navbar */}
          <IconButton onClick={colorMode.toggleColorMode}>
            {mode==='light'?<LightModeIcon />:<DarkModeIcon/>}
          </IconButton>
          {user ? (
            <>
              <AvatarMenu />
            </>
          ) : (
            <Button color="inherit" onClick={() => nav(ROUTES.LOGIN_PAGE)}>
              Login
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
