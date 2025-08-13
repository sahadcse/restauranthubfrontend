import { DashboardCardProps } from "../types/dashboard.types";

export default function DashboardCard({
  title,
  value,
  icon,
  color,
  trend,
  loading = false,
}: DashboardCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          {loading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-20 mt-1"></div>
            </div>
          ) : (
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          )}
          {trend && !loading && (
            <p className="text-sm text-gray-500 mt-1">{trend}</p>
          )}
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
}
