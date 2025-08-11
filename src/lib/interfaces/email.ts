import { EmailStatus, PriorityLevel } from "./enums";

export interface EmailQueue {
  id: string;
  to: string;
  subject: string;
  html: string;
  text?: string;
  priority: PriorityLevel;
  template?: string;
  templateData?: string;
  status: EmailStatus;
  scheduledFor: Date;
  processedAt?: Date;
  completedAt?: Date;
  failedAt?: Date;
  retryCount: number;
  maxRetries: number;
  lastError?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OAuthToken {
  id: string;
  provider: string;
  service: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  tokenType: string;
  scope: string;
  createdAt: Date;
  updatedAt: Date;
}
