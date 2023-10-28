import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from './AuthState';

const FarmerPrivateRoute = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return user.role == 'farmer' ? <Outlet /> : <Navigate to="/login" replace />;
};

export default FarmerPrivateRoute;
