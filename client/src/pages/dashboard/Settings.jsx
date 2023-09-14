import { useSelector } from "react-redux";
import Logout from "../../components/Logout";

const Settings = () => {
  const user = useSelector((state) => state?.auth.user);

  return (
    <div className="sm:pl-60 pl-2 pr-10 py-5 pb-24 w-full">
      <p className="text-xl font-semibold text-[#74c116]">Worker Dashboard</p>
      <hr className="mt-3" />

      <div className="mt-2">
        <p>You are signed in as {user?.name}</p>
        <p>E-mail: {user?.email}</p>
      </div>
      <Logout />
    </div>
  );
};

export default Settings;
