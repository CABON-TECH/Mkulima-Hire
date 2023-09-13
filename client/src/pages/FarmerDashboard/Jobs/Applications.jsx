import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Applications = () => {
  const user = useSelector((state) => state?.auth.user);
  const [loading, setLoading] = useState(true);
  const [jobOpenings, setJobOpenings] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  const { _id } = useParams();
  const navigate = useNavigate();
  const oneJob = jobOpenings?.find((obj) => obj._id === _id);

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
          <div className="grid grid-cols-2">
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
          </div>

          <div className="mt-7">
            <p className="font-semibold">Applications Received For This Job</p>
            {oneJob?.applications.map((applicant) => (
              <div key={applicant._id}>{applicant._id}</div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Applications;
