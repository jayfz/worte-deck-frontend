import { DrawerContext } from '@/context/DraweContext';
import { useContext } from 'react';

export default function useDrawerContext() {
  const context = useContext(DrawerContext);

  if (!context) throw new Error('useDrawerContext needs to be used within <DrawerContext.Provider>');

  return context;
}
