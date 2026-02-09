import { useParams, Link } from 'react-router-dom';
import { mockPrompts } from '@/data/mockPrompts';
import QualityBadge from '@/components/QualityBadge';
import { ArrowLeft, Copy, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export default function PromptDetail() {
  const { id } = useParams();
  const prompt = mockPrompts.find(p => p.id === id);

  if (!prompt) {
    return (
      <div className="p-6">
        <Link to="/library" className="text-xs text-primary flex items-center gap-1 mb-4"><ArrowLeft size={12} /> Back</Link>
        <p className="text-muted-foreground">Prompt not found.</p>
      </div>
    );
  }

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt.imagePrompt);
    toast.success('Prompt copied to clipboard');
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <Link to="/library" className="text-xs text-primary flex items-center gap-1 hover:underline font-display">
        <ArrowLeft size={12} /> Back to library
      </Link>

      <div className="animate-fade-in">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">{prompt.pose}</h1>
            <p className="text-sm text-muted-foreground mt-1">{prompt.intendedMeaning}</p>
          </div>
          <QualityBadge score={prompt.qualityScore} value={prompt.qualityValue} size="md" />
        </div>
      </div>

      {/* Metadata grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 animate-fade-in">
        {[
          ['Art Style', prompt.artStyle],
          ['Type', prompt.type],
          ['Category', prompt.category],
          ['Source', prompt.source],
          ['Usage Count', prompt.usageCount.toLocaleString()],
          ['Created', prompt.createdAt],
        ].map(([label, value]) => (
          <div key={label} className="bg-card border border-border rounded p-3">
            <p className="text-[10px] font-display uppercase tracking-widest text-muted-foreground">{label}</p>
            <p className="text-sm text-foreground mt-0.5">{value}</p>
          </div>
        ))}
      </div>

      {/* User Phrase */}
      <div className="bg-card border border-border rounded p-4 animate-fade-in">
        <p className="text-[10px] font-display uppercase tracking-widest text-muted-foreground mb-1">User Phrase</p>
        <p className="text-foreground italic">"{prompt.userPhrase}"</p>
      </div>

      {/* Image Prompt */}
      <div className="bg-card border border-border rounded p-4 animate-fade-in">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[10px] font-display uppercase tracking-widest text-muted-foreground">Image Prompt</p>
          <button onClick={copyPrompt} className="text-muted-foreground hover:text-primary transition-colors">
            <Copy size={14} />
          </button>
        </div>
        <p className="text-sm text-foreground font-display leading-relaxed">{prompt.imagePrompt}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {prompt.tags.map(tag => (
          <span key={tag} className="bg-surface-2 border border-border rounded px-2 py-0.5 text-[10px] font-display text-muted-foreground">
            #{tag}
          </span>
        ))}
      </div>

      {/* Simulated usage chart */}
      <div className="bg-card border border-border rounded p-4 animate-fade-in">
        <p className="text-[10px] font-display uppercase tracking-widest text-muted-foreground mb-3">Usage Over Last 7 Days</p>
        <div className="flex items-end gap-1 h-20">
          {[65, 42, 78, 91, 53, 87, 70].map((v, i) => (
            <div key={i} className="flex-1 bg-primary/20 hover:bg-primary/40 transition-colors rounded-t" style={{ height: `${v}%` }} />
          ))}
        </div>
        <div className="flex justify-between mt-1 text-[9px] text-muted-foreground font-display">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </div>
    </div>
  );
}
