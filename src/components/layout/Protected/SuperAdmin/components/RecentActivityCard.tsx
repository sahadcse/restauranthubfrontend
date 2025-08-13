import { RecentActivityCardProps } from "../types/dashboard.types";
import {
  getActivityIcon,
  getSeverityColor,
  formatTimeAgo,
} from "../utils/dashboard.utils";

export default function RecentActivityCard({
  activities,
  loading,
}: RecentActivityCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recent System Activity
      </h3>
      {loading ? (
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2 border-b"
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gray-200 rounded-full mr-3"></div>
                <div className="h-4 bg-gray-200 rounded w-48"></div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      ) : activities.length > 0 ? (
        <div className="space-y-3">
          {activities.slice(0, 5).map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between py-2 border-b"
            >
              <div className="flex items-center">
                <span
                  className={`w-2 h-2 rounded-full mr-3 ${getSeverityColor(
                    activity.severity
                  )}`}
                ></span>
                <div className="flex items-center">
                  <span className="mr-2">{getActivityIcon(activity.type)}</span>
                  <span className="text-sm text-gray-600">
                    {activity.message}
                  </span>
                </div>
              </div>
              <span className="text-xs text-gray-400">
                {formatTimeAgo(activity.timestamp)}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>No recent activity</p>
        </div>
      )}
    </div>
  );
}
