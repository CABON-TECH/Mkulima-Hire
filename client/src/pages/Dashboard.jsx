// import { Button } from "@mui/material";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useTabContext } from "../features/hooks/TabContext";
import Overview from "./dashboard/Overview";
import Farmer from "./dashboard/Farmer";
import Worker from "./dashboard/Worker";

const Dashboard = () => {
  // const user = useSelector((state) => state?.auth.user);
  // const navigate = useNavigate();
  const { activeTab } = useTabContext();

  const tabComponents = {
    Overview,
    Farmer,
    Worker,
  };

  const Component = tabComponents[activeTab];

  // const handleLogOut = () => {
  //   dispatch(logout());
  //   navigate("/");
  //   toast.success("Log Out successful");
  // };

  // return (
  //   <div>
  //     <ToastContainer />
  //     Dashboard
  //     <p>{user?.name}</p>
  //     <Button onClick={handleLogOut}>Log Out</Button>
  //   </div>
  // );
  return <Component />;
};

export default Dashboard;
