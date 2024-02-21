import MenuBar from '@/ui/MenuBar';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  /* defaults to mobile for now */
  return (
    <>
      <MenuBar />
      <Outlet />
    </>
  );
}
