// "use client";

// import { useState, useEffect } from "react";
// import { superAdminApi } from "@/src/lib/api/superAdmin";
// import {
//   SuperAdminStats,
//   SystemHealth,
//   RecentActivity,
// } from "@/src/lib/interfaces";

// import {mockStats,
//   mockSystemHealth,
//   mockRecentActivity,} from "@/src/data/superadmin.data";


// interface DashboardCardProps {
//   title: string;
//   value: string | number;
//   icon: string;
//   color: string;
//   trend?: string;
//   loading?: boolean;
// }

// function DashboardCard({
//   title,
//   value,
//   icon,
//   color,
//   trend,
//   loading = false,
// }: DashboardCardProps) {
//   return (
//     <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${color}`}>
//       <div className="flex items-center justify-between">
//         <div className="flex-1">
//           <p className="text-sm font-medium text-gray-600">{title}</p>
//           {loading ? (
//             <div className="animate-pulse">
//               <div className="h-8 bg-gray-200 rounded w-20 mt-1"></div>
//             </div>
//           ) : (
//             <p className="text-2xl font-bold text-gray-900">{value}</p>
//           )}
//           {trend && !loading && (
//             <p className="text-sm text-gray-500 mt-1">{trend}</p>
//           )}
//         </div>
//         <div className="text-3xl">{icon}</div>
//       </div>
//     </div>
//   );
// }

// function SystemHealthCard({
//   health,
//   loading,
// }: {
//   health: SystemHealth | null;
//   loading: boolean;
// }) {
//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "ok":
//         return "text-green-600 bg-green-100";
//       case "warning":
//         return "text-yellow-600 bg-yellow-100";
//       case "error":
//         return "text-red-600 bg-red-100";
//       default:
//         return "text-gray-600 bg-gray-100";
//     }
//   };

//   const formatUptime = (uptime: number) => {
//     const hours = Math.floor(uptime / 3600);
//     const days = Math.floor(hours / 24);
//     if (days > 0) {
//       return `${days}d ${hours % 24}h`;
//     }
//     return `${hours}h`;
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <h3 className="text-lg font-semibold text-gray-900 mb-4">
//         System Health
//       </h3>
//       {loading ? (
//         <div className="animate-pulse space-y-3">
//           {[1, 2, 3, 4].map((i) => (
//             <div key={i} className="flex justify-between">
//               <div className="h-4 bg-gray-200 rounded w-20"></div>
//               <div className="h-4 bg-gray-200 rounded w-16"></div>
//             </div>
//           ))}
//         </div>
//       ) : health ? (
//         <div className="space-y-3">
//           <div className="flex items-center justify-between">
//             <span className="text-sm font-medium text-gray-600">Status</span>
//             <span
//               className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
//                 health.status
//               )}`}
//             >
//               {health.status.toUpperCase()}
//             </span>
//           </div>
//           <div className="flex items-center justify-between">
//             <span className="text-sm font-medium text-gray-600">Database</span>
//             <span
//               className={`px-2 py-1 rounded-full text-xs font-medium ${
//                 health.database === "connected"
//                   ? "text-green-600 bg-green-100"
//                   : "text-red-600 bg-red-100"
//               }`}
//             >
//               {health.database.toUpperCase()}
//             </span>
//           </div>
//           <div className="flex items-center justify-between">
//             <span className="text-sm font-medium text-gray-600">Uptime</span>
//             <span className="text-sm text-gray-900">
//               {formatUptime(health.uptime)}
//             </span>
//           </div>
//           <div className="flex items-center justify-between">
//             <span className="text-sm font-medium text-gray-600">
//               Memory Usage
//             </span>
//             <span className="text-sm text-gray-900">{health.memoryUsage}%</span>
//           </div>
//           <div className="text-xs text-gray-500 mt-2">
//             Last checked: {new Date(health.timestamp).toLocaleTimeString()}
//           </div>
//         </div>
//       ) : (
//         <div className="text-center text-gray-500">
//           <p>Unable to load system health data</p>
//         </div>
//       )}
//     </div>
//   );
// }

// function QuickActions() {
//   const [emailTestResult, setEmailTestResult] = useState<string | null>(null);
//   const [isTestingEmail, setIsTestingEmail] = useState(false);
//   const [isBackingUp, setIsBackingUp] = useState(false);
//   const [backupResult, setBackupResult] = useState<string | null>(null);

//   const handleEmailTest = async () => {
//     setIsTestingEmail(true);
//     setEmailTestResult(null);
//     try {
//       const result = await superAdminApi.testEmailConfiguration();
//       setEmailTestResult(result.message);
//     } catch (error: any) {
//       console.error("Email test failed:", error);
//       // Provide more specific error messages
//       if (error.status === 404) {
//         setEmailTestResult("Email configuration endpoint not available");
//       } else {
//         setEmailTestResult("Email test failed - please check configuration");
//       }
//     } finally {
//       setIsTestingEmail(false);
//     }
//   };

