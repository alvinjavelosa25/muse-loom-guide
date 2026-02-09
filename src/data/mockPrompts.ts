import { ImagePrompt, QualityScore } from '@/types/prompt';

const quality = (v: number): QualityScore =>
  v >= 70 ? 'good' : v >= 40 ? 'average' : 'poor';

export const mockPrompts: ImagePrompt[] = [
  {
    id: '1', artStyle: 'Digital Art', type: 'Single Person', category: 'Portrait',
    pose: 'Head tilt with soft smile', intendedMeaning: 'Warmth and approachability',
    userPhrase: 'Make me look friendly', imagePrompt: 'Portrait of a person with a gentle head tilt and warm smile, soft lighting, digital art style',
    source: 'trained', usageCount: 1423, qualityScore: quality(88), qualityValue: 88,
    createdAt: '2025-11-15', updatedAt: '2026-01-20', tags: ['popular', 'portrait', 'smile'],
  },
  {
    id: '2', artStyle: 'Watercolor', type: 'Couple', category: 'Emotion',
    pose: 'Forehead touch', intendedMeaning: 'Romantic intimacy',
    userPhrase: 'Show our love', imagePrompt: 'Two people touching foreheads gently, eyes closed, watercolor style with soft bleeding colors',
    source: 'trained', usageCount: 892, qualityScore: quality(75), qualityValue: 75,
    createdAt: '2025-10-08', updatedAt: '2026-01-10', tags: ['couple', 'romantic'],
  },
  {
    id: '3', artStyle: 'Photorealistic', type: 'Single Person', category: 'Professional',
    pose: 'Arms crossed confident', intendedMeaning: 'Authority and confidence',
    userPhrase: 'Make me look powerful', imagePrompt: 'Professional portrait with arms crossed, sharp lighting, confident expression, photorealistic',
    source: 'trained', usageCount: 2105, qualityScore: quality(92), qualityValue: 92,
    createdAt: '2025-09-22', updatedAt: '2026-02-01', tags: ['popular', 'professional', 'corporate'],
  },
  {
    id: '4', artStyle: 'Anime', type: 'Single Person', category: 'Action',
    pose: 'Dynamic jump pose', intendedMeaning: 'Energy and excitement',
    userPhrase: 'Make me look energetic', imagePrompt: 'Dynamic mid-air jump pose, anime style, speed lines, vibrant colors',
    source: 'trained', usageCount: 567, qualityScore: quality(61), qualityValue: 61,
    createdAt: '2025-12-01', updatedAt: '2026-01-15', tags: ['anime', 'action', 'dynamic'],
  },
  {
    id: '5', artStyle: 'Oil Painting', type: 'Family', category: 'Group',
    pose: 'Gathered around table', intendedMeaning: 'Family togetherness',
    userPhrase: 'Family dinner scene', imagePrompt: 'Family gathered around dinner table, warm candlelight, oil painting style, rich textures',
    source: 'trained', usageCount: 334, qualityScore: quality(45), qualityValue: 45,
    createdAt: '2025-11-30', updatedAt: '2026-01-05', tags: ['family', 'group', 'warm'],
  },
  {
    id: '6', artStyle: 'Pencil Sketch', type: 'Single Person', category: 'Casual',
    pose: 'Sitting cross-legged reading', intendedMeaning: 'Relaxation and intellect',
    userPhrase: 'Show me reading', imagePrompt: 'Person sitting cross-legged reading a book, pencil sketch style, soft shading, cozy atmosphere',
    source: 'llm-generated', usageCount: 189, qualityScore: quality(38), qualityValue: 38,
    createdAt: '2026-01-10', updatedAt: '2026-01-10', tags: ['casual', 'reading', 'relaxed'],
  },
  {
    id: '7', artStyle: 'Pop Art', type: 'Single Person', category: 'Emotion',
    pose: 'Laughing out loud', intendedMeaning: 'Joy and humor',
    userPhrase: 'Make me look happy', imagePrompt: 'Person laughing with head thrown back, pop art style, bold colors, halftone dots',
    source: 'trained', usageCount: 756, qualityScore: quality(82), qualityValue: 82,
    createdAt: '2025-10-20', updatedAt: '2026-01-25', tags: ['emotion', 'happy', 'pop-art'],
  },
  {
    id: '8', artStyle: 'Line Art', type: 'Couple', category: 'Casual',
    pose: 'Walking hand in hand', intendedMeaning: 'Companionship',
    userPhrase: 'Walking together', imagePrompt: 'Two people walking hand in hand, minimal line art, clean strokes, side profile view',
    source: 'llm-generated', usageCount: 98, qualityScore: quality(29), qualityValue: 29,
    createdAt: '2026-01-20', updatedAt: '2026-01-20', tags: ['couple', 'minimal', 'line-art'],
  },
  {
    id: '9', artStyle: 'Digital Art', type: 'Single Person', category: 'Fantasy',
    pose: 'Wizard casting spell', intendedMeaning: 'Power and mystery',
    userPhrase: 'Make me a wizard', imagePrompt: 'Person in wizard robes casting spell, magical particles, dramatic lighting, digital art',
    source: 'trained', usageCount: 1890, qualityScore: quality(85), qualityValue: 85,
    createdAt: '2025-09-15', updatedAt: '2026-02-05', tags: ['popular', 'fantasy', 'magic'],
  },
  {
    id: '10', artStyle: 'Minimalist', type: 'Single Person', category: 'Sport',
    pose: 'Yoga tree pose', intendedMeaning: 'Balance and mindfulness',
    userPhrase: 'Show me doing yoga', imagePrompt: 'Person in yoga tree pose, minimalist style, clean background, geometric shapes',
    source: 'trained', usageCount: 412, qualityScore: quality(72), qualityValue: 72,
    createdAt: '2025-11-01', updatedAt: '2026-01-18', tags: ['sport', 'yoga', 'minimal'],
  },
  {
    id: '11', artStyle: 'Photorealistic', type: 'Single Person', category: 'Dance',
    pose: 'Ballet arabesque', intendedMeaning: 'Grace and elegance',
    userPhrase: 'Make me a dancer', imagePrompt: 'Ballet dancer in arabesque position, studio lighting, photorealistic, elegant composition',
    source: 'trained', usageCount: 645, qualityScore: quality(91), qualityValue: 91,
    createdAt: '2025-10-10', updatedAt: '2026-01-30', tags: ['dance', 'ballet', 'elegant'],
  },
  {
    id: '12', artStyle: 'Digital Art', type: 'Pet', category: 'Portrait',
    pose: 'Pet sitting regally', intendedMeaning: 'Pet as royalty',
    userPhrase: 'Make my pet look royal', imagePrompt: 'Pet sitting regally on velvet cushion, crown, royal robes, digital art, ornate background',
    source: 'llm-generated', usageCount: 2340, qualityScore: quality(78), qualityValue: 78,
    createdAt: '2025-12-15', updatedAt: '2026-02-08', tags: ['popular', 'pet', 'royal', 'fun'],
  },
];
