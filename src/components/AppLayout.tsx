import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Library, PlusCircle, Database, BarChart3 } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/library', icon: Library, label: 'Prompt Library' },
  { to: '/add-prompt', icon: PlusCircle, label: 'Add Prompt' },
  { to: '/training', icon: Database, label: 'Training Data' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-border bg-sidebar flex flex-col">
        <div className="p-4 border-b border-border">
          <h1 className="text-sm font-display font-bold tracking-wider text-primary">
            PROMPT<span className="text-foreground">_HQ</span>
          </h1>
          <p className="text-[10px] text-muted-foreground mt-0.5 font-display">Central Intelligence</p>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {navItems.map(({ to, icon: Icon, label }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2.5 px-3 py-2 rounded text-sm transition-colors ${
                  active
                    ? 'bg-sidebar-accent text-primary font-medium'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
              >
                <Icon size={16} className={active ? 'text-primary' : ''} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border">
          <div className="text-[10px] text-muted-foreground font-display">v0.1.0 · Internal</div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
