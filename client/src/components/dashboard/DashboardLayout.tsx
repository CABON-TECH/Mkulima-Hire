import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="flex sm:flex-row flex-col-reverse">
      <DashboardSidebar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
