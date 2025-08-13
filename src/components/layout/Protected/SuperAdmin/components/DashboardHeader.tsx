export default function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-900">
        Super Admin Dashboard
      </h1>
      <div className="text-sm text-gray-500">
        Last updated: {new Date().toLocaleString()}
      </div>
    </div>
  );
}
