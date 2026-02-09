import { useMemo } from 'react';
import { mockPrompts } from '@/data/mockPrompts';
import StatCard from '@/components/StatCard';
import QualityBadge from '@/components/QualityBadge';
import { Link } from 'react-router-dom';
import { TrendingUp, AlertTriangle, Sparkles, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const stats = useMemo(() => {
    const total = mockPrompts.length;
    const totalUsage = mockPrompts.reduce((s, p) => s + p.usageCount, 0);
    const avgQuality = Math.round(mockPrompts.reduce((s, p) => s + p.qualityValue, 0) / total);
    const trained = mockPrompts.filter(p => p.source === 'trained').length;
    const good = mockPrompts.filter(p => p.qualityScore === 'good').length;
    const poor = mockPrompts.filter(p => p.qualityScore === 'poor').length;
    const topByUsage = [...mockPrompts].sort((a, b) => b.usageCount - a.usageCount).slice(0, 5);
    const needsAttention = [...mockPrompts].filter(p => p.qualityScore === 'poor').sort((a, b) => b.usageCount - a.usageCount);
    const byCategory: Record<string, number> = {};
    mockPrompts.forEach(p => { byCategory[p.category] = (byCategory[p.category] || 0) + 1; });

    return { total, totalUsage, avgQuality, trained, good, poor, topByUsage, needsAttention, byCategory };
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-lg font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-xs text-muted-foreground">Prompt library overview & quality metrics</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Total Prompts" value={stats.total} sub={`${stats.trained} trained`} accent />
        <StatCard label="Total Generations" value={stats.totalUsage.toLocaleString()} sub="All time" />
        <StatCard label="Avg Quality" value={stats.avgQuality} sub="/100" accent />
        <StatCard label="Needs Attention" value={stats.poor} sub={`${stats.good} performing well`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top prompts */}
        <div className="bg-card border border-border rounded p-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={14} className="text-primary" />
            <h2 className="text-xs font-display font-bold uppercase tracking-widest text-foreground">Most Used</h2>
          </div>
          <div className="space-y-2">
            {stats.topByUsage.map((p, i) => (
              <Link key={p.id} to={`/prompt/${p.id}`} className="flex items-center gap-3 group hover:bg-surface-1 rounded px-2 py-1.5 -mx-2 transition-colors">
                <span className="text-[10px] font-display text-muted-foreground w-4">{i + 1}.</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground group-hover:text-primary transition-colors truncate">{p.pose}</p>
                  <p className="text-[10px] text-muted-foreground">{p.artStyle} · {p.category}</p>
                </div>
                <span className="text-xs font-display text-muted-foreground">{p.usageCount.toLocaleString()}</span>
                <QualityBadge score={p.qualityScore} />
              </Link>
            ))}
          </div>
        </div>

        {/* Needs attention */}
        <div className="bg-card border border-border rounded p-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={14} className="text-danger" />
            <h2 className="text-xs font-display font-bold uppercase tracking-widest text-foreground">Needs Revision</h2>
          </div>
          {stats.needsAttention.length === 0 ? (
            <p className="text-sm text-muted-foreground flex items-center gap-2"><Sparkles size={14} className="text-success" /> All prompts performing well!</p>
          ) : (
            <div className="space-y-2">
              {stats.needsAttention.map((p) => (
                <Link key={p.id} to={`/prompt/${p.id}`} className="flex items-center gap-3 group hover:bg-surface-1 rounded px-2 py-1.5 -mx-2 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground group-hover:text-primary transition-colors truncate">{p.pose}</p>
                    <p className="text-[10px] text-muted-foreground">{p.artStyle} · {p.usageCount.toLocaleString()} uses</p>
                  </div>
                  <QualityBadge score={p.qualityScore} value={p.qualityValue} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Category coverage */}
      <div className="bg-card border border-border rounded p-4 animate-fade-in">
        <h2 className="text-xs font-display font-bold uppercase tracking-widest text-foreground mb-3">Category Coverage</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(stats.byCategory).sort((a, b) => b[1] - a[1]).map(([cat, count]) => (
            <div key={cat} className="bg-surface-2 border border-border rounded px-3 py-1.5 text-xs">
              <span className="text-foreground">{cat}</span>
              <span className="text-primary font-display ml-1.5">{count}</span>
            </div>
          ))}
          {/* Gap indicator for missing categories */}
          {['Portrait', 'Full Body', 'Group', 'Action', 'Emotion', 'Professional', 'Casual', 'Fantasy', 'Sport', 'Dance']
            .filter(c => !stats.byCategory[c])
            .map(c => (
              <div key={c} className="border border-dashed border-border rounded px-3 py-1.5 text-xs text-muted-foreground">
                {c} <span className="text-danger font-display ml-1">0</span>
              </div>
            ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Link to="/library" className="text-xs text-primary hover:underline flex items-center gap-1 font-display">
          View full library <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
