import React from "react";
import {
  FiCheckCircle,
  FiXCircle,
  FiInfo,
  FiAlertTriangle,
} from "react-icons/fi";

interface StatusMessageProps {
  type: "success" | "error" | "warning" | "info";
  title?: string;
  message: string;
  className?: string;
}

const iconMap = {
  success: FiCheckCircle,
  error: FiXCircle,
  warning: FiAlertTriangle,
  info: FiInfo,
};

const colorMap = {
  success: "bg-green-50 border-green-200 text-green-600",
  error: "bg-red-50 border-red-200 text-red-600",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-600",
  info: "bg-blue-50 border-blue-200 text-blue-600",
};

export const StatusMessage: React.FC<StatusMessageProps> = ({
  type,
  title,
  message,
  className = "",
}) => {
  const Icon = iconMap[type];
  const colorClasses = colorMap[type];

  return (
    <div
      className={`p-4 border rounded-lg flex items-start space-x-3 ${colorClasses} ${className}`}
      role="alert"
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div>
        {title && <h3 className="font-medium mb-1">{title}</h3>}
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};
