"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, Eye, DollarSign } from "lucide-react";

const statusColors = {
  inquiry_confirmed: "bg-blue-100 text-blue-800",
  deposit_paid: "bg-yellow-100 text-yellow-800",
  fully_paid: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-green-100 text-green-800",
};

export default function BookingsManagementPage() {
  const bookings = useQuery(api.bookings.list, {});
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBookings = bookings?.filter((booking) => {
    const matchesSearch =
      booking.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerEmail?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: bookings?.length || 0,
    pending: bookings?.filter((b) => b.status === "inquiry_confirmed").length || 0,
    confirmed: bookings?.filter((b) => b.status === "deposit_paid").length || 0,
    completed: bookings?.filter((b) => b.status === "completed").length || 0,
    revenue: (bookings || []).reduce((sum, b) => sum + (b.totalAmount || 0), 0),
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-hero text-primary-dark">Bookings</h1>
        <p className="text-slate-600 mt-2">
          {stats.total} total bookings • ${stats.revenue.toLocaleString()} revenue
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-600 font-medium">Pending</p>
          <p className="text-3xl font-bold text-blue-900 mt-1">{stats.pending}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-600 font-medium">Deposit Paid</p>
          <p className="text-3xl font-bold text-yellow-900 mt-1">{stats.confirmed}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-600 font-medium">Completed</p>
          <p className="text-3xl font-bold text-green-900 mt-1">{stats.completed}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-sm text-purple-600 font-medium">Revenue</p>
          <p className="text-2xl font-bold text-purple-900 mt-1">
            ${stats.revenue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by name or email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-accent-luxury bg-white"
            >
              <option value="all">All Statuses</option>
              <option value="inquiry_confirmed">Inquiry Confirmed</option>
              <option value="deposit_paid">Deposit Paid</option>
              <option value="fully_paid">Fully Paid</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardContent className="p-0">
          {filteredBookings && filteredBookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Trip
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Date
                    </th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">{booking.customerName}</p>
                        <p className="text-sm text-slate-500">{booking.customerEmail}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {booking.tripTitle || "—"}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          className={
                            statusColors[booking.status as keyof typeof statusColors] || ""
                          }
                        >
                          {booking.status.replace(/_/g, " ")}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-slate-400" />
                          {booking.totalAmount?.toLocaleString() || "0"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-slate-600">No bookings found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
