import { useParams, Link } from 'react-router-dom';
import { mockPrompts } from '@/data/mockPrompts';
import QualityBadge from '@/components/QualityBadge';
import { ArrowLeft, Copy, Upload, Loader2, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

export default function PromptDetail() {
  const { id } = useParams();
  const prompt = mockPrompts.find(p => p.id === id);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [baseImage, setBaseImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be under 10MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setBaseImage(reader.result as string);
    reader.readAsDataURL(file);
    setGeneratedImage(null);
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!baseImage || !prompt) return;
    setIsGenerating(true);
    setGeneratedImage(null);
    try {
      const { data, error } = await supabase.functions.invoke('test-prompt', {
        body: { imageBase64: baseImage, prompt: prompt.imagePrompt },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      if (data?.generatedImage) {
        setGeneratedImage(data.generatedImage);
        toast.success('Image generated successfully');
      } else {
        toast.error('No image was returned from AI');
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  }, [baseImage, prompt]);

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

      {/* Test Prompt Section */}
      <div className="bg-card border border-border rounded p-4 animate-fade-in space-y-4">
        <p className="text-[10px] font-display uppercase tracking-widest text-muted-foreground">Test This Prompt</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Upload area */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
            {baseImage ? (
              <div className="relative group">
                <img
                  src={baseImage}
                  alt="Base"
                  className="w-full aspect-square object-cover rounded border border-border"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs text-muted-foreground"
                >
                  Change image
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-square rounded border-2 border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground"
              >
                <Upload size={24} />
                <span className="text-xs font-display">Upload base image</span>
              </button>
            )}
          </div>

          {/* Result area */}
          <div>
            {generatedImage ? (
              <img
                src={generatedImage}
                alt="Generated"
                className="w-full aspect-square object-cover rounded border border-border"
              />
            ) : (
              <div className="w-full aspect-square rounded border border-border bg-muted/20 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                {isGenerating ? (
                  <>
                    <Loader2 size={24} className="animate-spin text-primary" />
                    <span className="text-xs font-display">Generating…</span>
                  </>
                ) : (
                  <>
                    <ImageIcon size={24} />
                    <span className="text-xs font-display">Output preview</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={!baseImage || isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Generating…
            </>
          ) : (
            'Generate with this prompt'
          )}
        </Button>
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
