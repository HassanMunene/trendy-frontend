import { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, X, Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import LogoutConfirmationModal from "./LogoutConfirmationModal";

const MainTopbar = ({ toggleSidebar }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const searchRef = useRef(null);
    const dropdownRef = useRef(null);
    const location = useLocation();

    const { logout } = useAuth();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
            if (isSearchOpen && searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSearchOpen]);

    const handleLogout = () => logout();

    const initiateLogout = () => {
        setShowLogoutConfirmation(true);
        setIsProfileDropdownOpen(false);
    };

    const confirmLogout = () => {
        setIsLoggingOut(true);
        setTimeout(() => {
            handleLogout();
            setIsLoggingOut(false);
            setShowLogoutConfirmation(false);
        }, 800);
    };

    const cancelLogout = () => setShowLogoutConfirmation(false);

    return (
        <>
            {/* Mobile Search Overlay */}
            {isSearchOpen && (
                <div className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm">
                    <div
                        className="fixed top-0 left-0 right-0 bg-gray-800 shadow-lg z-50 p-3"
                        ref={searchRef}
                    >
                        <div className="relative flex items-center">
                            <Search className="absolute left-3 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                className="w-full pl-10 pr-10 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
                                placeholder="Search..."
                                autoFocus
                            />
                            <button
                                onClick={() => setIsSearchOpen(false)}
                                className="absolute right-3 text-gray-400 hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Top Bar */}
            <header className="bg-gray-800 border-b border-gray-700 shadow-sm z-30">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {/* Sidebar Toggle */}
                        <button
                            onClick={toggleSidebar}
                            className="text-gray-400 hover:text-white transition-colors"
                            aria-label="Toggle sidebar"
                        >
                            <Menu className="h-6 w-6" />
                        </button>

                        {/* Desktop Search */}
                        <div className="hidden md:block relative w-64">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
                                placeholder="Search..."
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Mobile Search Button */}
                        <button
                            className="md:hidden text-gray-400 hover:text-white"
                            onClick={() => setIsSearchOpen(true)}
                            aria-label="Search"
                        >
                            <Search className="h-5 w-5" />
                        </button>

                        {/* Notifications */}
                        <button className="relative p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700/50 transition-colors">
                            <Bell className="h-6 w-6" />
                            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                className="flex items-center space-x-2 text-sm rounded-full focus:outline-none group"
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                aria-label="User menu"
                            >
                                <div className="relative">
                                    <img
                                        className="h-8 w-8 rounded-full border-2 border-transparent group-hover:border-indigo-500 transition-all"
                                        src="https://ui-avatars.com/api/?name=Admin+User&background=4f46e5&color=fff"
                                        alt="Admin User"
                                    />
                                    <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-gray-800"></span>
                                </div>
                                {!isMobile && (
                                    <>
                                        <span className="text-gray-300 font-medium">Admin User</span>
                                        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                                    </>
                                )}
                            </button>

                            {isProfileDropdownOpen && (
                                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-gray-800 border border-gray-700 focus:outline-none z-50 overflow-hidden transition-all duration-200">
                                    <div className="py-1">
                                        <Link
                                            to="/profile"
                                            className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors"
                                            onClick={() => setIsProfileDropdownOpen(false)}
                                        >
                                            <User className="h-4 w-4 mr-3 text-gray-400" />
                                            Your Profile
                                        </Link>
                                        <Link
                                            to="/settings"
                                            className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors"
                                            onClick={() => setIsProfileDropdownOpen(false)}
                                        >
                                            <Settings className="h-4 w-4 mr-3 text-gray-400" />
                                            Settings
                                        </Link>
                                        <button
                                            onClick={initiateLogout}
                                            className="w-full flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors text-left"
                                        >
                                            <LogOut className="h-4 w-4 mr-3 text-gray-400" />
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Logout Confirmation Modal */}
            {showLogoutConfirmation && (
                <LogoutConfirmationModal
                    cancelLogout={cancelLogout}
                    isLoggingOut={isLoggingOut}
                    confirmLogout={confirmLogout}
                />
            )}
        </>
    )
}

export default MainTopbar;