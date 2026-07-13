"use client";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  CalendarCheck,
  FileText,
  Video,
  ClipboardList,
  LogOut,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { logoutAction } from "@/actions/auth.actions";
import { usePathname } from "next/navigation";

const navItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Courses & Batches", url: "/admin/courses", icon: BookOpen },
  { title: "Enrollments", url: "/admin/enrollments", icon: Users },
  { title: "Attendance", url: "/admin/attendance", icon: CalendarCheck },
  { title: "Materials", url: "/admin/materials", icon: FileText },
  { title: "Live Classes", url: "/admin/live-classes", icon: Video },
  { title: "Tests", url: "/admin/tests", icon: ClipboardList },
  { title: "Help", url: "/admin/help", icon: HelpCircle },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4 font-semibold text-lg group-data-[collapsible=icon]:p-2 flex  justify-center group-data-[collapsible=icon]:justify-center">
          <span className="group-data-[collapsible=icon]:hidden">
            Coaching Admin
          </span>
          <span className="hidden group-data-[collapsible=icon]:flex items-center justify-center size-8 rounded-lg bg-primary text-primary-foreground text-sm font-bold">
            CA
          </span>
        </SidebarHeader>
        <SidebarContent className="flex-1 p-2">
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.url);
              return (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton isActive={isActive}>
                    <Link
                      href={item.url}
                      className="flex items-center gap-2 w-full"
                    >
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <form action={logoutAction}>
            <SidebarMenuButton type="submit">
              <LogOut className="size-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </form>
        </SidebarFooter>
      </Sidebar>

      <main className="w-full">
        <div className="p-4 border-b">
          <SidebarTrigger />
        </div>
        <div className="p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