//   const handleBackup = async () => {
//     setIsBackingUp(true);
//     setBackupResult(null);
//     try {
//       const result = await superAdminApi.triggerBackup();
//       setBackupResult(`Backup initiated successfully - ID: ${result.backupId}`);
//     } catch (error: any) {
//       console.error("Backup failed:", error);
//       // Provide more specific error messages
//       if (error.status === 404) {
//         setBackupResult("Backup service not available");
//       } else {
//         setBackupResult("Backup failed - please try again");
//       }
//     } finally {
//       setIsBackingUp(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <h3 className="text-lg font-semibold text-gray-900 mb-4">
//         Quick Actions
//       </h3>
//       <div className="space-y-3">
//         <button
//           onClick={handleEmailTest}
//           disabled={isTestingEmail}
//           className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//         >
//           {isTestingEmail ? "Testing..." : "Test Email Configuration"}
//         </button>
//         {emailTestResult && (
//           <p
//             className={`text-sm ${
//               emailTestResult.includes("failed")
//                 ? "text-red-600"
//                 : "text-green-600"
//             }`}
//           >
//             {emailTestResult}
//           </p>
//         )}

//         <button
//           className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
//           onClick={() => {
//             // This would open a modal or navigate to notification creation
//             console.log("Create system notification");
//           }}
//         >
//           Create System Notification
//         </button>

//         <button
//           className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
//           onClick={() => {
//             // This would navigate to reports page
//             console.log("Generate reports");
//           }}
//         >
//           Generate Reports
//         </button>

//         <button
//           onClick={handleBackup}
//           disabled={isBackingUp}
//           className="w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//         >
//           {isBackingUp ? "Backing up..." : "Backup Database"}
//         </button>
//         {backupResult && (
//           <p
//             className={`text-sm ${
//               backupResult.includes("failed")
//                 ? "text-red-600"
//                 : "text-green-600"
//             }`}
//           >
//             {backupResult}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// function RecentActivityCard({
//   activities,
//   loading,
// }: {
//   activities: RecentActivity[];
//   loading: boolean;
// }) {
//   const getActivityIcon = (type: string) => {
//     switch (type) {
//       case "registration":
//         return "👤";
//       case "system":
//         return "⚙️";
//       case "warning":
//         return "⚠️";
//       case "order":
//         return "🛒";
//       case "approval":
//         return "✅";
//       default:
//         return "📝";
//     }
//   };

//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case "success":
//         return "bg-green-500";
//       case "warning":
//         return "bg-yellow-500";
//       case "error":
//         return "bg-red-500";
//       default:
//         return "bg-blue-500";
//     }
//   };

//   const formatTimeAgo = (timestamp: string) => {
//     const now = new Date();
//     const time = new Date(timestamp);
//     const diffInMinutes = Math.floor(
//       (now.getTime() - time.getTime()) / (1000 * 60)
//     );

//     if (diffInMinutes < 60) {
//       return `${diffInMinutes} min ago`;
//     } else if (diffInMinutes < 1440) {
//       return `${Math.floor(diffInMinutes / 60)} hour${
//         Math.floor(diffInMinutes / 60) !== 1 ? "s" : ""
//       } ago`;
//     } else {
//       return `${Math.floor(diffInMinutes / 1440)} day${
//         Math.floor(diffInMinutes / 1440) !== 1 ? "s" : ""
//       } ago`;
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <h3 className="text-lg font-semibold text-gray-900 mb-4">
//         Recent System Activity
//       </h3>
//       {loading ? (
//         <div className="animate-pulse space-y-3">
//           {[1, 2, 3].map((i) => (
//             <div
//               key={i}
//               className="flex items-center justify-between py-2 border-b"
//             >
//               <div className="flex items-center">
//                 <div className="w-2 h-2 bg-gray-200 rounded-full mr-3"></div>
//                 <div className="h-4 bg-gray-200 rounded w-48"></div>
//               </div>
//               <div className="h-3 bg-gray-200 rounded w-16"></div>
//             </div>
//           ))}
//         </div>
//       ) : activities.length > 0 ? (
//         <div className="space-y-3">
//           {activities.slice(0, 5).map((activity) => (
//             <div
//               key={activity.id}
//               className="flex items-center justify-between py-2 border-b"
//             >
//               <div className="flex items-center">
//                 <span
//                   className={`w-2 h-2 rounded-full mr-3 ${getSeverityColor(
//                     activity.severity
//                   )}`}
//                 ></span>
//                 <div className="flex items-center">
//                   <span className="mr-2">{getActivityIcon(activity.type)}</span>
//                   <span className="text-sm text-gray-600">
//                     {activity.message}
//                   </span>
//                 </div>
//               </div>
//               <span className="text-xs text-gray-400">
//                 {formatTimeAgo(activity.timestamp)}
//               </span>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center text-gray-500">
//           <p>No recent activity</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default function SuperAdminDashboard() {
//   const [stats, setStats] = useState<SuperAdminStats | null>(null);
//   const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
//   const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [statsLoading, setStatsLoading] = useState(true);
//   const [healthLoading, setHealthLoading] = useState(true);
//   const [activityLoading, setActivityLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [endpointsAvailable, setEndpointsAvailable] = useState({
//     stats: false,
//     health: false,
//     activity: false,
//   });

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Fetch dashboard stats
//         setStatsLoading(true);
//         try {
//           const statsData = await superAdminApi.getDashboardStats();
//           setStats(statsData);
//           setEndpointsAvailable((prev) => ({ ...prev, stats: true }));
//         } catch (err: any) {
//           console.warn("Stats endpoint not available, using mock data:", err);
//           setStats(mockStats);
//           setEndpointsAvailable((prev) => ({ ...prev, stats: false }));
//         } finally {
//           setStatsLoading(false);
//         }

