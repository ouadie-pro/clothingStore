import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaSearch, FaShoppingBag, FaUser, FaHeart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { itemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { to: '/shop', label: 'Shop' },
    { to: '/men', label: 'Men' },
    { to: '/women', label: 'Women' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 lg:px-20 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-1.5 rounded-lg text-white">
              <span className="material-symbols-outlined !text-2xl">styler</span>
            </div>
            <h2 className="text-slate-900 dark:text-white text-xl font-extrabold tracking-tight">
              MODERN CLOSET
            </h2>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `hover:text-primary transition-colors text-sm font-semibold ${
                    isActive ? 'text-primary' : 'text-slate-600 dark:text-slate-300'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4 lg:gap-6">
          <form onSubmit={handleSearch} className="relative hidden sm:block">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary w-48 lg:w-64 transition-all"
            />
          </form>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative">
              <FaHeart className="text-slate-700 dark:text-slate-300" />
            </button>
            
            <Link to="/cart" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative">
              <FaShoppingBag className="text-slate-700 dark:text-slate-300" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                  <FaUser className="text-slate-700 dark:text-slate-300" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-3 border-b border-slate-200 dark:border-slate-700">
                    <p className="text-sm font-bold">{user?.name}</p>
                    <p className="text-xs text-slate-500">{user?.email}</p>
                  </div>
                  <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700">
                    Profile
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700">
                    Orders
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                <FaUser className="text-slate-700 dark:text-slate-300" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
