import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Error = () => {
  return (
    <div>
      <Navbar window={undefined} />
      <div className="flex flex-col justify-center items-center">
        <p>Page Not found</p>
        <Link to="/" className="text-[#74c116]">
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default Error;
