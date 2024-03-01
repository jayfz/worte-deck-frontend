import { useApplicationContext } from '@/context/useApplicationContext';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export default function Logout() {
  const { appLogout } = useApplicationContext();

  useEffect(() => {
    appLogout();
  }, [appLogout]);

  return <Navigate to="/login" replace />;
}
