"use client";

import { useTheme } from "next-themes";
import { logoutAction } from "@/actions/auth.actions";
import {
  Settings,
  Palette,
  Sun,
  Moon,
  Laptop,
  LogOut,
  PanelLeft,
} from "lucide-react";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

import { useSidebar, SidebarMenuButton } from "@/components/ui/sidebar";

export function SettingsMenu() {
  const { setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const { open, toggleSidebar } = useSidebar();

  return (
    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
      <DropdownMenuTrigger>
        <SidebarMenuButton>
          <Settings className="size-4" />
          <span>Settings</span>
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Palette className="mr-2 size-4" />
            Theme
          </DropdownMenuSubTrigger>

          <DropdownMenuSubContent>
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
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <form action={logoutAction} className="w-full">
            <button type="submit" className="flex w-full items-center gap-2">
              <LogOut className="size-4" />
              Logout
            </button>
          </form>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            toggleSidebar();
            setMenuOpen(false);
          }}
        >
          <PanelLeft className="mr-2 size-4" />
          <span>{open ? "Collapse Sidebar" : "Expand Sidebar"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
