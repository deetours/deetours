"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Plane,
  Inbox,
  Calendar,
  BookOpen,
  ImageIcon,
  Users,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  {
    label: "Overview",
    href: "/admin",
    icon: Home,
  },
  {
    label: "Trips",
    href: "/admin/trips",
    icon: Plane,
    submenu: [
      { label: "All Trips", href: "/admin/trips" },
      { label: "Create Trip", href: "/admin/trips/create" },
    ],
  },
  {
    label: "Leads",
    href: "/admin/leads",
    icon: Inbox,
  },
  {
    label: "Bookings",
    href: "/admin/bookings",
    icon: Calendar,
  },
  {
    label: "Blog",
    href: "/admin/blog",
    icon: BookOpen,
    submenu: [
      { label: "All Posts", href: "/admin/blog" },
      { label: "Create Post", href: "/admin/blog/create" },
    ],
  },
  {
    label: "Media",
    href: "/admin/media",
    icon: ImageIcon,
  },
  {
    label: "Team",
    href: "/admin/team",
    icon: Users,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleSubmenu = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 overflow-y-auto">
      <div className="p-6 border-b border-slate-200">
        <h1 className="text-2xl font-hero text-primary-dark">DeeTours</h1>
        <p className="text-xs text-slate/60 mt-1">Admin Portal</p>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const isExpanded = expandedItems.includes(item.label);

          return (
            <div key={item.label}>
              <div
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer",
                  isActive
                    ? "bg-accent-luxury/10 text-accent-luxury"
                    : "text-slate-700 hover:bg-slate-50"
                )}
                onClick={() => item.submenu && toggleSubmenu(item.label)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-3 flex-1"
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
                {item.submenu && (
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      isExpanded && "rotate-180"
                    )}
                  />
                )}
              </div>

              {/* Submenu */}
              {item.submenu && isExpanded && (
                <div className="pl-4 mt-2 space-y-1">
                  {item.submenu.map((subitem) => (
                    <Link
                      key={subitem.href}
                      href={subitem.href}
                      className={cn(
                        "block px-4 py-2 rounded-lg text-sm transition-all duration-200",
                        pathname === subitem.href
                          ? "bg-accent-luxury/20 text-accent-luxury font-medium"
                          : "text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      {subitem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
