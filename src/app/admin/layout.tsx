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
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4 font-semibold text-lg">
          Coaching Admin
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton>
                  <Link
                    href={item.url}
                    className="flex items-center gap-2 w-full"
                  >
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
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
