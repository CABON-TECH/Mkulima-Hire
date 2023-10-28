import { useTabContext } from '../features/hooks/TabContext';
import Overview from './FarmerDashboard/Overview';
import Jobs from './FarmerDashboard/Jobs/Jobs';
import Settings from './FarmerDashboard/Settings';

const FarmerDashboard = () => {
  const { farmerActiveTab } = useTabContext();

  const tabComponents = {
    Overview,
    Jobs,
    Settings,
  };

  const Component =
    tabComponents[farmerActiveTab as keyof typeof tabComponents];

  return <Component />;
};

export default FarmerDashboard;
