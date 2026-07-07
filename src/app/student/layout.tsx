import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  ClipboardList,
} from "lucide-react";

const navItems = [
  { title: "Dashboard", url: "/student/dashboard", icon: LayoutDashboard },
  { title: "Batches", url: "/student/batches", icon: BookOpen },
  { title: "Materials", url: "/student/materials", icon: BookOpen },
  { title: "Attendance", url: "/student/attendance", icon: CalendarCheck },
  { title: "Tests", url: "/student/tests", icon: ClipboardList },
];

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pb-16">
      <main>{children}</main>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t flex justify-around py-2">
        {navItems.map((item) => (
          <Link
            key={item.url}
            href={item.url}
            className="flex flex-col items-center gap-1 text-xs text-muted-foreground p-2"
          >
            <item.icon className="size-5" />
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
