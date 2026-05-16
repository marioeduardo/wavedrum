// Modal para escolher qual slot dos bancos receberá o preset.
import { useEffect } from 'react';
import PresetDisplay from '../PresetDisplay';
import { getPresetById } from '../../hooks/useSearch';
import { getSubcategoryIcon } from '../../data/icons';

const BANK_LABELS = { bank_a: 'A', bank_b: 'B', bank_c: 'C' };

export default function BankPicker({ preset, banks, onClose, onPick }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!preset) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center animate-fade-in p-0 sm:p-4"
         onClick={onClose}>
      <div
        className="w-full max-w-md bg-[#14141c] border-t sm:border border-[#2a2a36] sm:rounded-2xl shadow-2xl"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="px-5 py-4 border-b border-[#2a2a36] flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Salvar no banco</div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <PresetDisplay value={preset.display} size="sm" />
              <span className="font-semibold text-slate-100 truncate">{preset.name}</span>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-[#1c1c26] hover:bg-[#26263a] text-slate-300 border border-[#2a2a36]">✕</button>
        </div>

        <div className="p-4 space-y-4">
          {(['bank_a','bank_b','bank_c']).map(bid => (
            <div key={bid}>
              <div className="text-xs font-semibold text-slate-400 mb-2">Bank {BANK_LABELS[bid]}</div>
              <div className="grid grid-cols-4 gap-2">
                {banks[bid].map((pid, idx) => {
                  const p = pid != null ? getPresetById(pid) : null;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onPick(bid, idx)}
                      className={`flex flex-col items-center justify-center gap-0.5 rounded-xl border min-h-[78px] px-2 py-2 transition active:scale-[0.97]
                        ${p
                          ? 'border-[#2a2a36] bg-[#1c1c26] hover:border-amber-500/60'
                          : 'border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-200'}`}
                    >
                      <span className="text-[10px] font-bold text-slate-500">BTN {idx + 1}</span>
                      {p ? (
                        <>
                          <span className="text-lg leading-none">{getSubcategoryIcon(p.subcategory)}</span>
                          <PresetDisplay value={p.display} size="sm" />
                          <span className="text-[10px] text-slate-400 truncate w-full text-center">{p.name}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-2xl leading-none">＋</span>
                          <span className="text-[10px]">vazio</span>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <p className="text-xs text-slate-500 leading-relaxed pt-1">
            Toque em um slot — preenchido ou vazio — para gravar este preset nele. Slots ocupados serão sobrescritos.
          </p>
        </div>
      </div>
    </div>
  );
}
