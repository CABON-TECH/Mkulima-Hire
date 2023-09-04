import { useTabContext } from "../features/hooks/TabContext";
import Overview from "./FarmerDashboard/Overview";
import Farmer from "./FarmerDashboard/Farmer";
import Worker from "./FarmerDashboard/Worker";

const FarmerDashboard = () => {
  const { activeTab } = useTabContext();

  const tabComponents = {
    Overview,
    Farmer,
    Worker,
  };

  const Component = tabComponents[activeTab];

  return <Component />;
};

export default FarmerDashboard;
