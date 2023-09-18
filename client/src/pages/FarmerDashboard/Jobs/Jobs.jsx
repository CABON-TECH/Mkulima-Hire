import { useSelector } from "react-redux";
import Avatar from "react-avatar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { formatDateDifference } from "../../../features/utils/Helpers";
import { capitalize } from "../../../features/utils/Helpers";

const Jobs = () => {
  const user = useSelector((state) => state?.auth.user);
  const navigate = useNavigate();

  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

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

  return (
    <div className="sm:pl-60 pl-2 py-5 pb-24 w-full pr-2 sm:pr-10">
      <ToastContainer />
      <div className="flex justify-between items-center">
        <p className="text-[#74c116] text-2xl">Hello, {user.name}</p>
        <Avatar name={user.name} size="40" round={true} />
      </div>
      <hr className="mt-3" />

      <button
        className="bg-[#74c116] text-[#f2f2f2] p-3 rounded-lg mt-5"
        onClick={() => navigate("/farmer-dashboard/create-job")}
      >
        Create a job opening
      </button>
      {!loading && (
        <p className="pt-3 text-lg font-semibold">
          This is a list of jobs you have created
        </p>
      )}
      {loading && <LoadingSpinner />}

      <div className="">
        {filteredJobs?.map((job) => (
          <div key={job._id} className="py-2">
            <Link to={`/farmer-dashboard/job/${job._id}`}>
              <div className="flex justify-between items-center bg-white border-b-4 border-double py-2">
                <div className="flex gap-x-3">
                  <Avatar
                    name={user?.email}
                    size="50"
                    round={5}
                    className="mt-1"
                  />
                  <div className="">
                    <p className="text-lg font-semibold text-[#282828] flex items-center gap-x-1">
                      {capitalize(job.title)}
                    </p>
                    <p className="flex items-center gap-x-1 text-sm text-[#5d5d5d]">
                      <img src={location} alt="" />
                      {capitalize(job.city)}, {capitalize(job.state)}
                    </p>
                    <p className="text-sm text-[#5d5d5d]">
                      {" "}
                      You posted this job {formatDateDifference(job.date)} ago
                    </p>
                  </div>
                </div>

                <div className="flex gap-x-3">
                  <div className="flex justify-center">
                    <button className="text-sm text-[#74c116]">
                      <Link to={`/farmer-dashboard/job/${job._id}`}>
                        View Applications
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
