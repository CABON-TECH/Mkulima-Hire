import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((state) => state?.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
    toast.success("Log Out successful");
  };

  return (
    <div>
      <ToastContainer />
      Dashboard
      <p>{user?.name}</p>
      <Button onClick={handleLogOut}>Log Out</Button>
    </div>
  );
};

export default Dashboard;
