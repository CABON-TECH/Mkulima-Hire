import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from './AuthState';

const WorkerPrivateRoute = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return user.role == 'worker' ? <Outlet /> : <Navigate to="/login" replace />;
};

export default WorkerPrivateRoute;
