import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Home, Boxes, ListChecks, ShoppingCart,
    Users2, Bell, LineChart, Settings, User, Menu, X
} from "lucide-react";

const navLinks = [
    { to: "/admin", icon: <Home size={20} />, label: "Dashboard" },
    { to: "/admin/products", icon: <Boxes size={20} />, label: "Products" },
    { to: "/admin/categories", icon: <ListChecks size={20} />, label: "Categories" },
    { to: "/admin/orders", icon: <ShoppingCart size={20} />, label: "Orders" },
    { to: "/admin/users", icon: <Users2 size={20} />, label: "Users" },
    { to: "/admin/notifications", icon: <Bell size={20} />, label: "Notifications", badge: 5 },
    { to: "/admin/analytics", icon: <LineChart size={20} />, label: "Analytics" },
    { to: "/admin/profile", icon: <Settings size={20} />, label: "Settings" },
];

interface AdminSidebarProps {
    isMobile: boolean;
    sidebarState: string;
    isActive: (path: string) => boolean;
    setSidebarState: Dispatch<SetStateAction<string>>;
    handleOverlayClick: () => void;
    toggleSidebar: () => void;
    handleNavClick: () => void;
}

const AdminSidebar = ({
    isMobile,
    sidebarState,
    setSidebarState,
    isActive,
    handleOverlayClick,
    toggleSidebar,
    handleNavClick
}: AdminSidebarProps) => {
    return (
        <>
            {/* Mobile hamburger button (only visible when sidebar is hidden) */}
            {isMobile && sidebarState === 'hidden' && (
                <button
                    onClick={() => setSidebarState('collapsed')}
                    className="fixed z-30 left-4 top-4 p-2 !rounded-md bg-gray-800 text-white shadow-lg md:hidden"
                    aria-label="Open menu"
                >
                    <Menu size={24} />
                </button>
            )}

            {/* Overlay for mobile when sidebar is visible */}
            {isMobile && sidebarState !== 'hidden' && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={handleOverlayClick}
                />
            )}

            <aside
                className={`h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col transition-all duration-300 ease-in-out
                    ${sidebarState === 'hidden' ? '-translate-x-full' : ''}
                    ${sidebarState === 'collapsed' ? 'w-20' : 'w-64'}
                    fixed md:relative z-40
                    shadow-xl shadow-black/40
                    border-r border-gray-700
                `}
            >
                {/* Logo/Header Section */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700">
                    {sidebarState === 'expanded' ? (
                        <div className="flex items-center space-x-2">
                            <span className="font-bold text-lg tracking-tight truncate">Admin Panel</span>
                        </div>
                    ) : (
                        <div></div>
                    )}

                    <button
                        className="text-gray-400 hover:text-white focus:outline-none transition-colors duration-200"
                        aria-label={sidebarState === 'expanded' ? "Collapse sidebar" : "Expand sidebar"}
                        onClick={toggleSidebar}
                    >
                        {sidebarState === 'expanded' ? (
                            <X size={20} />
                        ) : (
                            <Menu size={20} />
                        )}
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                    <ul className="space-y-1 px-2">
                        {navLinks.map((link) => (
                            <li key={link.to} className="relative group">
                                <Link
                                    to={link.to}
                                    onClick={handleNavClick}
                                    className={`flex items-center rounded-lg py-2.5 transition-all duration-200 ease-out
                                        ${sidebarState === 'collapsed' ? 'justify-center px-0 mx-2' : 'px-3 mx-1'}
                                        ${isActive(link.to) ? 'text-white bg-gray-700/80' : 'text-gray-300 hover:text-white hover:bg-gray-700/60'}
                                        relative
                                    `}
                                    aria-label={link.label}
                                >
                                    <span className="flex-shrink-0 relative">
                                        {link.icon}
                                        {link.badge && (
                                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                                {link.badge}
                                            </span>
                                        )}
                                    </span>
                                    <span
                                        className={`transition-all duration-200 ease-out
                                            ${sidebarState !== 'expanded' ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto ml-3'}
                                        `}
                                    >
                                        {link.label}
                                    </span>
                                    {isActive(link.to) && (
                                        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-l-lg"></span>
                                    )}
                                </Link>

                                {/* Tooltip for collapsed state */}
                                {sidebarState === 'collapsed' && (
                                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-xl text-sm font-medium opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 min-w-max border border-gray-700 flex items-center">
                                        {link.label}
                                        {link.badge && (
                                            <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                                {link.badge}
                                            </span>
                                        )}
                                        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45 border-l border-t border-gray-700"></div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Profile Section */}
                <div className={`p-3 border-t border-gray-700`}>
                    <Link
                        to="/profile"
                        onClick={handleNavClick}
                        className={`flex items-center rounded-lg transition-all duration-200 ease-out
                            ${sidebarState === 'collapsed' ? 'justify-center p-2' : 'p-2'}
                            ${isActive('/profile') ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700/60'}
                            relative group
                        `}
                        aria-label="Profile"
                    >
                        <div className="relative">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                                <User size={16} />
                            </div>
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-800"></div>
                        </div>
                        {sidebarState === 'expanded' && (
                            <div className="ml-3 overflow-hidden">
                                <p className="text-sm font-medium text-white truncate">John Doe</p>
                                <p className="text-xs text-gray-400 truncate">Admin</p>
                            </div>
                        )}

                        {/* Profile Tooltip */}
                        {sidebarState === 'collapsed' && (
                            <div className="absolute left-full bottom-0 ml-4 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-xl text-sm font-medium opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 min-w-max border border-gray-700">
                                <div className="flex items-center space-x-2">
                                    <div className="relative">
                                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                                            <User size={16} />
                                        </div>
                                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-900"></div>
                                    </div>
                                    <div>
                                        <p className="font-medium">John Doe</p>
                                        <p className="text-xs text-gray-400">Admin</p>
                                    </div>
                                </div>
                                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45 border-l border-t border-gray-700"></div>
                            </div>
                        )}
                    </Link>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;