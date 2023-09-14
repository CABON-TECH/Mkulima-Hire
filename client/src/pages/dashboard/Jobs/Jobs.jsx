import { useSelector } from "react-redux";
import Avatar from "react-avatar";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import location from "../../../assets/location.svg";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { capitalize } from "../../../features/utils/Helpers";
import { formatDateDifference } from "../../../features/utils/Helpers";
import { truncateString } from "../../../features/utils/Helpers";

const Jobs = () => {
  const user = useSelector((state) => state?.auth.user);
  const [jobOpenings, setJobOpenings] = useState([]);
  const [search, setSearch] = useState("");
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

  console.log(jobOpenings);
  console.log(user);

  function checkApplyStatus(job) {
    const userId = parseInt(user?._id);
    const apps = job?.applications;
    return apps?.some((item) => parseInt(item._id) === userId);
  }

  return (
    <div className="sm:pl-60 pl-2 py-5 pb-24 w-full pr-2 sm:pr-10">
      <ToastContainer />

      <div className="flex justify-between items-center">
        <p className="text-[#74c116] text-2xl">Hello, {user?.name}</p>
        <Avatar name={user?.name} size="40" round={true} />
      </div>

      <div className="sm:flex justify-between items-center mt-3">
        <h2>These are the current available job openings</h2>
        <input
          className="focus:border-2 border-[1px] rounded-lg p-3 sm:w-1/3 sm:mt-0 mt-2 bg-transparent border-[#2b2b39] focus:outline-none"
          placeholder="Search for a job"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      {loading && <LoadingSpinner />}

      <div className="">
        {jobOpenings
          ?.filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.title.toLowerCase().includes(search);
          })
          ?.map((job) => (
            <div key={job._id} className="py-2">
              <Link to={`/worker-dashboard/job/${job._id}`}>
                <div className="flex justify-between items-center bg-white border-b-4 border-double py-2">
                  <div className="flex gap-x-3">
                    <Avatar
                      name={job.email}
                      size="50"
                      round={5}
                      className="mt-1"
                    />
                    <div className="">
                      <p className="text-lg font-semibold text-[#282828] flex items-center gap-x-1">
                        {capitalize(job.title)}
                        {checkApplyStatus(job) && (
                          <p className="text-xs bg-[#74c116] text-[#F2F2F2] px-2 rounded-sm">
                            Applied
                          </p>
                        )}
                      </p>
                      <p className="flex items-center gap-x-1 text-sm text-[#5d5d5d]">
                        <img src={location} alt="" />
                        {capitalize(job.city)}, {capitalize(job.state)}
                      </p>
                      <p className="text-sm text-[#5d5d5d] whitespace-nowrap">
                        {truncateString(job.description)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-x-3">
                    <p className="text-[#282828] text-sm whitespace-nowrap">
                      Posted {formatDateDifference(job.date)} ago
                    </p>
                    <div className="flex justify-center">
                      <button className="text-sm text-[#74c116] whitespace-nowrap">
                        <Link to={`/worker-dashboard/job/${job._id}`}>
                          View Details
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
