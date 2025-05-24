import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Menu, Search, X, Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";

// import AdminSidebar from './Sidebar/AdminSidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import MainTopbar from './AdminComponents/MainTopbar';
import { ThemeModeToggler } from '@/components/ThemeModeToggler';

const AdminLayout = () => {
    return (
        <>
            <SidebarProvider>
                <AdminSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1 cursor-pointer" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
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
                            {/* Notifications */}
                            <button className="relative p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700/50 transition-colors">
                                <Bell className="h-6 w-6" />
                                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                            </button>

                            <ThemeModeToggler />

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
                                        <button onClick={() => {}} className="w-full flex items-center">
                                            <LogOut className="h-4 w-4 mr-3 text-gray-400" />
                                            Sign out
                                        </button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                            <div className="aspect-video rounded-xl bg-muted/50" />
                            <div className="aspect-video rounded-xl bg-muted/50" />
                            <div className="aspect-video rounded-xl bg-muted/50" />
                        </div>
                        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
                    </div>
                </SidebarInset>
            </SidebarProvider>
            {/* <div className="flex h-screen w-screen bg-gradient-to-br from-white via-rose-50 to-black overflow-hidden transition-colors">
            <AdminSidebar
                isMobile={isMobile}
                sidebarState={sidebarState}
                isActive={isActive}
                setSidebarState={setSidebarState}
                handleOverlayClick={handleNavClick}
                toggleSidebar={toggleSidebar}
                handleNavClick={handleNavClick}
            />
            <div className="flex-1 flex flex-col transition-all duration-300">
                <MainTopbar toggleSidebar={toggleSidebar} isMobile={isMobile} />
                <main className="flex-1 p-4 overflow-auto bg-white/80 transition-colors">
                    <Outlet />
                </main>
            </div>
        </div> */}
        </>
    );
};

export default AdminLayout;