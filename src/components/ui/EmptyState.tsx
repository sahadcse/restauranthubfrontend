interface EmptyStateProps {
  title: string;
  description: string;
  onRetry?: () => void;
  showRetryButton?: boolean;
}

export default function EmptyState({
  title,
  description,
  onRetry,
  showRetryButton = true,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="mb-6">
        <svg
          className="mx-auto h-16 w-16 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{description}</p>
      {showRetryButton && onRetry && (
        <button
          onClick={onRetry}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors"
        >
          Refresh Page
        </button>
      )}
    </div>
  );
}
