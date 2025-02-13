import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

function Header() {
  return (
    <header className="bottom-2 flex h-20 items-center justify-between border-stone-400 bg-yellow-400 p-4 text-xl font-medium uppercase text-stone-800 sm:p-6">
      <Link to="/" className="tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
