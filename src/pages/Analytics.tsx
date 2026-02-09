import { useMemo, useState } from 'react';
import { mockPrompts } from '@/data/mockPrompts';
import StatCard from '@/components/StatCard';
import QualityBadge from '@/components/QualityBadge';

export default function Analytics() {
  const [period, setPeriod] = useState('30d');

  const data = useMemo(() => {
    const sorted = [...mockPrompts].sort((a, b) => b.usageCount - a.usageCount);
    const totalGen = mockPrompts.reduce((s, p) => s + p.usageCount, 0);
    const avgQ = Math.round(mockPrompts.reduce((s, p) => s + p.qualityValue, 0) / mockPrompts.length);
    return { sorted, totalGen, avgQ };
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-display font-bold text-foreground">Analytics</h1>
          <p className="text-xs text-muted-foreground">Usage & quality analysis</p>
        </div>
        <select value={period} onChange={e => setPeriod(e.target.value)} className="bg-surface-1 border border-border rounded px-2 py-1.5 text-xs text-foreground">
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="all">All time</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Total Generations" value={data.totalGen.toLocaleString()} accent />
        <StatCard label="Avg Quality Score" value={data.avgQ} sub="/100" />
        <StatCard label="Active Prompts" value={mockPrompts.length} />
      </div>

      {/* Usage by prompt */}
      <div className="bg-card border border-border rounded animate-fade-in">
        <div className="px-4 py-3 border-b border-border">
          <h2 className="text-xs font-display font-bold uppercase tracking-widest text-foreground">Usage by Prompt</h2>
        </div>
        <div className="divide-y divide-border">
          {data.sorted.map((p) => {
            const pct = Math.round((p.usageCount / data.sorted[0].usageCount) * 100);
            return (
              <div key={p.id} className="px-4 py-3 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">{p.pose}</p>
                  <p className="text-[10px] text-muted-foreground">{p.artStyle} · {p.category}</p>
                </div>
                <div className="w-32 hidden md:block">
                  <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <span className="text-xs font-display text-foreground w-16 text-right">{p.usageCount.toLocaleString()}</span>
                <QualityBadge score={p.qualityScore} value={p.qualityValue} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
