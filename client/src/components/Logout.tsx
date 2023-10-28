import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import { AppDispatch } from '../features/auth/store';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogOut = () => {
    dispatch(logout());
    navigate('/');
    toast.success('Log Out successful');
  };
  return (
    <div
      className="flex ml-5 items-center gap-2 cursor-pointer"
      onClick={handleLogOut}
    >
      <ToastContainer />
      <BiLogOut />
      <p>Logout</p>
    </div>
  );
};

export default Logout;
