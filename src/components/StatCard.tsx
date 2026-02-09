interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}

export default function StatCard({ label, value, sub, accent }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded p-4 animate-fade-in">
      <p className="text-[10px] font-display uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
      <p className={`text-2xl font-display font-bold ${accent ? 'text-primary' : 'text-foreground'}`}>{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  );
}
