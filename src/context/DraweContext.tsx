import { PropsWithChildren, createContext, useState } from 'react';

type DraweContextType = {
  openDrawer: () => void;
  closeDrawer: () => void;
  isOpen: boolean;
};
export const DrawerContext = createContext<DraweContextType | null>(null);

export default function DrawerContextProvider(props: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  const providerValue: DraweContextType = {
    openDrawer,
    closeDrawer,
    isOpen,
  };

  return <DrawerContext.Provider value={providerValue}>{props.children}</DrawerContext.Provider>;
}
