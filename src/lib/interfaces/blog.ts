import { BlogPostStatus } from "./enums";

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  tenantId?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  imageUrl?: string;
  status: BlogPostStatus;
  publishedAt?: Date;
  authorId: string;
  categoryId?: string;
  views: number;
  allowComments: boolean;
  createdAt: Date;
  updatedAt: Date;
  tenantId?: string;
  category?: BlogCategory;
  tags: BlogTag[];
  comments: BlogComment[];
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  tenantId?: string;
}

export interface BlogComment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  parentId?: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
  tenantId?: string;
  replies?: BlogComment[];
}

export interface CreateBlogPostRequest {
  title: string;
  content: string;
  excerpt?: string;
  imageUrl?: string;
  categoryId?: string;
  tags?: string[];
  status?: BlogPostStatus;
}

export interface UpdateBlogPostRequest {
  title?: string;
  content?: string;
  excerpt?: string;
  imageUrl?: string;
  categoryId?: string;
  tags?: string[];
  status?: BlogPostStatus;
}
