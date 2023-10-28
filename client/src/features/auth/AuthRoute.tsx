import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from './AuthState';

const AuthRoute = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return !user ? (
    <Outlet />
  ) : (
    <Navigate
      to={`${
        user.role === 'farmer' ? '/farmer-dashboard' : '/worker-dashboard'
      }`}
      replace
    />
  );
};

export default AuthRoute;
