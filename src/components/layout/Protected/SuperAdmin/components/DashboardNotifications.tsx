import { EndpointsAvailability } from "../types/dashboard.types";

interface DashboardNotificationsProps {
  error: string | null;
  loading: boolean;
  endpointsAvailable: EndpointsAvailability;
}

export default function DashboardNotifications({
  error,
  loading,
  endpointsAvailable,
}: DashboardNotificationsProps) {
  const unavailableEndpoints = Object.entries(endpointsAvailable)
    .filter(([, available]) => !available)
    .map(([endpoint]) => endpoint);

  // Show critical error only if we can't load anything
  if (error && loading) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-red-400">⚠️</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
            <div className="mt-4">
              <button
                onClick={() => window.location.reload()}
                className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded text-sm"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show warning about unavailable endpoints
  if (unavailableEndpoints.length > 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-yellow-400">⚠️</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Demo Mode</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Some backend endpoints are not available yet (
                {unavailableEndpoints.join(", ")}). Currently showing demo data
                for development purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
