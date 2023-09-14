import { useSelector } from "react-redux";
import Avatar from "react-avatar";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Overview = () => {
  const user = useSelector((state) => state?.auth.user);

  const API_URL = import.meta.env.VITE_API_URL;
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user?.token}` },
      };
      axios.get(API_URL + "jobs", config).then((response) => {
        setJobOpenings(response?.data?.data);
        setLoading(!response?.data.success);
      });
    } catch (error) {
      toast.error(error.message);
    }
  }, [user, API_URL]);

  let filteredJobs = jobOpenings?.filter((job) => job.user === user?._id);

  // Calculate the total length of the applications array
  const totalApplicationsLength = filteredJobs.reduce((total, job) => {
    return total + job.applications.length;
  }, 0);

  return (
    <div className="sm:pl-60 pl-2 py-5 pb-24 w-full pr-2 sm:pr-10">
      <ToastContainer />

      <div className="flex justify-between items-center">
        <p className="text-[#74c116] text-2xl">Welcome, {user.name}</p>
        <Avatar name={user.name} size="40" round={true} />
      </div>
      <p>This is a farmer dashboard</p>
      <hr className="mt-3" />
      {loading && <LoadingSpinner />}

      <div className="flex gap-x-3 mt-4">
        <div className="rounded-md text-center flex flex-col items-center justify-center border-[#74c116] border-[1px] p-7 sm:text-base text-sm">
          <p className="text-2xl font-semibold text-[#74c116]">
            {filteredJobs?.length}
          </p>
          <p>Job Posts Created</p>
        </div>
        <div className="rounded-md text-center border-[#74c116] flex flex-col items-center justify-center border-[1px] p-10 sm:text-base text-sm">
          <p className="text-2xl font-semibold text-[#74c116]">
            {totalApplicationsLength}
          </p>
          <p>Applications Received</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
