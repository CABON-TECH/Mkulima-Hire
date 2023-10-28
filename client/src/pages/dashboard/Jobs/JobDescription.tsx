import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { formatDateDifference } from '../../../features/utils/Helpers';
import { RootState } from '../../../features/auth/AuthState';
import { Job } from '../../../features/interfaces/JobInterface';
import { ApplyModal } from './ApplyModal';
import SuccessModal from './SuccessModal';
// import io from "socket.io-client";
// const socket = io.connect("http://localhost:5001");

const JobDescription = () => {
  const user = useSelector((state: RootState) => state?.auth.user);
  const API_URL = import.meta.env.VITE_API_URL;

  const [jobOpenings, setJobOpenings] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [applyModalIsOpen, setApplyModalIsOpen] = useState(false);
  // const [status, setStatus] = useState("");

  function openApplyModal() {
    setApplyModalIsOpen(true);
  }

  const { _id } = useParams();
  const navigate = useNavigate();

  // useEffect(() => {
  //   socket.on("receive_status", (data) => {
  //     setStatus(data.message);
  //   }),
  //     [socket];
  // });

  useEffect(() => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user?.token}` },
      };
      axios.get(API_URL + 'jobs', config).then((response) => {
        setJobOpenings(response?.data?.data);
        setLoading(!response?.data.success);
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [user, API_URL]);
  const oneJob = jobOpenings?.find((obj) => obj._id === _id);

  function checkApplyStatus(job: Job) {
    const userId = parseInt(user?._id);
    const apps = job?.applications;
    return apps?.some((item) => parseInt(item.userId) === userId);
  }

  return (
    <>
      {loading ? (
        <div className="sm:pl-60 pl-2 py-5 pb-24 w-full pr-2 sm:pr-10">
          <button
            className="text-[#74c116] flex items-center gap-x-1"
            onClick={() => navigate('/worker-dashboard')}
          >
            <AiOutlineArrowLeft />
            Go back to Jobs
          </button>
          <hr className="mt-3" />

          <LoadingSpinner />
        </div>
      ) : (
        <div className="sm:pl-60 pl-2 py-5 pb-24 w-full pr-2 sm:pr-10">
          <button
            className="text-[#74c116] flex items-center gap-x-1"
            onClick={() => navigate('/worker-dashboard')}
          >
            <AiOutlineArrowLeft />
            Go back to Jobs
          </button>
          <hr className="mt-3" />

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
          <div className="mt-5">
            <p className="font-semibold">Contact the Employer</p>
            <p className="text-base">{oneJob?.email}</p>
            <p className="text-xs text-[#282828] font-light leading-tight">
              Employer mail
            </p>
          </div>

          <div>
            <p className="text-base">{oneJob?.phone}</p>
            <p className="text-xs text-[#282828] font-light leading-tight">
              Employer phone number
            </p>
          </div>

          <div className="mt-5">
            <p className="text-sm text-[#282828] font-light leading-tight">
              Posted {formatDateDifference(oneJob!.date)} ago
            </p>
          </div>

          <p className="text-sm text-[#282828] font-light leading-tight">
            {oneJob?.applications.length} Applicant(s) so far
          </p>

          {checkApplyStatus(oneJob!) ? (
            <p className="py-2 mt-5 text-[#282828]">
              You have already applied for this job!
            </p>
          ) : (
            <button
              type="submit"
              className="bg-[#74c116] text-[#ffffff] text-md font-light px-10 py-2 bg-custom-blue mx-auto rounded-lg mt-5 disabled:opacity-50 transition-all duration-300"
              onClick={() => openApplyModal()}
            >
              Apply For This Job
            </button>
          )}

          <SuccessModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />

          <ApplyModal
            jobOpenings={jobOpenings}
            applyModalIsOpen={applyModalIsOpen}
            setApplyModalIsOpen={setApplyModalIsOpen}
            setIsOpen={setIsOpen}
            _id={_id}
          />
        </div>
      )}
    </>
  );
};

export default JobDescription;
