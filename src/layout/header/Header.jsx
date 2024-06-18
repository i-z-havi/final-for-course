import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useLocalStorageUser } from "../../users/providers/UserProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SearchIcon from "@mui/icons-material/Search";
import ROUTES from "../../routes/routesModel";
import AvatarMenu from "./AvatarMenu";
import { ColorModeContext } from "../../theme/MyThemeProvider";

export default function Header() {
  const { user } = useLocalStorageUser();
  const { colorMode, mode } = useContext(ColorModeContext);
  const nav = useNavigate();
  const [, setSearchParam] = useSearchParams();

  const handleSearchChange = (e) => {
    setSearchParam({petitionsearch:e.target.value});
  };

  return (
    <AppBar sx={{ position: "sticky" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => nav(ROUTES.ROOT)}>
            <img src="../../favicon.ico" alt="Icon" width={32} height={32} />
          </IconButton>
          <Typography sx={{ ml: 1 }}>People's Petitions</Typography>
        </Box>
        {user && (
          <Typography sx={{ mr: "-5vw" }}>Welcome, {user.firstName}</Typography>
        )}
        <Stack direction="row">
          <TextField
            sx={{ mt: "1vh" }}
            color="standard"
            variant="filled"
            size="small"
            hiddenLabel
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e)=>handleSearchChange(e)}
          />
          <IconButton onClick={colorMode.toggleColorMode}>
            {mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
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
