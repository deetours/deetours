"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Mail, Shield } from "lucide-react";

const roleColors = {
  super_admin: "bg-red-100 text-red-800",
  admin: "bg-purple-100 text-purple-800",
  trip_manager: "bg-blue-100 text-blue-800",
  support: "bg-green-100 text-green-800",
  customer: "bg-slate-100 text-slate-800",
};

export default function TeamManagementPage() {
  const users = useQuery(api.users.list, {});

  const stats = {
    total: users?.length || 0,
    admins: users?.filter((u) => u.role === "admin" || u.role === "super_admin").length || 0,
    managers: users?.filter((u) => u.role === "trip_manager").length || 0,
    support: users?.filter((u) => u.role === "support").length || 0,
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-hero text-primary-dark">Team Management</h1>
          <p className="text-slate-600 mt-2">
            {stats.total} team members • {stats.admins} admins • {stats.managers} managers
          </p>
        </div>
        <Button className="bg-accent-luxury hover:bg-opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <p className="text-sm text-slate-600 font-medium">Total Members</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600 font-medium">Administrators</p>
          <p className="text-3xl font-bold text-red-900 mt-1">{stats.admins}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-600 font-medium">Trip Managers</p>
          <p className="text-3xl font-bold text-blue-900 mt-1">{stats.managers}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-600 font-medium">Support Team</p>
          <p className="text-3xl font-bold text-green-900 mt-1">{stats.support}</p>
        </div>
      </div>

      {/* Team Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Manage your team's roles and permissions</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {users && users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Joined
                    </th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">{user.name || "—"}</p>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={`mailto:${user.email}`}
                          className="text-accent-luxury hover:underline flex items-center gap-1"
                        >
                          <Mail className="w-4 h-4" />
                          {user.email}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          className={
                            roleColors[user.role as keyof typeof roleColors] ||
                            "bg-slate-100 text-slate-800"
                          }
                        >
                          <Shield className="w-3 h-3 mr-1" />
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          className={
                            user.suspended
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }
                        >
                          {user.suspended ? "Suspended" : "Active"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(user._creationTime).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-slate-600 hover:text-slate-900 text-sm font-medium">
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-slate-600">No team members yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Roles Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-slate-900 flex items-center gap-2">
                <Badge className="bg-red-100 text-red-800">Super Admin</Badge>
              </p>
              <p className="text-sm text-slate-600 mt-1">
                Full system access. Can manage all trips, leads, team members, and settings.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-900 flex items-center gap-2">
                <Badge className="bg-purple-100 text-purple-800">Admin</Badge>
              </p>
              <p className="text-sm text-slate-600 mt-1">
                Can manage trips, leads, bookings, and view team. Cannot manage roles.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-900 flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800">Trip Manager</Badge>
              </p>
              <p className="text-sm text-slate-600 mt-1">
                Can create, edit, and manage trips. Can view leads and bookings.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-900 flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">Support</Badge>
              </p>
              <p className="text-sm text-slate-600 mt-1">
                Can manage leads, notes, and basic inquiry handling.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
