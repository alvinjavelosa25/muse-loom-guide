import { ImagePrompt } from '@/types/prompt';
import QualityBadge from './QualityBadge';
import { Link } from 'react-router-dom';

interface PromptTableProps {
  prompts: ImagePrompt[];
}

export default function PromptTable({ prompts }: PromptTableProps) {
  return (
    <div className="border border-border rounded overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface-2 text-muted-foreground text-[10px] font-display uppercase tracking-widest">
            <th className="text-left px-3 py-2">Pose / Prompt</th>
            <th className="text-left px-3 py-2">Art Style</th>
            <th className="text-left px-3 py-2">Category</th>
            <th className="text-left px-3 py-2">Source</th>
            <th className="text-right px-3 py-2">Usage</th>
            <th className="text-center px-3 py-2">Quality</th>
          </tr>
        </thead>
        <tbody>
          {prompts.map((p) => (
            <tr key={p.id} className="border-t border-border hover:bg-surface-1 transition-colors">
              <td className="px-3 py-2.5">
                <Link to={`/prompt/${p.id}`} className="hover:text-primary transition-colors">
                  <p className="font-medium text-foreground">{p.pose}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-xs">{p.intendedMeaning}</p>
                </Link>
              </td>
              <td className="px-3 py-2.5">
                <span className="text-xs bg-surface-2 px-1.5 py-0.5 rounded font-display">{p.artStyle}</span>
              </td>
              <td className="px-3 py-2.5 text-muted-foreground">{p.category}</td>
              <td className="px-3 py-2.5">
                <span className={`text-[10px] font-display uppercase tracking-wider ${
                  p.source === 'trained' ? 'text-primary' : 'text-warning'
                }`}>
                  {p.source}
                </span>
              </td>
              <td className="px-3 py-2.5 text-right font-display">{p.usageCount.toLocaleString()}</td>
              <td className="px-3 py-2.5 text-center">
                <QualityBadge score={p.qualityScore} value={p.qualityValue} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
