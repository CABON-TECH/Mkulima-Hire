import { useSelector } from "react-redux";
import Avatar from "react-avatar";

const Overview = () => {
  const user = useSelector((state) => state?.auth.user);

  return (
    <div className="sm:pl-60 pl-2 py-5 pb-24 w-full pr-2 sm:pr-10">
      <div className="flex justify-between items-center">
        <p className="text-[#74c116] text-2xl">Welcome, {user.name}</p>
        <Avatar name={user.name} size="40" round={true} />
      </div>
      <p>This is a farmer dashboard</p>
    </div>
  );
};

export default Overview;
