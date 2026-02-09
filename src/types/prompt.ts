export type QualityScore = 'good' | 'average' | 'poor';

export interface ImagePrompt {
  id: string;
  artStyle: string;
  type: string;
  category: string;
  pose: string;
  intendedMeaning: string;
  userPhrase: string;
  imagePrompt: string;
  sampleImageUrl?: string;
  source: 'trained' | 'llm-generated';
  usageCount: number;
  qualityScore: QualityScore;
  qualityValue: number; // 0-100
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface UsageLog {
  id: string;
  promptId: string;
  timestamp: string;
  userId: string;
  outputImageUrl?: string;
}

export interface DashboardStats {
  totalPrompts: number;
  totalGenerations: number;
  avgQuality: number;
  promptsByCategory: Record<string, number>;
  topPrompts: ImagePrompt[];
  poorPrompts: ImagePrompt[];
  recentActivity: UsageLog[];
}

export const ART_STYLES = [
  'Watercolor', 'Digital Art', 'Oil Painting', 'Pencil Sketch',
  'Anime', 'Photorealistic', 'Line Art', 'Pop Art', 'Minimalist'
] as const;

export const CATEGORIES = [
  'Portrait', 'Full Body', 'Group', 'Action', 'Emotion',
  'Professional', 'Casual', 'Fantasy', 'Sport', 'Dance'
] as const;

export const TYPES = [
  'Single Person', 'Couple', 'Family', 'Pet', 'Object', 'Scene'
] as const;
