"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, ChevronRight, Phone, Mail, Calendar } from "lucide-react";

const statusColors = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  qualified: "bg-green-100 text-green-800",
  proposal_sent: "bg-purple-100 text-purple-800",
  follow_up: "bg-orange-100 text-orange-800",
  converted: "bg-green-100 text-green-800",
  lost: "bg-red-100 text-red-800",
  spam: "bg-gray-100 text-gray-800",
};

const sourceIcons = {
  homepage_inquiry: "🏠",
  trip_inquiry: "✈️",
  contact_form: "📧",
  phone_call: "☎️",
  social_media: "📱",
  referral: "👥",
  other: "❓",
};

export default function LeadsManagementPage() {
  const leads = useQuery(api.leads.list, { limit: 100 });
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  const filteredLeads = leads?.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.phone && lead.phone.includes(searchQuery));

    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesSource = sourceFilter === "all" || lead.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  const stats = {
    total: leads?.length || 0,
    new: leads?.filter((l) => l.status === "new").length || 0,
    contacted: leads?.filter((l) => l.status === "contacted").length || 0,
    qualified: leads?.filter((l) => l.status === "qualified").length || 0,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-hero text-primary-dark">Lead Management</h1>
        <p className="text-slate-600 mt-2">
          {stats.total} total leads • {stats.new} new • {stats.contacted} contacted
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-600 font-medium">New Leads</p>
          <p className="text-3xl font-bold text-blue-900 mt-1">{stats.new}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-600 font-medium">Contacted</p>
          <p className="text-3xl font-bold text-yellow-900 mt-1">{stats.contacted}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-600 font-medium">Qualified</p>
          <p className="text-3xl font-bold text-green-900 mt-1">{stats.qualified}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-sm text-purple-600 font-medium">Conversion Rate</p>
          <p className="text-3xl font-bold text-purple-900 mt-1">
            {stats.total > 0 ? Math.round((5 / stats.total) * 100) : 0}%
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by name, email, or phone..."
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
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="proposal_sent">Proposal Sent</option>
              <option value="follow_up">Follow Up</option>
              <option value="converted">Converted</option>
              <option value="lost">Lost</option>
            </select>

            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-accent-luxury bg-white"
            >
              <option value="all">All Sources</option>
              <option value="homepage_inquiry">Homepage</option>
              <option value="trip_inquiry">Trip Page</option>
              <option value="contact_form">Contact Form</option>
              <option value="phone_call">Phone</option>
              <option value="social_media">Social Media</option>
              <option value="referral">Referral</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardContent className="p-0">
          {filteredLeads && filteredLeads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Source</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Trip Interest</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Created</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead._id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">{lead.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Mail className="w-4 h-4" />
                            {lead.email}
                          </div>
                          {lead.phone && (
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Phone className="w-4 h-4" />
                              {lead.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="text-2xl">{sourceIcons[lead.source as keyof typeof sourceIcons] || "❓"}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          className={statusColors[lead.status as keyof typeof statusColors] || ""}
                        >
                          {lead.status.replace(/_/g, " ").charAt(0).toUpperCase() + lead.status.slice(1).replace(/_/g, " ")}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {lead.tripOfInterest || "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/leads/${lead._id}`}
                          className="inline-flex items-center gap-1 text-accent-luxury hover:text-accent-luxury/80 transition-colors"
                        >
                          <span className="text-sm font-medium">View</span>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-slate-600">No leads found matching your filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
