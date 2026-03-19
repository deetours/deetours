"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/admin/stat-card";
import { RecentLeadsCard } from "@/components/admin/recent-leads-card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Plane, Inbox, Calendar, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function AdminOverviewPage() {
  const trips = useQuery(api.trips.listAll, {});
  const leads = useQuery(api.leads.list, { limit: 100 });
  const bookings = useQuery(api.bookings.list, {});

  const tripStats = {
    published: trips?.filter((t) => t.status === "published").length || 0,
    draft: trips?.filter((t) => t.status === "draft").length || 0,
    archived: trips?.filter((t) => t.status === "archived").length || 0,
    total: trips?.length || 0,
  };

  const leadStats = {
    new: leads?.filter((l) => l.status === "new").length || 0,
    contacted: leads?.filter((l) => l.status === "contacted").length || 0,
    qualified: leads?.filter((l) => l.status === "qualified").length || 0,
    total: leads?.length || 0,
  };

  const chartData = [
    { name: "Leads", new: leadStats.new, contacted: leadStats.contacted, qualified: leadStats.qualified },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-hero text-primary-dark">Welcome Back</h1>
        <p className="text-slate-600 mt-2">Here's what's happening with DeeTours today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Trips"
          value={tripStats.total}
          description={`${tripStats.published} published`}
          icon={Plane}
          color="blue"
        />
        <StatCard
          title="New Leads"
          value={leadStats.new}
          description={`${leadStats.total} total`}
          icon={Inbox}
          color="amber"
        />
        <StatCard
          title="Bookings"
          value={bookings?.length || 0}
          description="This month"
          icon={Calendar}
          color="green"
        />
        <StatCard
          title="Conversion Rate"
          value={bookings?.length ? Math.round((bookings.length / leadStats.total) * 100) : 0}
          description="%"
          icon={TrendingUp}
          color="purple"
        />
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Lead Pipeline</CardTitle>
            <CardDescription>Status breakdown of all leads</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="new" stackId="a" fill="#f59e0b" />
                <Bar dataKey="contacted" stackId="a" fill="#3b82f6" />
                <Bar dataKey="qualified" stackId="a" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <RecentLeadsCard leads={leads?.slice(0, 5) || []} />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/admin/trips/create"
              className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors"
            >
              <p className="font-medium text-blue-900">+ New Trip</p>
            </Link>
            <Link
              href="/admin/leads"
              className="p-4 bg-amber-50 hover:bg-amber-100 rounded-lg text-center transition-colors"
            >
              <p className="font-medium text-amber-900">View Leads</p>
            </Link>
            <Link
              href="/admin/blog/create"
              className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors"
            >
              <p className="font-medium text-green-900">+ New Blog</p>
            </Link>
            <Link
              href="/admin/media"
              className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors"
            >
              <p className="font-medium text-purple-900">Media Gallery</p>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
