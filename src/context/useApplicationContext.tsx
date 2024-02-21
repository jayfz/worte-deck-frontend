import { ApplicationContext } from '@/context/ApplicationContext';
import { useContext } from 'react';

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);

  if (!context) {
    throw new Error('useAppContext needs to be used within <ApplicationContext.Provider>');
  }

  return context;
};
