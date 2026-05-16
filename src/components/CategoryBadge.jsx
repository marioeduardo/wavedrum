import { getCategoryStyle } from '../data/icons';

export default function CategoryBadge({ category, size = 'sm' }) {
  const s = getCategoryStyle(category);
  const padding = size === 'lg' ? 'px-3 py-1 text-sm' : 'px-2 py-0.5 text-xs';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${padding} ${s.chip}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {category}
    </span>
  );
}

export function DoubleSizeBadge() {
  return (
    <span
      title="Head e rim agem como um instrumento único (centro=grave, borda=slap/agudo)"
      className="inline-flex items-center gap-1 rounded-full border border-rose-500/40 bg-rose-500/10 text-rose-300 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase"
    >
      ◐ Double-size
    </span>
  );
}
