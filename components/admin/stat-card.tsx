import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  color?: "blue" | "amber" | "green" | "purple";
}

const colorClasses = {
  blue: "bg-blue-50 text-blue-600",
  amber: "bg-amber-50 text-amber-600",
  green: "bg-green-50 text-green-600",
  purple: "bg-purple-50 text-purple-600",
};

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  color = "blue",
}: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
          <p className="text-sm text-slate-500 mt-1">{description}</p>
        </div>
        <div className={cn("p-3 rounded-lg", colorClasses[color])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
