// "use client";
// import Link from "next/link";
// import {
//   LayoutDashboard,
//   BookOpen,
//   CalendarCheck,
//   ClipboardList,
//   FileText,
//   Video,
//   Bell,
//   LogOut,
// } from "lucide-react";
// import { logoutAction } from "@/actions/auth.actions";
// import { usePathname } from "next/navigation";
// import { ThemeToggle } from "@/components/ThemeToggle";
// const navItems = [
//   { title: "Dashboard", url: "/student/dashboard", icon: LayoutDashboard },
//   { title: "Batches", url: "/student/batches", icon: BookOpen },
//   { title: "Attendance", url: "/student/attendance", icon: CalendarCheck },
//   { title: "Materials", url: "/student/materials", icon: FileText },
//   { title: "Live Classes", url: "/student/live-classes", icon: Video },
//   { title: "Tests", url: "/student/tests", icon: ClipboardList },
//   { title: "Alerts", url: "/student/notifications", icon: Bell },
// ];

// export default function StudentLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   return (
//     <div className="min-h-screen pb-16">
//       <div className="flex items-center gap-4 justify-end p-3">
//         <form action={logoutAction}>
//           <button
//             type="submit"
//             className="flex items-center gap-1 text-xs text-muted-foreground"
//           >
//             <LogOut className="size-4" /> Logout
//           </button>
//         </form>
//         <ThemeToggle />
//       </div>
//       <main>{children}</main>

//       {/* Mobile bottom navigation */}
//       <nav className="fixed bottom-0 left-0 right-0 bg-background border-t flex justify-around py-2">
//         {navItems.map((item) => {
//           const isActive = pathname.startsWith(item.url);
//           return (
//             <Link
//               key={item.url}
//               href={item.url}
//               className={`flex flex-col items-center gap-1 text-xs p-2 ${isActive ? "text-primary" : "text-muted-foreground"}`}
//             >
//               <item.icon className="size-5" />
//               {item.title}
//             </Link>
//           );
//         })}
//       </nav>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAction } from "@/actions/auth.actions";

import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";

import {
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  FileText,
  Video,
  Bell,
  LogOut,
  MoreHorizontal,
  Palette,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  {
    title: "Dashboard",
    url: "/student/dashboard",
    icon: LayoutDashboard,
    group: "bottom",
  },
  {
    title: "Batches",
    url: "/student/batches",
    icon: BookOpen,
    group: "bottom",
  },
  {
    title: "Live Classes",
    url: "/student/live-classes",
    icon: Video,
    group: "bottom",
  },
  {
    title: "Tests",
    url: "/student/tests",
    icon: ClipboardList,
    group: "bottom",
  },
  {
    title: "Attendance",
    url: "/student/attendance",
    icon: CalendarCheck,
    group: "more",
  },
  {
    title: "Materials",
    url: "/student/materials",
    icon: FileText,
    group: "more",
  },
  {
    title: "Alerts",
    url: "/student/notifications",
    icon: Bell,
    group: "more",
  },
] as const;

const bottomNav = navigation.filter((item) => item.group === "bottom");
const moreNav = navigation.filter((item) => item.group === "more");

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { setTheme } = useTheme();
  return (
    <div className="min-h-screen bg-background pb-20">
      <main>{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background">
        <div className="mx-auto flex h-16 max-w-md items-center justify-around">
          {bottomNav.map((item) => {
            const isActive = pathname.startsWith(item.url);

            return (
              <Link
                key={item.url}
                href={item.url}
                className={`flex min-w-16 flex-col items-center gap-1 transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="size-5" />
                <span className="text-[11px] font-medium">{item.title}</span>
              </Link>
            );
          })}

          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="flex min-w-16 flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
                <MoreHorizontal className="size-5" />
                <span className="text-[11px] font-medium">More</span>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="top" align="end" className="mb-2 w-60">
              {moreNav.map((item) => {
                const isActive = pathname.startsWith(item.url);

                return (
                  <DropdownMenuItem
                    key={item.url}
                    className={isActive ? "text-primary" : ""}
                    onClick={() => router.push(item.url)}
                  >
                    <item.icon className="mr-2 size-4" />
                    {item.title}
                  </DropdownMenuItem>
                );
              })}

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 size-4" />
                Light
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 size-4" />
                Dark
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Laptop className="mr-2 size-4" />
                System
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <form action={logoutAction} className="w-full">
                  <button
                    type="submit"
                    className="flex w-full items-center gap-2"
                  >
                    <LogOut className="size-4" />
                    Logout
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
}
