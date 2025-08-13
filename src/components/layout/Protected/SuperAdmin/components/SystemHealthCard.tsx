import { SystemHealthCardProps } from "../types/dashboard.types";
import { getStatusColor, formatUptime } from "../utils/dashboard.utils";

export default function SystemHealthCard({
  health,
  loading,
}: SystemHealthCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        System Health
      </h3>
      {loading ? (
        <div className="animate-pulse space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      ) : health ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Status</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                health.status
              )}`}
            >
              {health.status.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Database</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                health.database === "connected"
                  ? "text-green-600 bg-green-100"
                  : "text-red-600 bg-red-100"
              }`}
            >
              {health.database.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Uptime</span>
            <span className="text-sm text-gray-900">
              {formatUptime(health.uptime)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              Memory Usage
            </span>
            <span className="text-sm text-gray-900">{health.memoryUsage}%</span>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Last checked: {new Date(health.timestamp).toLocaleTimeString()}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>Unable to load system health data</p>
        </div>
      )}
    </div>
  );
}
