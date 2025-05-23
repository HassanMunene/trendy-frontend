import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"



// import AdminSidebar from './Sidebar/AdminSidebar';
import { AdminSidebar } from '@/Components/admin/AdminSidebar';
import MainTopbar from './AdminComponents/MainTopbar';

const AdminLayout = () => {
    return (
        <>
            <SidebarProvider>
                <AdminSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="#">
                                            Building Your Application
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
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