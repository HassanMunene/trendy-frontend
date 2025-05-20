import { useState, useEffect, useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import AdminSidebar from './Sidebar/AdminSidebar';
import MainTopbar from './AdminComponents/MainTopbar';

const AdminLayout = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAdminSidebarForMobile, setIsAdminSidebarForMobile] = useState(false);

    // In mobile screens close the admin sidebar when the route changes
    useEffect(() => {
        setIsAdminSidebarForMobile(false);
    }, [location.pathname]);

    // Check if route is active
    const isActiveRoute = (route) => {
        return location.pathname === route;
    };

    return (
        <div className="flex h-screen w-screen bg-gradient-to-br from-white via-rose-50 to-black overflow-hidden transition-colors">
            <AdminSidebar />
            <div className="flex-1 flex flex-col transition-all duration-300">
                <MainTopbar />
                <main className="flex-1 p-4 overflow-auto bg-white/80 transition-colors">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;