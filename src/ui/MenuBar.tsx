import { useLocation } from 'react-router-dom';

export default function MenuBar() {
  const location = useLocation();

  console.log(location);
  return <p>MenuBar placeholder</p>;
}
