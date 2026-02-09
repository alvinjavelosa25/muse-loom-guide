import { useState, useMemo } from 'react';
import { mockPrompts } from '@/data/mockPrompts';
import { ART_STYLES, CATEGORIES, TYPES } from '@/types/prompt';
import PromptTable from '@/components/PromptTable';
import { Search, Filter, X } from 'lucide-react';

export default function PromptLibrary() {
  const [search, setSearch] = useState('');
  const [artFilter, setArtFilter] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');

  const hasFilters = artFilter || catFilter || typeFilter || sourceFilter;

  const filtered = useMemo(() => {
    return mockPrompts.filter((p) => {
      const q = search.toLowerCase();
      const matchSearch = !q || [p.pose, p.intendedMeaning, p.userPhrase, p.imagePrompt, p.artStyle, p.category, ...p.tags]
        .some(f => f.toLowerCase().includes(q));
      return matchSearch
        && (!artFilter || p.artStyle === artFilter)
        && (!catFilter || p.category === catFilter)
        && (!typeFilter || p.type === typeFilter)
        && (!sourceFilter || p.source === sourceFilter);
    });
  }, [search, artFilter, catFilter, typeFilter, sourceFilter]);

  const clearFilters = () => { setArtFilter(''); setCatFilter(''); setTypeFilter(''); setSourceFilter(''); };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-display font-bold text-foreground">Prompt Library</h1>
          <p className="text-xs text-muted-foreground">{filtered.length} of {mockPrompts.length} prompts</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search poses, meanings, phrases, tags..."
            className="w-full bg-surface-1 border border-border rounded pl-8 pr-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <select value={artFilter} onChange={e => setArtFilter(e.target.value)} className="bg-surface-1 border border-border rounded px-2 py-1.5 text-xs text-foreground">
          <option value="">All Styles</option>
          {ART_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="bg-surface-1 border border-border rounded px-2 py-1.5 text-xs text-foreground">
          <option value="">All Categories</option>
          {CATEGORIES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="bg-surface-1 border border-border rounded px-2 py-1.5 text-xs text-foreground">
          <option value="">All Types</option>
          {TYPES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={sourceFilter} onChange={e => setSourceFilter(e.target.value)} className="bg-surface-1 border border-border rounded px-2 py-1.5 text-xs text-foreground">
          <option value="">All Sources</option>
          <option value="trained">Trained</option>
          <option value="llm-generated">LLM Generated</option>
        </select>
        {hasFilters && (
          <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
            <X size={12} /> Clear
          </button>
        )}
      </div>

      <PromptTable prompts={filtered} />
    </div>
  );
}
