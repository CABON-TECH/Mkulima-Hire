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
import AuthRoute from "./features/auth/AuthRoute";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import { ActiveTabProvider } from "../src/features/hooks/TabContext";
import FarmerDashboard from "./pages/FarmerDashboard";
import FarmerDashboardLayout from "./components/FarmerDashboard/FarmerDashboardLayout";
import FarmerPrivateRoute from "./features/auth/FarmerPrivateRoute";
import WorkerPrivateRoute from "./features/auth/WorkerPrivateRoute";
import CreateJob from "./pages/FarmerDashboard/Jobs/CreateJob";
import JobDescription from "./pages/dashboard/Jobs/JobDescription";
import Applications from "./pages/FarmerDashboard/Jobs/Applications";

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
            <Route path="" element={<WorkerPrivateRoute />}>
              <Route path="/worker-dashboard" element={<DashboardLayout />}>
                <Route path="/worker-dashboard" element={<Dashboard />} />
                <Route
                  path="/worker-dashboard/job/:_id"
                  element={<JobDescription />}
                />
              </Route>
            </Route>

            <Route path="" element={<FarmerPrivateRoute />}>
              <Route
                path="/farmer-dashboard"
                element={<FarmerDashboardLayout />}
              >
                <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
                <Route
                  path="/farmer-dashboard/create-job"
                  element={<CreateJob />}
                />
                <Route
                  path="/farmer-dashboard/job/:_id"
                  element={<Applications />}
                />
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
