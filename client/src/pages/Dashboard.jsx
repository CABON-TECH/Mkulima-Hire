import { useTabContext } from "../features/hooks/TabContext";
import Overview from "./dashboard/Overview";
import Farmer from "./dashboard/Farmer";
import Worker from "./dashboard/Worker";

const Dashboard = () => {
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
