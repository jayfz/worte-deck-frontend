import { useApplicationContext } from '@/context/useApplicationContext';
import { applicationRouter } from '@/routing/applicationRouter';
import { GlobalStyle } from '@/styles.globals';
import { ApplicationTheme, darkTheme, lightTheme } from '@/themes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const getToasterOptions = (theme: ApplicationTheme) => {
  return {
    success: { duration: 3000 },
    error: { duration: 5000 },
    style: {
      fontSize: '16px',
      maxWidth: '500px',
      padding: '16px 24px',
      backgroundColor: theme.sectionBg,
      color: theme.primaryTextColor,
    },
  };
};

export default function App() {
  const { isDarkTheme } = useApplicationContext();
  const selectedTheme = isDarkTheme ? darkTheme : lightTheme;
  const googleOAuthClientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={googleOAuthClientId}>
      <ThemeProvider theme={selectedTheme}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={applicationRouter} />
          <Toaster
            position="bottom-center"
            gutter={12}
            containerStyle={{ margin: '8px' }}
            toastOptions={getToasterOptions(selectedTheme)}
          />
          <GlobalStyle />
        </QueryClientProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}
