import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/HomePage/Home";
import Login from "./pages/AuthPages/Login";
import Register from "./pages/AuthPages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/ErrorPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PrivateRoute from "./features/auth/PrivateRoute";
import AuthRoute from "./features/auth/AuthRoute";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import { ActiveTabProvider } from "../src/features/hooks/TabContext";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Sarabun",
      textTransform: "none",
      fontSize: 16,
    },
  },
});

function App() {
  return (
    <ActiveTabProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="" element={<AuthRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route path="" element={<PrivateRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
        <ToastContainer />
      </ThemeProvider>
    </ActiveTabProvider>
  );
}

export default App;
