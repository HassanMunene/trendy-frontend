// When we click the userProfile on the Admin sidebar we see the UserMenu
import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Settings, Bell, HelpCircle, LogOut, X } from "lucide-react";

import { useAuth } from "../../../context/AuthContext";
import LogoutConfirmationModal from "../AdminComponents/LogoutConfirmationModal";

const UserMenu = ({ userMenuOpen, setUserMenuOpen, isAdminSidebarForMobile }) => {
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const { logout, user: currentUser } = useAuth();

    const handleLogout = () => {
        logout();
    }

    const initiateLogout = () => {
        setShowLogoutConfirmation(true);
    }

    const confirmLogout = () => {
        setIsLoggingOut(true);
        // Add a small delay for better UX
        setTimeout(() => {
            handleLogout();
            setIsLoggingOut(false);
            setShowLogoutConfirmation(false);
        }, 800);
    };

    const cancelLogout = () => {
        setShowLogoutConfirmation(false);
    };

    const closeMenu = () => {
        setUserMenuOpen(false);
    };

    return (
        <>
            {userMenuOpen && (
                <>
                    {/* overlay when on mobile screens */}
                    {isAdminSidebarForMobile && (
                        <div onClick={closeMenu} className="fixed inset-0 bg-black/50 z-40 md:hidden"></div>
                    )}
                    <div className={`fixed z-50 w-64 bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-200 border border-gray-500 ${isAdminSidebarForMobile ? 'left-4 top-4' : 'left-65 top-16'}`}>
                        {/* Header with close button */}
                        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-50 to-white border-b border-gray-100">
                            <div className="flex items-center space-x-3">
                                <img
                                    src={currentUser.avatar}
                                    alt={currentUser.username}
                                    className="w-10 h-10 rounded-full border-2 border-indigo-200 shadow-sm"
                                />
                                <div>
                                    <p className="font-semibold text-gray-900">{currentUser.username}</p>
                                    <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                                        {currentUser.role}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={closeMenu}
                                className="p-1 !rounded-full hover:bg-gray-200 transition-colors"
                                aria-label="Close menu"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* User email */}
                        <div className="px-4 pb-3 mt-1 text-xs text-gray-500">
                            {currentUser.email}
                        </div>

                        {/* Menu items */}
                        <div className="py-1 max-h-96 overflow-y-auto">
                            <Link
                                to="/admin/profile"
                                onClick={closeMenu}
                                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-150"
                            >
                                <User className="w-5 h-5 mr-3 text-indigo-600" />
                                <span>My Profile</span>
                                <span className="ml-auto text-xs text-indigo-600 font-medium">New</span>
                            </Link>
                            <Link
                                to="/admin/messages"
                                onClick={closeMenu}
                                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-150"
                            >
                                <Mail className="w-5 h-5 mr-3 text-indigo-600" />
                                <span>Messages</span>
                                <span className="ml-auto px-2 py-0.5 text-xs font-medium bg-indigo-600 text-white rounded-full">3</span>
                            </Link>
                            <Link
                                to="/admin/profile"
                                onClick={closeMenu}
                                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-150"
                            >
                                <Settings className="w-5 h-5 mr-3 text-indigo-600" />
                                Account Settings
                            </Link>
                            <a
                                href="#"
                                onClick={closeMenu}
                                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-150"
                            >
                                <Bell className="w-5 h-5 mr-3 text-indigo-600" />
                                <span>Notifications</span>
                                <span className="ml-auto px-2 py-0.5 text-xs font-medium bg-red-500 text-white rounded-full">5+</span>
                            </a>

                            <div className="border-t border-gray-100 my-1"></div>

                            <a
                                href="#"
                                onClick={closeMenu}
                                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-150"
                            >
                                <HelpCircle className="w-5 h-5 mr-3 text-indigo-600" />
                                Help Center
                            </a>

                            <div className="border-t border-gray-100 my-1"></div>

                            <button
                                onClick={initiateLogout}
                                className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                            >
                                <LogOut className="w-5 h-5 mr-3" />
                                Sign Out
                            </button>
                        </div>

                        {/* Footer */}
                        <div className="px-4 py-2 text-xs text-gray-400 bg-gray-50 border-t border-gray-100">
                            Last login: Today at 12:45 PM
                        </div>
                    </div>
                </>
            )}

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
};

export default UserMenu;