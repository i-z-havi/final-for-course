import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import Layout from "./layout/Layout.jsx";
import MyThemeProvider from "./theme/MyThemeProvider.jsx";
import SnackBarProvider from "./theme/Snackbar/SnackBarProvider.jsx";
import UserProvider from "./users/providers/UserProvider.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyThemeProvider>
          <UserProvider>
            <SnackBarProvider>
              <Layout>
                <Router />
              </Layout>
            </SnackBarProvider>
          </UserProvider>
        </MyThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
