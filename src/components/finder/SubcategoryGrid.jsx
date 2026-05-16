// Grid de subcategorias presentes nos presets filtrados.
import { subcategoryIcons } from '../../data/icons';

export default function SubcategoryGrid({ presets, onPick }) {
  const counts = presets.reduce((acc, p) => {
    acc[p.subcategory] = (acc[p.subcategory] || 0) + 1;
    return acc;
  }, {});
  const items = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  if (!items.length) return null;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
      {items.map(([sub, count]) => (
        <button
          key={sub}
          type="button"
          onClick={() => onPick(sub)}
          className="flex flex-col items-center gap-1 rounded-xl border border-[#2a2a36] bg-[#14141c] hover:border-amber-500/40 hover:bg-[#1a1a26] p-3 transition active:scale-[0.97]"
        >
          <span className="text-2xl leading-none">{subcategoryIcons[sub] || '🥁'}</span>
          <span className="text-xs font-semibold text-slate-200 text-center leading-tight">{sub}</span>
          <span className="text-[10px] text-slate-500 font-mono">{count}</span>
        </button>
      ))}
    </div>
  );
}
