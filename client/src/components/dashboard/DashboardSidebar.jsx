import { useEffect, useState } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { ImMan } from "react-icons/im";
import { useTabContext } from "../../features/hooks/TabContext";
import Logout from "../Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";

const links = [
  { id: 1, path: "Overview", icon: AiOutlineDashboard },
  { id: 2, path: "Jobs", icon: ImMan },
  { id: 3, path: "Settings", icon: FiSettings },
];

// links For mobile
const mobileOrder = [1, 0, 2];
const mobileLinks = mobileOrder.map((i) => links[i]);

const DashboardSidebar = () => {
  const { activeTab, setActiveTab } = useTabContext();
  const [selectedLink, setSelectedLink] = useState(activeTab);

  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSelectedLink(tab);
    navigate("/worker-dashboard");
  };

  useEffect(() => {
    if (location.pathname.startsWith("/farmer-dashboard")) {
      setSelectedLink(activeTab);
    }
  }, [location.pathname, activeTab]);

  useEffect(() => {
    if (location.pathname.startsWith("/worker-dashboard/job")) {
      setActiveTab("Jobs");
      setSelectedLink("Jobs");
    }
  }, [location.pathname, setActiveTab]);

  return (
    <>
      <div className="hidden sm:flex fixed bg-[#74c116] text-[#ffffff] min-h-screen w-48 flex-col px-10">
        <div className="flex items-center gap-2 pt-10 pb-20 font-bold">
          <Link to="/">Mkulima-Hire</Link>
        </div>
        {links.map(({ id, path, icon }) => {
          const Icon = icon;
          const isSelected = path === selectedLink;
          return (
            <li
              key={id}
              className={`cursor-pointer list-none mb-10 grid grid-cols-4 text-xl ${
                isSelected ? "font-semibold" : "text-[#5d5d5d] "
              }`}
              onClick={() => handleTabClick(path)}
            >
              <Icon className="my-auto" />
              <p>{path}</p>
            </li>
          );
        })}
        <div className="fixed bottom-5">
          <Logout />
        </div>
      </div>
      <div className="fixed bottom-0 sm:hidden flex bg-[#74c116] text-[#ffffff] justify-center gap-16 bg-custom-blue w-full">
        {mobileLinks.map(({ id, path, icon }) => {
          const Icon = icon;
          const isSelected = path === selectedLink;
          return (
            <li
              key={id}
              className={`cursor-pointer list-none my-2 flex flex-col gap-3 text-lg ${
                isSelected ? "font-semibold" : "text-[#5d5d5d] "
              }`}
              onClick={() => handleTabClick(path)}
            >
              <Icon className="m-auto" />
              <p>{path}</p>
            </li>
          );
        })}
      </div>
    </>
  );
};

export default DashboardSidebar;
