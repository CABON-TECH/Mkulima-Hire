import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { AiOutlineArrowLeft } from "react-icons/ai";

const JobDescription = () => {
  const user = useSelector((state) => state?.auth.user);
  const API_URL = "http://localhost:5000/api/";
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(true);

  const { _id } = useParams();
  const navigate = useNavigate();

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
  }, [user]);
  const oneJob = jobOpenings?.find((obj) => obj._id === _id);

  function formatDateDifference(date) {
    const currentDate = new Date();
    const targetDate = new Date(date);
    const timeDifference = currentDate - targetDate;

    const intervals = [
      { label: "second", ms: 1000 },
      { label: "minute", ms: 60000 },
      { label: "hour", ms: 3600000 },
      { label: "day", ms: 86400000 },
      { label: "week", ms: 604800000 },
      { label: "month", ms: 2592000000 },
      { label: "year", ms: 31536000000 },
    ];

    for (let i = intervals.length - 1; i >= 0; i--) {
      const interval = intervals[i];
      const difference = Math.floor(timeDifference / interval.ms);

      if (difference >= 1) {
        const plural = difference > 1 ? "s" : "";
        return `${difference} ${interval.label}${plural}`;
      }
    }

    return "Just now";
  }

  return (
    <>
      {loading ? (
        <div className="sm:pl-60 pl-2 py-5 pb-24 w-full pr-2 sm:pr-10">
          <button
            className="text-[#74c116] flex items-center gap-x-1"
            onClick={() => navigate("/worker-dashboard")}
          >
            <AiOutlineArrowLeft />
            Go back to Jobs
          </button>
          <LoadingSpinner />
        </div>
      ) : (
        <div className="sm:pl-60 pl-2 py-5 pb-24 w-full pr-2 sm:pr-10">
          <button
            className="text-[#74c116] flex items-center gap-x-1"
            onClick={() => navigate("/worker-dashboard")}
          >
            <AiOutlineArrowLeft />
            Go back to Jobs
          </button>
          <div>
            <p className="text-lg">{oneJob?.title}</p>
            <p className="text-sm text-[#282828] font-light leading-tight">
              Job Title
            </p>
          </div>

          <div>
            <p className="text-lg">
              {oneJob?.city}, {oneJob?.state}
            </p>
            <p className="text-sm text-[#282828] font-light leading-tight">
              Job Location
            </p>
          </div>

          <div>
            <p className="text-lg">{oneJob?.pay}</p>
            <p className="text-sm text-[#282828] font-light leading-tight">
              Hourly Wage (in KES)
            </p>
          </div>

          <div>
            <p className="text-lg">{oneJob?.description}</p>
            <p className="text-sm text-[#282828] font-light leading-tight">
              Job Description
            </p>
          </div>
          <div className="mt-5">
            <p className="font-semibold">Contact the Employer</p>
            <p className="text-lg">{oneJob?.email}</p>
            <p className="text-sm text-[#282828] font-light leading-tight">
              Employer mail
            </p>
          </div>

          <div>
            <p className="text-lg">{oneJob?.phone}</p>
            <p className="text-sm text-[#282828] font-light leading-tight">
              Employer phone number
            </p>
          </div>

          <div className="mt-5">
            <p className="text-sm text-[#282828] font-light leading-tight">
              Posted {formatDateDifference(oneJob?.date)} ago
            </p>
          </div>

          <p className="text-sm text-[#282828] font-light leading-tight">
            {oneJob?.applications.length} Applicant(s) so far
          </p>

          <button
            type="submit"
            className="bg-[#74c116] text-[#ffffff] text-md font-light px-10 py-2 bg-custom-blue mx-auto rounded-lg mt-5 disabled:opacity-50 transition-all duration-300"
          >
            Apply For This Job
          </button>
        </div>
      )}
    </>
  );
};

export default JobDescription;
