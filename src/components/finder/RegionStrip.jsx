// Faixa horizontal de regiões disponíveis.
import { regionIcons } from '../../data/icons';

export default function RegionStrip({ presets, selected, onPick }) {
  const counts = presets.reduce((acc, p) => {
    acc[p.region] = (acc[p.region] || 0) + 1;
    return acc;
  }, {});
  const items = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  if (!items.length) return null;

  return (
    <div className="-mx-4 px-4 overflow-x-auto">
      <div className="flex gap-2 pb-1 min-w-max">
        {items.map(([region, count]) => {
          const active = selected === region;
          return (
            <button
              key={region}
              type="button"
              onClick={() => onPick(active ? null : region)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs whitespace-nowrap transition
                ${active
                  ? 'border-amber-500/60 bg-amber-500/15 text-amber-200'
                  : 'border-[#2a2a36] bg-[#14141c] text-slate-300 hover:border-[#3a3a48]'}`}
            >
              <span className="text-base leading-none">{regionIcons[region] || '🌐'}</span>
              <span>{region}</span>
              <span className="text-slate-500 font-mono">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
