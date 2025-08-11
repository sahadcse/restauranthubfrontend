// Content management interfaces (CMS)

import { BaseEntity } from "./common";
import { SliderLinkType } from "./enums";

// Use SliderLinkType from enums instead of local LinkType
export type LinkType = SliderLinkType;

export interface HeroSlider extends BaseEntity {
  title: string;
  description?: string;
  imageUrl: string;
  price?: number;
  buttonText?: string;
  linkUrl?: string;
  linkType: LinkType;
  linkTargetId?: string;
  displayOrder: number;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  tenantId?: string;
}

export interface Banner extends BaseEntity {
  title: string;
  description?: string;
  imageUrl: string;
  linkUrl?: string;
  linkType: LinkType;
  displayOrder: number;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  bannerType: "PROMOTIONAL" | "OFFER" | "ANNOUNCEMENT";
  subtitle?: string;
  hurryText?: string;
  buttonText?: string;
  buttonLink?: string;
  linkTargetId?: string;
  tenantId?: string;
}

export interface DealSection extends BaseEntity {
  title: string;
  description?: string;
  isActive: boolean;
  displayOrder: number;
  deals?: Deal[];
  subtitle?: string;
  timerDays?: number;
  timerHours?: number;
  timerMinutes?: number;
  tenantId?: string;
}

export interface Deal extends BaseEntity {
  title: string;
  description?: string;
  imageUrl?: string;
  discountPercentage?: number;
  originalPrice?: number;
  salePrice?: number;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  dealSectionId: string;
}

export interface OfferBanner extends BaseEntity {
  title: string;
  imageUrl: string;
  discountPercentage?: number;
  offerText?: string;
  linkUrl?: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  discount: string;
  image: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  linkType?: LinkType;
  linkTargetId?: string;
  tenantId?: string;
}

export interface NewArrivalsSection extends BaseEntity {
  title: string;
  description?: string;
  isActive: boolean;
  displayOrder: number;
  tabs?: Tab[];
}

export interface Tab extends BaseEntity {
  title: string;
  description?: string;
  sectionId: string;
  displayOrder: number;
  isActive: boolean;
  menuItems?: string[]; // Array of menu item IDs
  name: string;
  order: number;
  tenantId?: string;
}

export interface OfferSection extends BaseEntity {
  title: string;
  description?: string;
  isActive: boolean;
  displayOrder: number;
  banner?: OfferSectionBanner;
  sliders?: Slider[];
}

export interface OfferSectionBanner extends BaseEntity {
  offerSectionId: string;
  imageUrl: string;
  title?: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
  tenantId?: string;
}

export interface Slider extends BaseEntity {
  title: string;
  description?: string;
  offerSectionId: string;
  displayOrder: number;
  isActive: boolean;
  menuItems?: SliderMenuItem[];
}

export interface SliderMenuItem {
  menuItemId: string;
  sliderId: string;
  order: number;
  isActive: boolean;
  addedAt: string;
}

export interface ContentFilters {
  isActive?: boolean;
  startDate?: string;
  endDate?: string;
  linkType?: LinkType;
  search?: string;
}

export interface ContentCreateRequest {
  title: string;
  description?: string;
  imageUrl?: string;
  isActive?: boolean;
  displayOrder?: number;
  startDate?: string;
  endDate?: string;
  [key: string]: unknown; // Add index signature for compatibility
}

export interface HeroSliderCreateRequest extends ContentCreateRequest {
  price?: number;
  buttonText?: string;
  linkUrl?: string;
  linkType?: LinkType;
  linkTargetId?: string;
  [key: string]: unknown; // Add index signature for compatibility
}

export interface ContentStats {
  totalActiveSliders: number;
  totalActiveBanners: number;
  totalActiveDeals: number;
  upcomingContent: number;
  expiredContent: number;
}