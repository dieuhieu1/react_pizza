import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import { Outlet, useNavigate, useNavigation } from 'react-router-dom';
import Loader from './Loader';
function AppLayout() {
  const navigate = useNavigation();
  const loading = navigate.state === 'loading';

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {loading && <Loader/>}
      <Header />
      <div className=" overflow-scroll">
        <main className='max-w-3xl mx-auto '>
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
