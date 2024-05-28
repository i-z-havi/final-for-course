import { Box, Button, Container, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ColorModeContext } from "../theme/MyThemeProvider";
import useUserHook from "../users/hooks/useUserHook";
// import { useTheme } from '@emotion/react'
//both useThemes seem interchangable?

export default function Sandbox() {
  const colorMode = useContext(ColorModeContext); //should put this in header where dark mode toggle will be
  const {handleLogout} = useUserHook();

  return (
    <>
      <Box>
        <Typography align="center" component="h1" variant="h2">
          Sandbox
        </Typography>
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
        </Container>
        <Container sx={{ border: 1, width: 300, textAlign: "center" }}>
          <Typography>This is a Container</Typography>
          <Button variant="contained" onClick={()=>handleLogout()}> Log out</Button>
        </Container>
      </Box>
    </>
  );
}
