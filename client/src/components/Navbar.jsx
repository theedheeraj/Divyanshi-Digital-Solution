import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { pathname } = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/book', label: 'Book Service' },
    { to: '/contact', label: 'Contact' },
  ];

  const active = (path) =>
    pathname === path
      ? 'text-white bg-primary-700 px-3 py-1.5 rounded-lg'
      : 'text-primary-100 hover:text-white transition';

  return (
    <nav className="bg-primary-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">
              <span className="text-primary-700 font-extrabold text-lg">D</span>
            </div>
            <span className="text-white font-bold text-lg hidden sm:block">
              Divyanshi Digital
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-4">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className={`text-sm font-medium ${active(l.to)}`}>
                {l.label}
              </Link>
            ))}
            {isAuthenticated && (
              <button
                onClick={logout}
                className="text-sm font-medium text-red-300 hover:text-red-100 transition ml-2"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-primary-900 border-t border-primary-700 pb-3">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 text-sm font-medium ${active(l.to)}`}
            >
              {l.label}
            </Link>
          ))}
          {isAuthenticated && (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2.5 text-sm font-medium text-red-300 hover:text-red-100"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
