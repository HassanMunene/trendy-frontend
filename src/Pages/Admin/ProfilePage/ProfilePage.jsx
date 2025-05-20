import { User, Lock, ChevronLeft, Edit, LogOut, Menu, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../../../context/AuthContext";
import LogoutConfirmationModal from "../AdminComponents/LogoutConfirmationModal";
import OverviewTab from "./OverviewTab";
import SecurityTab from "./SecurityTab";
import EditProfileModal from "./EditProfileModal";

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showProfileEditModal, setShowProfileEditModal] = useState(false);
    const { logout, updateUserToLocalstorage, user } = useAuth();

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

    const handleSaveProfile = (updateData) => {
        // call a function in the AuthContext that saves the user data to the localstorage
        updateUserToLocalstorage(updateData);
    }

    return (
        <div className="flex flex-col h-full">
            {/* Header section */}
            <div className="bg-white border-b border-gray-100 rounded-md mb-1">
                <div className="px-4 py-3 md:px-6 md:py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            to="/admin"
                            className="flex items-center group transition-all duration-200"
                        >
                            <div className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
                                <ChevronLeft className="w-5 h-5 text-indigo-600 group-hover:text-indigo-800 transition-colors" />
                            </div>
                            <span className="ml-3 font-medium text-gray-700 hidden sm:inline transition-colors group-hover:text-gray-900">
                                Dashboard
                            </span>
                        </Link>
                        <div className="">
                            <h2 className="text-lg md:text-xl font-semibold text-gray-800 bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                                Profile Settings
                            </h2>
                            <div className="hidden md:block h-0.5 w-8 mx-auto mt-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden p-2 !rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                        >
                            <Menu className="w-5 h-5 text-gray-600" />
                        </button>

                        {/* Desktop actions (optional) */}
                        <div className="hidden md:flex items-center space-x-3">
                            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                                <Settings className="w-5 h-5 text-gray-600" />
                            </button>
                            <button
                                onClick={initiateLogout}
                                className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {showMobileMenu && (
                <div className="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden" onClick={() => setShowMobileMenu(false)}>
                    <div className="absolute right-0 top-16 w-64 bg-white shadow-lg rounded-l-lg p-4">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`w-full text-left py-3 px-4 flex items-center ${activeTab === 'overview' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'}`}
                        >
                            <User className="w-5 h-5 mr-2" />
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`w-full text-left py-3 px-4 flex items-center ${activeTab === 'security' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'}`}
                        >
                            <Lock className="w-5 h-5 mr-2" />
                            Security
                        </button>
                        <button
                            onClick={() => setShowLogoutConfirmation(true)}
                            className="w-full text-left py-3 px-4 flex items-center text-red-600 mt-2"
                        >
                            <LogOut className="w-5 h-5 mr-2" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}

            <div className="flex-1 overflow-auto rounded-md">
                {/* Profile Header seaction*/}
                <div className="relative">
                    <div className="h-40 md:h-48 bg-gradient-to-r from-indigo-600 to-purple-700"></div>
                    <div className="absolute -bottom-12 md:-bottom-16 left-4 md:left-6">
                        <div className="relative">
                            <img
                                src={user.avatar}
                                alt={user.username}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl"
                            />
                            <button
                                onClick={() => setShowProfileEditModal(true)}
                                className="absolute bottom-2 right-0 bg-indigo-600 text-white p-1 md:p-2 !rounded-full shadow-md hover:bg-indigo-700 transition-all transform hover:scale-105"
                            >
                                <Edit className="w-3 h-3 md:w-5 md:h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Profile Info section */}
                <div className="mt-16 md:mt-20 md:px-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 md:mb-8">
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900">{user.username}</h2>
                            <div className="flex items-center mt-2">
                                <span className="px-2 py-0.5 md:px-3 md:py-1 bg-indigo-100 text-indigo-800 text-xs md:text-sm font-medium rounded-full">
                                    {user.role}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowProfileEditModal(true)}
                            className="self-start md:self-auto flex items-center px-4 py-2 md:px-5 md:py-2.5 bg-indigo-600 text-white !rounded-lg hover:bg-indigo-700 transition-all transform hover:-translate-y-0.5 shadow-md text-sm md:text-base"
                        >
                            <Edit className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                            Edit Profile
                        </button>
                    </div>

                    {/* Tabs section. */}
                    <div className="mb-6 md:mb-8 overflow-x-auto">
                        <div className="flex border-b border-gray-200 min-w-max">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`py-3 px-4 md:py-4 md:px-6 font-medium text-xs md:text-sm flex items-center border-b-2 ${activeTab === 'overview' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                            >
                                <User className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('security')}
                                className={`py-3 px-4 md:py-4 md:px-6 font-medium text-xs md:text-sm flex items-center border-b-2 ${activeTab === 'security' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                            >
                                <Lock className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                                Security
                            </button>
                        </div>
                    </div>

                    {/* Tab Content - Mobile Responsive */}
                    <div className="pb-8 md:pb-12">
                        {activeTab === 'overview' && <OverviewTab user={user} />}
                        {activeTab === 'security' && <SecurityTab />}
                    </div>
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutConfirmation && (
                <LogoutConfirmationModal
                    cancelLogout={cancelLogout}
                    isLoggingOut={isLoggingOut}
                    confirmLogout={confirmLogout}
                />
            )}

            {showProfileEditModal && (
                <EditProfileModal
                    user={user}
                    onClose={() => setShowProfileEditModal(false)}
                    onSave={handleSaveProfile}
                />
            )}
        </div>
    );
};

export default ProfilePage;