import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import AdminSidebar from './Sidebar/AdminSidebar';
import MainTopbar from './AdminComponents/MainTopbar';

const AdminLayout = () => {
    const [sidebarState, setSidebarState] = useState('expanded');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const location = useLocation();

    // Handle responsive behavior
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) {
                setSidebarState('hidden');
            } else {
                setSidebarState('expanded');
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        if (!isMobile) {
            setSidebarState((prev) => (
                prev === 'expanded' ? 'collapsed' : 'expanded'
            ));
        } else {
            // Mobile cycle: hidden -> expanded -> hidden
            setSidebarState((prev) => (
                prev === 'hidden' ? 'expanded' : 'hidden'
            ));
        }
    };

    const handleNavClick = () => {
        if (isMobile && sidebarState !== 'hidden') {
            setSidebarState('hidden');
        }
    };

    const isActive = (path: string) => location.pathname === path;

    // Mobile overlay click handler
    const handleOverlayClick = () => {
        setSidebarState('hidden');
    };

    return (
        <div className="flex h-screen w-screen bg-gradient-to-br from-white via-rose-50 to-black overflow-hidden transition-colors">
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
        </div>
    );
};

export default AdminLayout;