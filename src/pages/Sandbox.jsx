import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { ColorModeContext } from "../theme/MyThemeProvider";
import useUserHook from "../users/hooks/useUserHook";
import { useLocalStorageUser } from "../users/providers/UserProvider";

export default function Sandbox() {
  const colorMode = useContext(ColorModeContext); //should put this in header where dark mode toggle will be
  const { handleLogout } = useUserHook();
  const { user } = useLocalStorageUser();
  console.log(user);
  return (
    <>
      <Box>
        <Typography align="center" component="h1" variant="h2">
          Sandbox
        </Typography>
        {user && <img src={user.profilePicture} alt={user.profilePicture} />}
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>this is what buttons look like</p>
          <Button variant="contained" onClick={colorMode.toggleColorMode}>
            Click me!
          </Button>
          <img src="/assets/images/testimage.jpeg" alt="test" />
          <form>
            <Select>
              <MenuItem value="pfp1">pfp1</MenuItem>
              <MenuItem value="pfp2">
                <Avatar alt="pfp2" src="/assets/images/testimage.jpeg" />
              </MenuItem>
            </Select>
            <input type="submit" />
          </form>
        </Container>
        <Container sx={{ border: 1, width: 300, textAlign: "center" }}>
          <Typography>This is a Container</Typography>
          <Button variant="contained" onClick={() => handleLogout()}>
            {" "}
            Log out
          </Button>
        </Container>
      </Box>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <Stack>
            <Stack
              sx={{
                width: "30vw",
                mt: 1,
                border: 1,
                borderRadius: 2,
                borderColor: "error.main",
              }}
            >
              <Typography>Test Title</Typography>
            </Stack>
            <Stack
              sx={{
                mt: 1,
                border: 1,
                borderRadius: 2,
                borderColor: "error.main",
              }}
            >
              <Typography>Test Title</Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
