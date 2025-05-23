import {
    Sidebar, SidebarContent, SidebarFooter,
    SidebarHeader, SidebarRail,
} from "@/components/ui/sidebar"

import { SidebarMain } from "./SidebarMain";
import { SidebarLogo } from "./SidebarLogo";
import { SidebarUser } from "./SidebarUser";
import * as React from "react";

export function AdminSidebar ({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarLogo />
            </SidebarHeader>
            <SidebarContent>
                <SidebarMain />
            </SidebarContent>
            <SidebarFooter>
                <SidebarUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}