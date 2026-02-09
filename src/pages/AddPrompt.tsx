import { useState } from 'react';
import { ART_STYLES, CATEGORIES, TYPES } from '@/types/prompt';
import { toast } from 'sonner';
import { CheckCircle } from 'lucide-react';

export default function AddPrompt() {
  const [method, setMethod] = useState<'working' | 'training'>('working');
  const [form, setForm] = useState({
    artStyle: '', type: '', category: '', pose: '',
    intendedMeaning: '', userPhrase: '', imagePrompt: '', tags: '',
  });

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Prompt added successfully (mock)');
    setForm({ artStyle: '', type: '', category: '', pose: '', intendedMeaning: '', userPhrase: '', imagePrompt: '', tags: '' });
  };

  const inputClass = "w-full bg-surface-1 border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary";
  const labelClass = "text-[10px] font-display uppercase tracking-widest text-muted-foreground mb-1 block";

  return (
    <div className="p-6 max-w-2xl space-y-6">
      <div>
        <h1 className="text-lg font-display font-bold text-foreground">Add Prompt</h1>
        <p className="text-xs text-muted-foreground">Add a new image prompt to the library</p>
      </div>

      {/* Method toggle */}
      <div className="flex gap-2">
        {(['working', 'training'] as const).map(m => (
          <button
            key={m}
            onClick={() => setMethod(m)}
            className={`px-4 py-2 rounded text-xs font-display uppercase tracking-wider border transition-colors ${
              method === m ? 'bg-primary text-primary-foreground border-primary' : 'bg-surface-1 text-muted-foreground border-border hover:text-foreground'
            }`}
          >
            {m === 'working' ? 'Working Prompt' : 'Training Data'}
          </button>
        ))}
      </div>

      {method === 'working' ? (
        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Art Style</label>
              <select value={form.artStyle} onChange={e => update('artStyle', e.target.value)} className={inputClass} required>
                <option value="">Select...</option>
                {ART_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Type</label>
              <select value={form.type} onChange={e => update('type', e.target.value)} className={inputClass} required>
                <option value="">Select...</option>
                {TYPES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <select value={form.category} onChange={e => update('category', e.target.value)} className={inputClass} required>
                <option value="">Select...</option>
                {CATEGORIES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Pose</label>
              <input value={form.pose} onChange={e => update('pose', e.target.value)} placeholder="e.g. Head tilt with soft smile" className={inputClass} required />
            </div>
          </div>
          <div>
            <label className={labelClass}>Intended Meaning</label>
            <input value={form.intendedMeaning} onChange={e => update('intendedMeaning', e.target.value)} placeholder="What emotion/concept this conveys" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>User Phrase</label>
            <input value={form.userPhrase} onChange={e => update('userPhrase', e.target.value)} placeholder="What the user would say to trigger this" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Image Prompt</label>
            <textarea value={form.imagePrompt} onChange={e => update('imagePrompt', e.target.value)} placeholder="The full image generation prompt..." className={`${inputClass} h-24 resize-none`} required />
          </div>
          <div>
            <label className={labelClass}>Tags (comma-separated)</label>
            <input value={form.tags} onChange={e => update('tags', e.target.value)} placeholder="portrait, smile, warm" className={inputClass} />
          </div>
          <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded text-sm font-display font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
            <CheckCircle size={14} /> Add Working Prompt
          </button>
        </form>
      ) : (
        <div className="animate-fade-in space-y-4">
          <div className="bg-card border border-border rounded p-6 text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded bg-surface-2 border border-dashed border-border flex items-center justify-center text-muted-foreground">
              <span className="text-2xl">+</span>
            </div>
            <p className="text-sm text-foreground">Upload Training Images</p>
            <p className="text-xs text-muted-foreground">Drag & drop up to 10 images or click to browse</p>
            <p className="text-[10px] text-muted-foreground font-display">Supported: PNG, JPG, WEBP · Min 512×512px</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Art Style</label>
              <select className={inputClass}>
                <option value="">Select...</option>
                {ART_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <select className={inputClass}>
                <option value="">Select...</option>
                {CATEGORIES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Intended Meaning</label>
            <input placeholder="What this training data represents" className={inputClass} />
          </div>

          <div className="bg-surface-1 border border-border rounded p-4">
            <p className="text-[10px] font-display uppercase tracking-widest text-muted-foreground mb-2">Training Pipeline</p>
            <ol className="text-xs text-muted-foreground space-y-1.5 list-decimal pl-4">
              <li>Upload images → auto-validate specs</li>
              <li>Auto-generate annotations per image</li>
              <li>Review & edit annotations</li>
              <li>Upload to sandbox environment</li>
              <li>Generate YAML prompt template</li>
              <li>Test with different base images</li>
              <li>Promote to working prompt</li>
            </ol>
          </div>

          <button className="bg-primary text-primary-foreground px-6 py-2 rounded text-sm font-display font-medium hover:opacity-90 transition-opacity">
            Start Training Pipeline
          </button>
        </div>
      )}
    </div>
  );
}
