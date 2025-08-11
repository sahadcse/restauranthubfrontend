import {
  SupportTicketStatus,
  PriorityLevel,
  NotificationType,
  NotificationChannel,
  FeedbackType,
} from "./enums";

export interface SupportTicket {
  id: string;
  userId: string;
  orderId?: string;
  subject: string;
  description: string;
  status: SupportTicketStatus;
  priority: PriorityLevel;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  closedAt?: Date;
  tenantId: string;
  responses: SupportResponse[];
}

export interface SupportResponse {
  id: string;
  ticketId: string;
  responderId: string;
  message: string;
  isInternal: boolean;
  attachments?: Record<string, unknown>;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  channel: NotificationChannel;
  title: string;
  message: string;
  isRead: boolean;
  readAt?: Date;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  tenantId: string;
}

export interface Feedback {
  id: string;
  orderId: string;
  userId: string;
  type: FeedbackType;
  comment?: string;
  rating: number;
  createdAt: Date;
  tenantId: string;
}

export interface CreateSupportTicketRequest {
  orderId?: string;
  subject: string;
  description: string;
  priority?: PriorityLevel;
}

export interface CreateFeedbackRequest {
  orderId: string;
  type: FeedbackType;
  comment?: string;
  rating: number;
}
