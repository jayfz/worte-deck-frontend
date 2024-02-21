import LoginPage from '@/features/login/LoginPage';
import ProtectedRoute from '@/routing/ProtectedRoute';
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';

export const applicationRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/app" replace />,
      },
      {
        path: '/app',
        element: <Navigate to="/app/progress-overview" />,
      },
      {
        path: '/app/progress-overview',
        element: <p>Progress overview page placeholder here</p>,
      },
      {
        path: '/app/practice-session',
        element: <p>Practice session page placeholder here</p>,
      },
      {
        path: '/app/practice-session/results',
        element: <p>practice session results page placeholder here</p>,
      },
      {
        path: '/app/practice-session/tests',
        element: <p>practice session previous tests placeholder here</p>,
      },
      {
        path: '/app/vocabulary',
        element: <p>vocabulary page placeholder here</p>,
      },
      {
        path: '/app/word/:id',
        element: <p>word card page placeholder here</p>,
      },
      {
        path: '/app/manage-vocabulary/add-word',
        element: <p>add word page placeholder here</p>,
      },
      {
        path: '/app/manage-vocabulary/edit-word',
        element: <p>edit word page placeholder here</p>,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <p>Sign up page placeholder here</p>,
  },
  {
    path: '/reset-password',
    element: <p>reset password placeholder here</p>,
  },
  {
    path: '/privacy-policy',
    element: <p>privacy policy placeholder here</p>,
  },
  {
    path: '/terms-of-use',
    element: <p>terms of use placeholder here</p>,
  },
]);
