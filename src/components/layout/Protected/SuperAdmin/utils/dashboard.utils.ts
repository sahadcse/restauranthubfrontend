export const getStatusColor = (status: string): string => {
  switch (status) {
    case "ok":
      return "text-green-600 bg-green-100";
    case "warning":
      return "text-yellow-600 bg-yellow-100";
    case "error":
      return "text-red-600 bg-red-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

export const formatUptime = (uptime: number): string => {
  const hours = Math.floor(uptime / 3600);
  const days = Math.floor(hours / 24);
  if (days > 0) {
    return `${days}d ${hours % 24}h`;
  }
  return `${hours}h`;
};

export const getActivityIcon = (type: string): string => {
  switch (type) {
    case "registration":
      return "👤";
    case "system":
      return "⚙️";
    case "warning":
      return "⚠️";
    case "order":
      return "🛒";
    case "approval":
      return "✅";
    default:
      return "📝";
  }
};

export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case "success":
      return "bg-green-500";
    case "warning":
      return "bg-yellow-500";
    case "error":
      return "bg-red-500";
    default:
      return "bg-blue-500";
  }
};

export const formatTimeAgo = (timestamp: string): string => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInMinutes = Math.floor(
    (now.getTime() - time.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)} hour${
      Math.floor(diffInMinutes / 60) !== 1 ? "s" : ""
    } ago`;
  } else {
    return `${Math.floor(diffInMinutes / 1440)} day${
      Math.floor(diffInMinutes / 1440) !== 1 ? "s" : ""
    } ago`;
  }
};
