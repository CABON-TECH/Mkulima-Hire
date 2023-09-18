import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { AiOutlineArrowLeft } from "react-icons/ai";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5001");

const Applications = () => {
  const user = useSelector((state) => state?.auth.user);
  const [loading, setLoading] = useState(true);
  const [jobOpenings, setJobOpenings] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  const { _id } = useParams();
  const navigate = useNavigate();
  const oneJob = jobOpenings?.find((obj) => obj._id === _id);

  const handleAcceptReview = (workerId) => {
    socket.emit("send_status", {
      message: "Approved",
      farmerId: user?._id,
      workerId,
      jobId: _id,
    });
  };

  const handleRejectReview = (workerId) => {
    socket.emit("send_status", {
      message: "Rejected",
      farmerId: user?._id,
      workerId,
      jobId: _id,
    });
  };

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
          <hr className="mt-3" />

          <div className="sm:grid grid-cols-2 mt-2">
            <div className="mb-2">
              <p className="text-base">{oneJob?.title}</p>
              <p className="text-xs text-[#282828] font-light leading-tight">
                Job Title
              </p>
            </div>

            <div className="mb-2">
              <p className="text-base">
                {oneJob?.city}, {oneJob?.state}
              </p>
              <p className="text-xs text-[#282828] font-light leading-tight">
                Job Location
              </p>
            </div>

            <div className="mb-2">
              <p className="text-base">{oneJob?.pay}</p>
              <p className="text-xs text-[#282828] font-light leading-tight">
                Hourly Wage (in KES)
              </p>
            </div>

            <div className="mb-2">
              <p className="text-base">{oneJob?.description}</p>
              <p className="text-xs text-[#282828] font-light leading-tight">
                Job Description
              </p>
            </div>
          </div>

          <div className="mt-7">
            <p className="font-semibold text-[#74c116]">
              Applications Received For This Job ({oneJob.applications.length})
            </p>

            <table className="w-full mt-2 border-[1px] border-[#74c116]">
              <tr>
                <th className="border-[1px] border-[#74c116] ">S/N</th>
                <th className="border-[1px] border-[#74c116] ">Contact</th>
                <th className="border-[1px] border-[#74c116] ">Experience</th>
                <th className="border-[1px] border-[#74c116] ">Status</th>
              </tr>

              {oneJob?.applications.map((applicant, index) => (
                <tr key={applicant._id} className="text-center ">
                  <td className="border-[1px] border-[#74c116]">
                    {index + 1}.
                  </td>
                  <td className="border-[1px] border-[#74c116]">
                    {applicant.contactInfo}
                  </td>
                  <td className="border-[1px] border-[#74c116]">
                    {applicant.experience}
                  </td>
                  <td className="border-[1px] border-[#74c116]">
                    <button
                      className="bg-green-400 mr-5 my-2 px-2 py-1 rounded-md"
                      onClick={() => handleAcceptReview(applicant._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-400 my-2 px-2 py-1 rounded-md"
                      onClick={() => handleRejectReview(applicant._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </table>
            {oneJob.applications.length == 0 && (
              <p className="text-center text-lg mt-2 text-[#74c116]">
                No applications yet!
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Applications;