//         // Fetch system health
//         setHealthLoading(true);
//         try {
//           const healthData = await superAdminApi.getSystemHealth();
//           setSystemHealth(healthData);
//           setEndpointsAvailable((prev) => ({ ...prev, health: true }));
//         } catch (err: any) {
//           console.warn("Health endpoint not available, using mock data:", err);
//           setSystemHealth(mockSystemHealth);
//           setEndpointsAvailable((prev) => ({ ...prev, health: false }));
//         } finally {
//           setHealthLoading(false);
//         }

//         // Fetch recent activity
//         setActivityLoading(true);
//         try {
//           const activityData = await superAdminApi.getRecentActivity({
//             limit: 10,
//           });
//           setRecentActivity(activityData);
//           setEndpointsAvailable((prev) => ({ ...prev, activity: true }));
//         } catch (err: any) {
//           console.warn(
//             "Activity endpoint not available, using mock data:",
//             err
//           );
//           setRecentActivity(mockRecentActivity);
//           setEndpointsAvailable((prev) => ({ ...prev, activity: false }));
//         } finally {
//           setActivityLoading(false);
//         }
//       } catch (err) {
//         console.error("Dashboard error:", err);
//         // Only set error if all endpoints fail catastrophically
//         setError("Failed to load dashboard data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   // Show critical error only if we can't load anything
//   if (error && loading) {
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-md p-4">
//         <div className="flex">
//           <div className="flex-shrink-0">
//             <span className="text-red-400">⚠️</span>
//           </div>
//           <div className="ml-3">
//             <h3 className="text-sm font-medium text-red-800">Error</h3>
//             <div className="mt-2 text-sm text-red-700">
//               <p>{error}</p>
//             </div>
//             <div className="mt-4">
//               <button
//                 onClick={() => window.location.reload()}
//                 className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded text-sm"
//               >
//                 Retry
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Show warning if some endpoints are not available
//   const unavailableEndpoints = Object.entries(endpointsAvailable)
//     .filter(([_, available]) => !available)
//     .map(([endpoint]) => endpoint);

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900">
//           Super Admin Dashboard
//         </h1>
//         <div className="text-sm text-gray-500">
//           Last updated: {new Date().toLocaleString()}
//         </div>
//       </div>

//       {/* Warning about unavailable endpoints */}
//       {unavailableEndpoints.length > 0 && (
//         <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
//           <div className="flex">
//             <div className="flex-shrink-0">
//               <span className="text-yellow-400">⚠️</span>
//             </div>
//             <div className="ml-3">
//               <h3 className="text-sm font-medium text-yellow-800">Demo Mode</h3>
//               <div className="mt-2 text-sm text-yellow-700">
//                 <p>
//                   Some backend endpoints are not available yet (
//                   {unavailableEndpoints.join(", ")}). Currently showing demo
//                   data for development purposes.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
//         <DashboardCard
//           title="Total Users"
//           value={stats?.totalUsers.toLocaleString() || "0"}
//           icon="👥"
//           color="border-blue-500"
//           loading={statsLoading}
//         />
//         <DashboardCard
//           title="Restaurants"
//           value={stats?.totalRestaurants.toLocaleString() || "0"}
//           icon="🏪"
//           color="border-green-500"
//           loading={statsLoading}
//         />
//         <DashboardCard
//           title="Total Orders"
//           value={stats?.totalOrders.toLocaleString() || "0"}
//           icon="🛒"
//           color="border-purple-500"
//           loading={statsLoading}
//         />
//         <DashboardCard
//           title="Revenue"
//           value={stats ? `$${stats.totalRevenue.toLocaleString()}` : "$0"}
//           icon="💰"
//           color="border-yellow-500"
//           loading={statsLoading}
//         />
//         <DashboardCard
//           title="Active Drivers"
//           value={stats?.activeDrivers || "0"}
//           icon="🚗"
//           color="border-indigo-500"
//           loading={statsLoading}
//         />
//         <DashboardCard
//           title="Pending Approvals"
//           value={stats?.pendingApprovals || "0"}
//           icon="⏳"
//           color="border-red-500"
//           loading={statsLoading}
//         />
//       </div>

//       {/* Second Row - System Health and Quick Actions */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <SystemHealthCard health={systemHealth} loading={healthLoading} />
//         <QuickActions />
//       </div>

//       {/* Recent Activity */}
//       <RecentActivityCard
//         activities={recentActivity}
//         loading={activityLoading}
//       />
//     </div>
//   );
// }
