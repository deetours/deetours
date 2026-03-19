"use client";

import { useParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Calendar, Edit, Save, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const statusOptions = [
  "new",
  "contacted",
  "qualified",
  "proposal_sent",
  "follow_up",
  "converted",
  "lost",
  "spam",
];

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

export default function LeadDetailPage() {
  const params = useParams();
  const leadId = params.leadId as string;

  const lead = useQuery(api.leads.getById, { leadId: leadId as Id<"leads"> });
  const notes = useQuery(api.leadNotes.listByLead, { leadId: leadId as Id<"leads"> });

  const updateStatus = useMutation(api.leads.updateStatus);
  const createNote = useMutation(api.leadNotes.create);

  const [newNote, setNewNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingStatus, setEditingStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(lead?.status || "new");

  const handleStatusChange = async () => {
    try {
      setIsSubmitting(true);
      await updateStatus({
        leadId: leadId as Id<"leads">,
        status: selectedStatus,
      });
      toast.success("Status updated!");
      setEditingStatus(false);
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      setIsSubmitting(true);
      await createNote({
        leadId: leadId as Id<"leads">,
        content: newNote,
        type: "note",
      });
      toast.success("Note added!");
      setNewNote("");
    } catch (error) {
      toast.error("Failed to add note");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!lead) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Lead Header */}
        <Card>
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl font-hero text-primary-dark">{lead.name}</h1>
                <p className="text-slate-600 mt-2">Lead ID: {leadId}</p>
              </div>
              <Badge className={statusColors[lead.status as keyof typeof statusColors]}>
                {lead.status.replace(/_/g, " ")}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-slate-600">Email</label>
                <div className="flex items-center gap-2 mt-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <a href={`mailto:${lead.email}`} className="text-accent-luxury hover:underline">
                    {lead.email}
                  </a>
                </div>
              </div>

              {lead.phone && (
                <div>
                  <label className="text-sm font-medium text-slate-600">Phone</label>
                  <div className="flex items-center gap-2 mt-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <a href={`tel:${lead.phone}`} className="text-accent-luxury hover:underline">
                      {lead.phone}
                    </a>
                  </div>
                </div>
              )}

              {lead.companyName && (
                <div>
                  <label className="text-sm font-medium text-slate-600">Company</label>
                  <p className="mt-2 text-slate-900">{lead.companyName}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-slate-600">Created</label>
                <div className="flex items-center gap-2 mt-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-900">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lead Details */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-600">Trip of Interest</label>
              <p className="mt-2 text-slate-900">{lead.tripOfInterest || "Not specified"}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">Source</label>
              <p className="mt-2 text-slate-900 capitalize">{lead.source.replace(/_/g, " ")}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">Priority</label>
              <p className="mt-2">
                <Badge
                  className={
                    lead.priority === "high"
                      ? "bg-red-100 text-red-800"
                      : lead.priority === "medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }
                >
                  {lead.priority}
                </Badge>
              </p>
            </div>

            {lead.message && (
              <div>
                <label className="text-sm font-medium text-slate-600">Message</label>
                <p className="mt-2 text-slate-900 whitespace-pre-wrap">{lead.message}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notes Section */}
        <Card>
          <CardHeader>
            <CardTitle>Internal Notes</CardTitle>
            <CardDescription>Add notes about this lead</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="space-y-2">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add an internal note..."
                rows={3}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-accent-luxury resize-none"
              />
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={isSubmitting || !newNote.trim()}
                  className="bg-accent-luxury hover:bg-opacity-90"
                >
                  {isSubmitting ? "Saving..." : "Add Note"}
                </Button>
              </div>
            </form>

            {/* Notes List */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              {notes && notes.length > 0 ? (
                notes.map((note) => (
                  <div key={note._id} className="bg-slate-50 p-4 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-medium text-slate-500 uppercase">
                        {note.type.replace(/_/g, " ")}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(note.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-slate-900 text-sm">{note.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No notes yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Status Card */}
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {editingStatus ? (
              <div className="space-y-3">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-accent-luxury"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.replace(/_/g, " ").toUpperCase()}
                    </option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <Button
                    onClick={handleStatusChange}
                    disabled={isSubmitting}
                    size="sm"
                    className="flex-1 bg-accent-luxury hover:bg-opacity-90"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                  <Button
                    onClick={() => setEditingStatus(false)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge className={statusColors[lead.status as keyof typeof statusColors]}>
                    {lead.status.replace(/_/g, " ")}
                  </Badge>
                  <button
                    onClick={() => setEditingStatus(true)}
                    className="text-xs text-accent-luxury hover:underline"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full">
              ✉️ Send Email
            </Button>
            <Button variant="outline" className="w-full">
              📞 Log Call
            </Button>
            <Button variant="outline" className="w-full">
              📅 Schedule Follow-up
            </Button>
            <Button variant="outline" className="w-full text-green-600 hover:text-green-700">
              ✅ Convert to Booking
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
