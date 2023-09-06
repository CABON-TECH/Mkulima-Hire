import { useSelector } from "react-redux";
import Avatar from "react-avatar";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import location from "../../../assets/location.svg";

const Jobs = () => {
  const user = useSelector((state) => state?.auth.user);
  const [jobOpenings, setJobOpenings] = useState([]);
  const API_URL = "http://localhost:5000/api/";

  useEffect(() => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user?.token}` },
      };
      axios.get(API_URL + "jobs", config).then((response) => {
        setJobOpenings(response?.data?.data);
      });
    } catch (error) {
      toast.error(error.message);
    }
  }, [user]);

  const capitalize = (title) => {
    const words = title.split(" ");
    const capitalizedWords = words?.map((word) => {
      return word?.charAt(0).toUpperCase() + word?.slice(1);
    });
    return capitalizedWords?.join(" ");
  };

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

  function truncateString(inputString) {
    if (inputString.length > 20) {
      return inputString.substring(0, 20) + " ...";
    }

    return inputString;
  }

  console.log(jobOpenings);

  return (
    <div className="sm:pl-60 pl-2 py-5 pb-24 w-full pr-2 sm:pr-10">
      <ToastContainer />
      <div className="flex justify-between items-center">
        <p className="text-[#74c116] text-2xl">Hello, {user.name}</p>
        <Avatar name={user.name} size="40" round={true} />
      </div>
      <h2>These are the current available job openings</h2>

      <div className="pt-5">
        {jobOpenings.map((job) => (
          <div key={job._id} className="py-2">
            <div className="flex justify-between items-center bg-white border-b-4 border-double py-2">
              <div className="flex gap-x-3">
                <Avatar name={job.email} size="50" round={5} className="mt-1" />
                <div className="">
                  <p className="text-lg font-semibold text-[#282828]">
                    {capitalize(job.title)}
                  </p>
                  <p className="flex items-center gap-x-1 text-sm text-[#5d5d5d]">
                    <img src={location} alt="" />
                    {capitalize(job.city)}, {capitalize(job.state)}
                  </p>
                  <p className="text-sm text-[#5d5d5d]">
                    {truncateString(job.description)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[#282828] text-sm">
                  Posted {formatDateDifference(job.date)} ago
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
