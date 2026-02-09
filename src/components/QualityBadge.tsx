import { QualityScore } from '@/types/prompt';

interface QualityBadgeProps {
  score: QualityScore;
  value?: number;
  size?: 'sm' | 'md';
}

export default function QualityBadge({ score, value, size = 'sm' }: QualityBadgeProps) {
  const base = 'inline-flex items-center gap-1 rounded border font-display font-medium';
  const sizeClass = size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-xs';

  const colorClass =
    score === 'good' ? 'traffic-green' :
    score === 'average' ? 'traffic-amber' :
    'traffic-red';

  const label = score === 'good' ? 'Good' : score === 'average' ? 'Avg' : 'Poor';

  return (
    <span className={`${base} ${sizeClass} ${colorClass}`}>
      <span className={`inline-block w-1.5 h-1.5 rounded-full ${
        score === 'good' ? 'bg-success' : score === 'average' ? 'bg-warning' : 'bg-danger'
      }`} />
      {label}
      {value !== undefined && <span className="opacity-70">{value}</span>}
    </span>
  );
}
