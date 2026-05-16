// Linha de chips de filtros aplicados, com botão para limpar individual ou todos.

export default function FilterChips({ filters, onRemove, onClearAll }) {
  const entries = Object.entries(filters).filter(([, v]) => v);
  if (!entries.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {entries.map(([k, v]) => (
        <button
          key={k}
          type="button"
          onClick={() => onRemove(k)}
          className="inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-200 px-2.5 py-1 text-xs hover:bg-amber-500/20 transition"
        >
          <span className="text-amber-400/60">{labelFor(k)}:</span> {v}
          <span className="text-amber-400/70 ml-0.5">✕</span>
        </button>
      ))}
      {entries.length > 1 && (
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs text-slate-400 hover:text-slate-200 underline underline-offset-2"
        >
          limpar tudo
        </button>
      )}
    </div>
  );
}

function labelFor(k) {
  return {
    category:    'cat',
    subcategory: 'sub',
    region:      'região',
    character:   'tipo',
  }[k] || k;
}
