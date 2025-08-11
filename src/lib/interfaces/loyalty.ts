import { LoyaltyTransactionType } from "./enums";

export interface LoyaltyProgram {
  id: string;
  name: string;
  description?: string;
  pointsPerDollar: number;
  rewardThreshold: number;
  rewardType: string;
  rewardValue?: number;
  isActive: boolean;
  validFrom?: Date;
  validUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
  tenantId: string;
}

export interface LoyaltyTransaction {
  id: string;
  userId: string;
  orderId?: string;
  programId: string;
  pointsChange: number;
  transactionType: LoyaltyTransactionType;
  description?: string;
  createdAt: Date;
}
