import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/HomePage/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/AuthPages/Login";
import Register from "./pages/AuthPages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PrivateRoute from "./features/auth/PrivateRoute";
import AuthRoute from "./features/auth/AuthRoute";

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
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
