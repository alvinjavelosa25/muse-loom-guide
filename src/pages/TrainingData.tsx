export default function TrainingData() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-lg font-display font-bold text-foreground">Training Data</h1>
        <p className="text-xs text-muted-foreground">Manage training datasets and annotations</p>
      </div>

      <div className="bg-card border border-border rounded p-8 text-center space-y-4 animate-fade-in">
        <div className="w-20 h-20 mx-auto rounded-lg bg-surface-2 border border-dashed border-border flex items-center justify-center">
          <span className="text-3xl text-muted-foreground">📦</span>
        </div>
        <h2 className="text-sm font-display font-bold text-foreground">Training Pipeline</h2>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          Upload images, auto-generate annotations, validate specs, and test in sandbox before promoting to production prompts.
        </p>
        <div className="bg-surface-1 border border-border rounded p-4 max-w-md mx-auto text-left">
          <p className="text-[10px] font-display uppercase tracking-widest text-muted-foreground mb-2">Pipeline Steps</p>
          <div className="space-y-2">
            {[
              { step: 1, label: 'Upload Images', desc: 'Upload 10+ reference images' },
              { step: 2, label: 'Validate Specs', desc: 'Auto-check resolution, format' },
              { step: 3, label: 'Generate Annotations', desc: 'AI-powered annotation generation' },
              { step: 4, label: 'Review & Edit', desc: 'Human validation of annotations' },
              { step: 5, label: 'Sandbox Deploy', desc: 'Test in isolated environment' },
              { step: 6, label: 'Generate YAML', desc: 'Auto-create prompt template' },
              { step: 7, label: 'Promote', desc: 'Move to production library' },
            ].map(({ step, label, desc }) => (
              <div key={step} className="flex items-start gap-3">
                <span className="text-[10px] font-display text-primary bg-primary/10 w-5 h-5 rounded flex items-center justify-center shrink-0">{step}</span>
                <div>
                  <p className="text-xs text-foreground font-medium">{label}</p>
                  <p className="text-[10px] text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground font-display">
          Connect a backend to enable the full training pipeline →
        </p>
      </div>
    </div>
  );
}
