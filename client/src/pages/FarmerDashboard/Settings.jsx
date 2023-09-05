import { useSelector } from "react-redux";
import Logout from "../../components/Logout";

const Settings = () => {
  const user = useSelector((state) => state?.auth.user);

  return (
    <div className="sm:pl-60 pl-2 py-5 pb-24">
      <p className="text-xl font-semibold text-[#74c116]">Farmer Dashboard</p>
      <p>You are signed in as {user?.name}</p>
      <p>E-mail: {user?.email}</p>
      <Logout />
    </div>
  );
};

export default Settings;
