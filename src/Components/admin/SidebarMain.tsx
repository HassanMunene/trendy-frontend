import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
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

export function SidebarMain() {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {navLinks.map((item: any) => (
                    <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton tooltip={item.label}>
                            {item.icon}
                            <span>{item.label}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
