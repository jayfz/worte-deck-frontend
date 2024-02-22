import { useApplicationContext } from '@/context/useApplicationContext';
import { Navigate } from 'react-router-dom';

export default function Logout() {
  const { appLogout } = useApplicationContext();
  appLogout();
  return <Navigate to="/login" replace />;
}
