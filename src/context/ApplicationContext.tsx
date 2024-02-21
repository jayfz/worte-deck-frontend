import { applyBearerToken, clearBearerToken } from '@/services/axiosDefaults';
import { AuthenticatedUser } from '@/types/domainTypes';
import { doesUserPrefferDarkTheme } from '@/utils/helpers';
import { useLocalStorage } from '@mantine/hooks';
import { PropsWithChildren, createContext, useEffect } from 'react';

type ApplicationContextType = {
  isDarkTheme: boolean;
  toggleTheme: () => void;
  appUser: AuthenticatedUser | null;
  appLogin: (authenticatedUser: AuthenticatedUser) => void;
  appLogout: () => void;
};

export const ApplicationContext = createContext<ApplicationContextType | null>(null);

export function ApplicationProvider({ children }: PropsWithChildren) {
  const shouldUseDarkTheme = doesUserPrefferDarkTheme();

  const [isDarkTheme, setIsDarkTheme] = useLocalStorage<boolean>({
    key: 'darkTheme',
    defaultValue: shouldUseDarkTheme,
  });

  const [appUser, setAppUser] = useLocalStorage<AuthenticatedUser | null>({ key: 'appUser', defaultValue: null });

  const toggleTheme = () => {
    setIsDarkTheme((current) => !current);
  };

  const appLogin = (authenticatedUser: AuthenticatedUser) => {
    setAppUser(authenticatedUser);
  };

  const appLogout = () => {
    setAppUser(null);
    clearBearerToken();
  };

  const providerValue: ApplicationContextType = {
    isDarkTheme,
    toggleTheme,
    appUser,
    appLogin,
    appLogout,
  };

  useEffect(() => {
    if (appUser) {
      applyBearerToken(appUser.token);
    }
  }, [appUser]);

  return <ApplicationContext.Provider value={providerValue}>{children}</ApplicationContext.Provider>;
}
