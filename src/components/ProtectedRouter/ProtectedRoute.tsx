import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { IRole } from '../../interfaces/role';

type Props = {
  allowedRoles?: IRole['role_name'][]; // array de strings do tipo role_name
};

export const ProtectedRoute = ({ allowedRoles }: Props) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role_name as any)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};