export interface AnalyticsEvent {
  id: string;
  userId?: string;
  eventType: string;
  sessionId?: string;
  payload: Record<string, unknown>;
  timestamp: Date;
  tenantId: string;
}

export interface SearchQuery {
  id: string;
  userId?: string;
  query: string;
  resultsCount: number;
  filters?: Record<string, unknown>;
  sessionId?: string;
  createdAt: Date;
  tenantId: string;
}
