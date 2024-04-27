import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import Layout from "./layout/Layout.jsx";
import MyThemeProvider from "./theme/MyThemeProvider.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyThemeProvider>
          <Layout>
            <Router />
          </Layout>
        </MyThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
