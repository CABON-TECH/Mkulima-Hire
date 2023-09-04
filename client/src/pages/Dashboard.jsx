import { useTabContext } from "../features/hooks/TabContext";
//import { Button } from "@mui/material";
//import { useSelector } from "react-redux";
//import { useDispatch } from "react-redux";
//import { logout } from "../features/auth/authSlice";
//import { ToastContainer, toast } from "react-toastify";
//import { useNavigate } from "react-router-dom";
import Overview from "./dashboard/Overview";
import Farmer from "./dashboard/Farmer";
import Worker from "./dashboard/Worker";

const Dashboard = () => {
  //const user = useSelector((state) => state?.auth.user);
  // console.log(user);
  //const dispatch = useDispatch();
  //const navigate = useNavigate();

  /*const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
    toast.success("Log Out successful");
  };*/
  const { activeTab } = useTabContext();

  const tabComponents = {
    Overview,
    Farmer,
    Worker,
  };

  const Component = tabComponents[activeTab];

  return <Component />;
};

export default Dashboard;
