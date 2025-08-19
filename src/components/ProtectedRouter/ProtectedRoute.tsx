import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { Role } from '../../../src/types/Role';

type Props = {
  allowedRoles?: Role['role_name'][]; // array de strings do tipo role_name
};

export const ProtectedRoute = ({ allowedRoles }: Props) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && (!user?.role || !allowedRoles.includes(user?.role.role_name))) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};