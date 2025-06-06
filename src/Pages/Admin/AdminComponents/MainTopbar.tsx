import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, X, Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import LogoutConfirmationModal from "./LogoutConfirmationModal";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";

interface MainTopbarProps {
    toggleSidebar: () => void;
    isMobile: boolean;
}

const MainTopbar = ({ toggleSidebar, isMobile }: MainTopbarProps) => {
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const { logout } = useAuth();

    const handleLogout = () => logout();

    const initiateLogout = () => {
        setShowLogoutConfirmation(true);
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
            {/* Main Top Bar */}
            <header className="bg-gray-900 border-b border-gray-700 shadow-sm z-30">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {/* Sidebar Toggle */}
                        <button
                            onClick={toggleSidebar}
                            className="text-gray-400 hover:text-white transition-colors md:hidden"
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
                        {/* Mobile Search Button WITH A DIALOG*/}
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="md:hidden text-gray-400 hover:text-white" aria-label="Search">
                                    <Search className="h-5 w-5" />
                                </button>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-800 border border-gray-700 p-4 md:hidden">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full pl-10 pr-10 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
                                        autoFocus
                                    />
                                    {/* Optional close button if you want extra control */}
                                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            </DialogContent>
                        </Dialog>

                        {/* Notifications */}
                        <button className="relative p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700/50 transition-colors">
                            <Bell className="h-6 w-6" />
                            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                        </button>

                        {/* Profile Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    className="flex items-center space-x-2 text-sm rounded-full focus:outline-none group cursor-pointer"
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
                                        </>
                                    )}
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link to="/profile" className="w-full flex items-center">
                                        <User className="h-4 w-4 mr-3 text-gray-400" />
                                        Your Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link to="/settings" className="w-full flex items-center">
                                        <Settings className="h-4 w-4 mr-3 text-gray-400" />
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <button onClick={initiateLogout} className="w-full flex items-center">
                                        <LogOut className="h-4 w-4 mr-3 text-gray-400" />
                                        Sign out
                                    </button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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