// Grid grande e visual de categorias para drilldown.
import presetsData from '../../data/presets.json';
import { categoryIcons, categoryStyles } from '../../data/icons';

const CATS = presetsData.categories;

export default function CategoryGrid({ onPick, presets }) {
  const counts = CATS.reduce((acc, c) => {
    acc[c] = presets.filter(p => p.category === c).length;
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-2 gap-3">
      {CATS.map(cat => {
        const s = categoryStyles[cat];
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onPick(cat)}
            className={`group flex flex-col items-start gap-1 rounded-2xl border ${s?.chip || ''} bg-[#14141c] border-[#2a2a36] hover:bg-[#1a1a26] hover:ring-2 ${s?.ring || ''} p-4 text-left transition active:scale-[0.98]`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-3xl leading-none">{categoryIcons[cat]}</span>
              <span className={`text-xs font-mono ${s?.chip?.includes('text') ? '' : 'text-slate-500'}`}>
                {counts[cat]}
              </span>
            </div>
            <span className="text-sm font-semibold text-slate-100 leading-tight">{cat}</span>
          </button>
        );
      })}
    </div>
  );
}
