export default function Layout({ tab, onTabChange, children }) {
  return (
    <div className="min-h-full flex flex-col">
      <Header />
      <main className="flex-1 pb-24">{children}</main>
      <BottomNav tab={tab} onTabChange={onTabChange} />
    </div>
  );
}

function Header() {
  return (
    <header className="safe-top sticky top-0 z-30 backdrop-blur-md bg-[#0a0a0f]/85 border-b border-[#2a2a36]">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-baseline gap-2">
        <h1 className="text-xl font-extrabold tracking-tight">
          <span className="text-amber-400">Wave</span><span className="text-slate-100">Guide</span>
        </h1>
        <p className="text-[11px] text-slate-500 leading-none truncate">
          para Korg Wavedrum Global Edition
        </p>
      </div>
    </header>
  );
}

const TABS = [
  { id: 'finder', label: 'Finder', emoji: '🔍' },
  { id: 'stage',  label: 'Stage',  emoji: '🎯' },
  { id: 'edit',   label: 'Edit',   emoji: '🎛' },
];

function BottomNav({ tab, onTabChange }) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 safe-bottom bg-[#0a0a0f]/95 backdrop-blur-md border-t border-[#2a2a36]">
      <div className="max-w-2xl mx-auto grid grid-cols-3">
        {TABS.map(t => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onTabChange(t.id)}
              className={`group flex flex-col items-center justify-center gap-0.5 py-2.5 transition
                ${active ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'}`}
              aria-current={active ? 'page' : undefined}
            >
              <span className="text-xl leading-none">{t.emoji}</span>
              <span className={`text-[11px] font-semibold tracking-wide ${active ? '' : 'group-hover:text-slate-200'}`}>
                {t.label}
              </span>
              {active && <span className="absolute bottom-0 w-10 h-0.5 bg-amber-400 rounded-t" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
