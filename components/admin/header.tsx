"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Bell, Search } from "lucide-react";

export function AdminHeader() {
  const { user } = useUser();

  return (
    <header className="bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative hidden md:block flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-accent-luxury focus:bg-white transition-all duration-200"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative p-2 text-slate-600 hover:text-slate-900 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-slate-900">{user?.firstName || "Admin"}</p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
          <UserButton />
        </div>
      </div>
    </header>
  );
}
