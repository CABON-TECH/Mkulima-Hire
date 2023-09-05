import { useSelector } from "react-redux";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const user = useSelector((state) => state?.auth.user);
  const navigate = useNavigate();

  return (
    <div className="sm:pl-60 pl-2 py-5 pb-24 w-full pr-2 sm:pr-10">
      <div className="flex justify-between items-center">
        <p className="text-[#74c116] text-2xl">Hello, {user.name}</p>
        <Avatar name={user.name} size="40" round={true} />
      </div>
      <button
        className="bg-[#74c116] text-[#f2f2f2] p-3 rounded-lg mt-10"
        onClick={() => navigate("/farmer-dashboard/create-job")}
      >
        Create a job opening
      </button>
    </div>
  );
};

export default Jobs;
