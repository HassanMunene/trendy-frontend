import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { Home, Boxes, ListChecks, ShoppingCart, Users2, Bell, LineChart, Settings, User } from "lucide-react";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Notifications from "./pages/Notifications";
import Analytics from "./pages/Analytics";
import SettingsPage from "./pages/Settings";
import Profile from "./pages/Profile";

const navLinks = [
  { to: "/", icon: <Home size={20} />, label: "Dashboard" },
  { to: "/products", icon: <Boxes size={20} />, label: "Products" },
  { to: "/categories", icon: <ListChecks size={20} />, label: "Categories" },
  { to: "/orders", icon: <ShoppingCart size={20} />, label: "Orders" },
  { to: "/users", icon: <Users2 size={20} />, label: "Users" },
  { to: "/notifications", icon: <Bell size={20} />, label: "Notifications" },
  { to: "/analytics", icon: <LineChart size={20} />, label: "Analytics" },
  { to: "/settings", icon: <Settings size={20} />, label: "Settings" },
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  // Responsive: close sidebar on mobile when a link is clicked
  const handleNavClick = () => {
    if (window.innerWidth < 768) setCollapsed(true);
  };

  return (
    <aside
      className={`h-screen bg-gradient-to-b from-rose-500 via-black to-black text-white flex flex-col transition-all duration-300
        ${collapsed ? 'w-20' : 'w-56'}
        fixed md:static z-40
        shadow-xl shadow-black/20
      `}
    >
      <div className="h-16 flex items-center justify-between px-4 font-bold text-xl tracking-tight">
        <span className={`truncate transition-all duration-300 ${collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>LOGO</span>
        <button
          className="md:hidden text-white focus:outline-none ml-auto"
          aria-label="Toggle Sidebar"
          onClick={() => setCollapsed(!collapsed)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <button
          className="hidden md:block text-white focus:outline-none ml-2"
          aria-label="Expand/Collapse Sidebar"
          onClick={() => setCollapsed(!collapsed)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <nav className="flex-1">
        <ul className="space-y-1 mt-8">
          {navLinks.map((link) => (
            <li key={link.to} className="relative group">
              <Link
                to={link.to}
                onClick={handleNavClick}
                className={`flex items-center rounded-md py-2 transition-colors hover:bg-rose-600/50 hover:text-white text-rose-100 text-base font-medium
                  ${collapsed ? 'justify-center px-0 gap-0' : 'gap-3 px-4'}
                  transition-all duration-300
                `}
                aria-label={link.label}
              >
                <span className="flex-shrink-0">{link.icon}</span>
                <span
                  className={`transition-all duration-200
                    ${collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto ml-3'}
                  `}
                >
                  {link.label}
                </span>
              </Link>
              {/* Tooltip */}
              {collapsed && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-black text-white dark:bg-gray-900 dark:text-white px-3 py-1 rounded shadow-md text-xs font-medium opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 min-w-max">
                  {link.label}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className={`pb-4 flex items-center relative group ${collapsed ? 'justify-center' : 'justify-center'}`}>
        <Link
          to="/profile"
          onClick={handleNavClick}
          className={`flex items-center rounded-lg bg-white/10 hover:bg-rose-700/30 transition-all duration-200
            ${collapsed ? 'justify-center px-0 gap-0 w-10 h-10' : 'gap-2 px-3 py-2'}
          `}
          title={collapsed ? undefined : "Profile"}
          aria-label="Profile"
        >
          <User size={18} />
          <span
            className={`transition-all duration-200
              ${collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto ml-2'}
            `}
          >
            Profile
          </span>
        </Link>
        {/* Tooltip for profile when collapsed */}
        {collapsed && (
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-black text-white dark:bg-gray-900 dark:text-white px-3 py-1 rounded shadow-md text-xs font-medium opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 min-w-max">
            Profile
          </div>
        )}
      </div>
    </aside>
  );
}

function Topbar() {
  // Dark mode toggle state
  const [dark, setDark] = useState(false);
  // Dummy value for bell notification badge
  const unreadCount = 3;
  // For now, just toggle a class on the body for demo
  React.useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);
  return (
    <header className={`h-16 flex items-center justify-between px-6 border-b sticky top-0 z-10 shadow-md bg-white/70 backdrop-blur-md dark:bg-black/80 dark:border-gray-800 transition-colors`}>
      <div className="font-bold text-xl tracking-tight text-rose-600 dark:text-rose-400 select-none">Dashboard</div>
      <div className="flex items-center gap-4">
        <button className="relative group focus:outline-none" aria-label="Notifications">
          <Bell className="text-rose-400 dark:text-rose-300" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center font-semibold border-2 border-white dark:border-black animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>
        <button
          className="rounded-full p-2 bg-rose-50 hover:bg-rose-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors focus:outline-none"
          aria-label="Toggle Dark Mode"
          onClick={() => setDark(d => !d)}
        >
          {dark ? (
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m8.485-8.485l-.707-.707m-12.021 0l-.707.707M21 12h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707" />
            </svg>
          ) : (
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2a10 10 0 000 20 10 10 0 000-20zm0 18a8 8 0 010-16 8 8 0 010 16z" />
            </svg>
          )}
        </button>
        <div className="flex items-center gap-2 cursor-pointer group select-none">
          <span className="w-9 h-9 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-lg transition-colors group-hover:bg-rose-600 shadow-md">
            U
          </span>
        </div>
      </div>
    </header>
  );
}

function Layout() {
  // For mobile, overlay a background when sidebar is open and collapsed==false
  // But for simplicity, we keep sidebar always visible for now
  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-white via-rose-50 to-black overflow-hidden dark:from-black dark:via-gray-900 dark:to-rose-900 transition-colors">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-20 md:ml-0 transition-all duration-300">
        <Topbar />
        <main className="flex-1 p-6 overflow-auto bg-white/80 dark:bg-black/70 transition-colors">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/users" element={<Users />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
