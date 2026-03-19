import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  tripOfInterest?: string;
  createdAt: number;
}

interface RecentLeadsCardProps {
  leads: Lead[];
}

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

export function RecentLeadsCard({ leads }: RecentLeadsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Leads</CardTitle>
        <CardDescription>Latest inquiries from the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leads.length === 0 ? (
            <p className="text-sm text-slate-500">No leads yet</p>
          ) : (
            leads.map((lead) => (
              <Link
                key={lead._id}
                href={`/admin/leads/${lead._id}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{lead.name}</p>
                  <p className="text-xs text-slate-500 truncate">{lead.email}</p>
                </div>
                <Badge
                  className={statusColors[lead.status as keyof typeof statusColors] || ""}
                >
                  {lead.status}
                </Badge>
              </Link>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
