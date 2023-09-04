import { useSelector } from "react-redux";

const Overview = () => {
  const user = useSelector((state) => state?.auth.user);
  console.log(user);

  return (
    <div className="sm:pl-60 pl-2 py-5 pb-24">
      <p>THIS IS THE FARMER DASHBOARD</p>
      <p>You are signed in as {user?.name}</p>
      <p>hh</p>
    </div>
  );
};

export default Overview;
