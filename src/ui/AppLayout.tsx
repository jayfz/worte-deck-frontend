import Drawer from '@/ui/Drawer';
import MenuBar from '@/ui/MenuBar';
import { Outlet } from 'react-router-dom';
import DrawerContextProvider from '@/context/DraweContext';

export default function AppLayout() {
  /* defaults to mobile for now */
  return (
    <DrawerContextProvider>
      <MenuBar />
      <Drawer />
      <Outlet />
    </DrawerContextProvider>
  );
}
