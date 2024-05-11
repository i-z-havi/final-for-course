import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import Layout from "./layout/Layout.jsx";
import MyThemeProvider from "./theme/MyThemeProvider.jsx";
import SnackBarProvider from "./theme/Snackbar/SnackBarProvider.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyThemeProvider>
          <SnackBarProvider>
            <Layout>
              <Router />
            </Layout>
          </SnackBarProvider>
        </MyThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
