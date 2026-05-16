import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import PresetDisplay from '../PresetDisplay';
import { getPresetById } from '../../hooks/useSearch';
import { getSubcategoryIcon } from '../../data/icons';
import { DoubleSizeBadge } from '../CategoryBadge';

export default function BankSlot({ bankId, slotIdx, presetId, onClear, onPick }) {
  const slotKey = `${bankId}:${slotIdx}`;

  const { isOver, setNodeRef: setDropRef } = useDroppable({ id: slotKey });
  const { attributes, listeners, setNodeRef: setDragRef, transform, isDragging } =
    useDraggable({ id: slotKey, disabled: presetId == null });

  const setRefs = (el) => { setDropRef(el); setDragRef(el); };
  const style = { transform: CSS.Translate.toString(transform), opacity: isDragging ? 0.4 : 1 };

  const preset = presetId != null ? getPresetById(presetId) : null;

  return (
    <div
      ref={setRefs}
      style={style}
      {...(preset ? listeners : {})}
      {...(preset ? attributes : {})}
      className={`relative rounded-2xl border min-h-[124px] p-3 flex flex-col items-center justify-center gap-1 transition select-none
        ${preset ? 'border-[#2a2a36] bg-[#1c1c26] cursor-grab active:cursor-grabbing' : 'border-dashed border-[#3a3a48] bg-[#14141c]'}
        ${isOver ? 'ring-2 ring-amber-400/70 border-amber-400/60' : ''}`}
    >
      <span className="absolute top-1.5 left-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
        Btn {slotIdx + 1}
      </span>

      {preset ? (
        <>
          <span className="text-2xl leading-none">{getSubcategoryIcon(preset.subcategory)}</span>
          <PresetDisplay value={preset.display} size="md" />
          <span className="text-[11px] text-slate-200 text-center line-clamp-2 leading-tight px-1">
            {preset.name}
          </span>
          {preset.double_size && <DoubleSizeBadge />}
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); onClear(bankId, slotIdx); }}
            className="absolute top-1 right-1 w-6 h-6 inline-flex items-center justify-center rounded-md text-slate-500 hover:text-rose-300 hover:bg-rose-500/10"
            aria-label="Esvaziar slot"
            title="Esvaziar slot"
          >
            ✕
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => onPick(bankId, slotIdx)}
          className="flex flex-col items-center gap-1 text-emerald-300/80 hover:text-emerald-200 transition"
        >
          <span className="text-2xl leading-none">＋</span>
          <span className="text-[11px] font-semibold">adicionar</span>
        </button>
      )}
    </div>
  );
}
