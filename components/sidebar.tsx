"use client";

import { cn } from "@/lib/utils";
import { Home, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();

  const routes = [
    {
      label: "Home",
      icon: Home,
      href: "/",
    },
    {
      label: "Create",
      icon: Plus,
      href: "/companion/create",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ];

  return (
    <div className="flex flex-col h-full p-1 space-y-2 pt-3 w-full">
      {routes.map((route) => (
        <Link key={route.href} href={route.href}>
          <div
            role="button"
            className={cn(
              "flex flex-col items-center text-muted-foreground hover:text-white space-y-2 p-3 transition rounded-lg hover:bg-primary/10",
              pathname === route.href && "bg-primary/10 text-white"
            )}
          >
            <route.icon className="h-5 w-5" />
            <span className="text-xs">{route.label}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};
