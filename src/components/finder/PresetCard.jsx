import PresetDisplay from '../PresetDisplay';
import CategoryBadge, { DoubleSizeBadge } from '../CategoryBadge';
import { getSubcategoryIcon, getRegionIcon, characterIcons } from '../../data/icons';

export default function PresetCard({ preset, onOpen, onSaveToBank, compact = false }) {
  const charIcon = characterIcons[preset.character];

  return (
    <button
      type="button"
      onClick={() => onOpen?.(preset)}
      className="w-full text-left rounded-2xl border border-[#2a2a36] bg-[#14141c] hover:border-amber-500/50 hover:bg-[#1a1a26] focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition shadow-sm active:scale-[0.99]"
    >
      <div className="p-4 flex items-start gap-3">
        <div className="shrink-0 flex flex-col items-center justify-center w-20 rounded-xl bg-black/50 border border-[#2a2a36] py-2">
          <span className="text-2xl leading-none mb-1">{getSubcategoryIcon(preset.subcategory)}</span>
          <PresetDisplay value={preset.display} size="md" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-slate-100 leading-snug truncate">{preset.name}</h3>
            {preset.double_size && !compact && <DoubleSizeBadge />}
          </div>

          <div className="flex items-center flex-wrap gap-1.5 mb-2">
            <CategoryBadge category={preset.category} />
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
              <span>{getRegionIcon(preset.region)}</span>
              <span>{preset.region}</span>
            </span>
            {charIcon && (
              <span className="text-[11px] text-slate-500 capitalize">
                · {charIcon} {preset.character}
              </span>
            )}
          </div>

          {!compact && preset.notes && (
            <p className="text-xs text-slate-400 line-clamp-2 mb-2">{preset.notes}</p>
          )}

          {!compact && preset.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {preset.tags.slice(0, 4).map(t => (
                <span key={t} className="text-[10px] bg-[#1c1c26] text-slate-400 border border-[#2a2a36] px-1.5 py-0.5 rounded">
                  {t}
                </span>
              ))}
              {preset.tags.length > 4 && (
                <span className="text-[10px] text-slate-500">+{preset.tags.length - 4}</span>
              )}
            </div>
          )}
        </div>

        {onSaveToBank && (
          <div
            role="button"
            tabIndex={0}
            onClick={(e) => { e.stopPropagation(); onSaveToBank(preset); }}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); onSaveToBank(preset); } }}
            className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 transition"
            aria-label="Salvar no banco Live Mode"
            title="Salvar no banco Live Mode"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5v14"/>
            </svg>
          </div>
        )}
      </div>
    </button>
  );
}
