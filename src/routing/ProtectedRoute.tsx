import { useApplicationContext } from '@/context/useApplicationContext';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const { appUser } = useApplicationContext();

  if (!appUser) return <Navigate to="/login" />;

  return children;
}
