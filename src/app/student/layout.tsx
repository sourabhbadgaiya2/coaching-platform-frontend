"use client";
import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  FileText,
  Video,
  Bell,
  LogOut,
} from "lucide-react";
import { logoutAction } from "@/actions/auth.actions";
import { usePathname } from "next/navigation";
const navItems = [
  { title: "Dashboard", url: "/student/dashboard", icon: LayoutDashboard },
  { title: "Batches", url: "/student/batches", icon: BookOpen },
  { title: "Attendance", url: "/student/attendance", icon: CalendarCheck },
  { title: "Materials", url: "/student/materials", icon: FileText },
  { title: "Live Classes", url: "/student/live-classes", icon: Video },
  { title: "Tests", url: "/student/tests", icon: ClipboardList },
  { title: "Alerts", url: "/student/notifications", icon: Bell },
];

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen pb-16">
      <div className="flex justify-end p-3">
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-1 text-xs text-muted-foreground"
          >
            <LogOut className="size-4" /> Logout
          </button>
        </form>
      </div>
      <main>{children}</main>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t flex justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.url);
          return (
            <Link
              key={item.url}
              href={item.url}
              className={`flex flex-col items-center gap-1 text-xs p-2 ${isActive ? "text-primary" : "text-muted-foreground"}`}
            >
              <item.icon className="size-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
