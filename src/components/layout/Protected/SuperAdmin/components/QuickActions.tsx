import { useState } from "react";
import { superAdminApi } from "@/src/lib/api/superAdmin";

interface ApiError {
  status?: number;
  message?: string;
}

const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === "object" &&
    error !== null &&
    ("status" in error || "message" in error)
  );
};

export default function QuickActions() {
  const [emailTestResult, setEmailTestResult] = useState<string | null>(null);
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupResult, setBackupResult] = useState<string | null>(null);

  const handleEmailTest = async () => {
    setIsTestingEmail(true);
    setEmailTestResult(null);
    try {
      const result = await superAdminApi.testEmailConfiguration();
      setEmailTestResult(result.message);
    } catch (error: unknown) {
      console.error("Email test failed:", error);
      if (isApiError(error) && error.status === 404) {
        setEmailTestResult("Email configuration endpoint not available");
      } else {
        setEmailTestResult("Email test failed - please check configuration");
      }
    } finally {
      setIsTestingEmail(false);
    }
  };

  const handleBackup = async () => {
    setIsBackingUp(true);
    setBackupResult(null);
    try {
      const result = await superAdminApi.triggerBackup();
      setBackupResult(`Backup initiated successfully - ID: ${result.backupId}`);
    } catch (error: unknown) {
      console.error("Backup failed:", error);
      if (isApiError(error) && error.status === 404) {
        setBackupResult("Backup service not available");
      } else {
        setBackupResult("Backup failed - please try again");
      }
    } finally {
      setIsBackingUp(false);
    }
  };

  const handleCreateNotification = () => {
    console.log("Create system notification");
  };

  const handleGenerateReports = () => {
    console.log("Generate reports");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Quick Actions
      </h3>
      <div className="space-y-3">
        <button
          onClick={handleEmailTest}
          disabled={isTestingEmail}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isTestingEmail ? "Testing..." : "Test Email Configuration"}
        </button>
        {emailTestResult && (
          <p
            className={`text-sm ${
              emailTestResult.includes("failed")
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {emailTestResult}
          </p>
        )}

        <button
          className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          onClick={handleCreateNotification}
        >
          Create System Notification
        </button>

        <button
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          onClick={handleGenerateReports}
        >
          Generate Reports
        </button>

        <button
          onClick={handleBackup}
          disabled={isBackingUp}
          className="w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isBackingUp ? "Backing up..." : "Backup Database"}
        </button>
        {backupResult && (
          <p
            className={`text-sm ${
              backupResult.includes("failed")
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {backupResult}
          </p>
        )}
      </div>
    </div>
  );
}
