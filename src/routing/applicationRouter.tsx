import LoginPage from '@/features/login/LoginPage';
import Logout from '@/features/login/Logout';
import PreviousPracticeSessionResultsPage from '@/features/practice-session-results/PreviousPracticeSessionResultsPage';
import PracticeSessionPage from '@/features/practice-session/PracticeSessionPage';
import PracticeSessionResultsPage from '@/features/practice-session/PracticeSessionResultsPage';
import ProgressOverviewPage from '@/features/progress-overview/ProgressOverviewPage';
import AddWordPage from '@/features/vocabulary-management/AddWordPage';
import ManageVocabularyPage from '@/features/vocabulary-management/ManageVocabularyPage';
import VocabularyPage from '@/features/vocabulary/VocabularyPage';
import ProtectedRoute from '@/routing/ProtectedRoute';
import AppLayout from '@/ui/AppLayout';
import { Navigate, createBrowserRouter } from 'react-router-dom';

export const applicationRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
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
        element: <ProgressOverviewPage />,
      },
      {
        path: '/app/practice-session',
        element: <PracticeSessionPage />,
      },
      {
        path: '/app/practice-session/results',
        element: <PracticeSessionResultsPage />,
      },
      {
        path: '/app/practice-session/tests',
        element: <PreviousPracticeSessionResultsPage />,
      },
      {
        path: '/app/vocabulary',
        element: <VocabularyPage />,
      },
      {
        path: '/app/word/:id',
        element: <p>word card page placeholder here</p>,
      },
      {
        path: '/app/manage-vocabulary',
        element: <ManageVocabularyPage />,
      },
      {
        path: '/app/manage-vocabulary/add-word',
        element: <AddWordPage action="create" />,
      },
      {
        path: '/app/manage-vocabulary/edit-word',
        element: <AddWordPage action="update" />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/logout',
    element: <Logout />,
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
