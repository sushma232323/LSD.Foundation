
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    const currentLink = NAV_LINKS.find(link => link.path === location.pathname);
    return currentLink ? currentLink.name : "LSD Foundation";
  };

  const NavLinks = () => (
    <nav>
      <ul>
        {NAV_LINKS.map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.path}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center p-3 my-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-gray-200 hover:bg-emerald-800 hover:text-white'
                }`
              }
            >
              <span className="mr-4">{link.icon}</span>
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for large screens */}
      <aside className="hidden lg:block w-64 bg-emerald-700 text-white p-4 flex-shrink-0 shadow-lg">
        <div className="text-2xl font-bold mb-8 text-center">LSD Foundation</div>
        <NavLinks />
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity lg:hidden ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-emerald-700 text-white p-4 z-40 transform transition-transform lg:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="text-2xl font-bold mb-8">LSD Foundation</div>
        <NavLinks />
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar for mobile */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white shadow-md">
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h1>
          <div className="w-6"></div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
