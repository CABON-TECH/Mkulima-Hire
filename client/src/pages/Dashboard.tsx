import { useTabContext } from '../features/hooks/TabContext';
import Overview from './dashboard/Overview';
import Jobs from './dashboard/Jobs/Jobs';
import Settings from './dashboard/Settings';

const Dashboard = () => {
  const { activeTab } = useTabContext();

  const tabComponents = {
    Overview,
    Jobs,
    Settings,
  };

  const Component = tabComponents[activeTab as keyof typeof tabComponents];

  return <Component />;
};

export default Dashboard;
