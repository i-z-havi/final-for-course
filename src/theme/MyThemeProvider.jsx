import { createContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#e5a96e",
          },
          secondary: {
            main: "#7f7fe7",
          },
          background: {
            default: "#FFFDD0",
            paper: "#fdf9ab",
          },
          text: {
            primary: "#121212",
          },
        }
      : {
          primary: {
            main: "#90CAF9",
          },
          secondary: {
            main: "#ce93d8",
          },
          background: {
            default: "#292929",
            paper: "#393939",
          },
          text: {
            primary: "#fff",
          },
        }),
  },
});

export const ColorModeContext = createContext();

export default function MyThemeProvider({ children }) {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return (
    <ColorModeContext.Provider value={{colorMode,mode}}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
