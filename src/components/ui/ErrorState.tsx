interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  showRetryButton?: boolean;
}

export default function ErrorState({
  message,
  onRetry,
  showRetryButton = true,
}: ErrorStateProps) {
  return (
    <div className="text-center py-8">
      <div className="mb-4">
        <svg
          className="mx-auto h-12 w-12 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <p className="text-red-600 mb-4">{message}</p>
      {showRetryButton && onRetry && (
        <button
          onClick={onRetry}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
