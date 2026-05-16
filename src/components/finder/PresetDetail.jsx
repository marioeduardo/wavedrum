// Tela cheia (modal) de detalhe do preset — destaca o código P.XX que o usuário leva pro aparelho.
import { useEffect } from 'react';
import PresetDisplay from '../PresetDisplay';
import CategoryBadge, { DoubleSizeBadge } from '../CategoryBadge';
import { getSubcategoryIcon, getRegionIcon, characterIcons } from '../../data/icons';
import { singleSizeAlgorithms, doubleSizeAlgorithms } from '../../data/editingGuide';

const ALL_ALGOS = [...singleSizeAlgorithms, ...doubleSizeAlgorithms];

function findAlgo(id) {
  return id ? ALL_ALGOS.find(a => a.id === id) : null;
}

export default function PresetDetail({ preset, onClose, onSaveToBank }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!preset) return null;

  const headAlgo = findAlgo(preset.head_algo);
  const rimAlgo  = findAlgo(preset.rim_algo);
  const charIcon = characterIcons[preset.character];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
         onClick={onClose}>
      <div
        className="relative w-full max-w-2xl bg-[#14141c] border-t border-[#2a2a36] sm:border sm:rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          onClick={onClose}
          className="sticky top-0 float-right z-10 m-3 w-10 h-10 inline-flex items-center justify-center rounded-full bg-[#1c1c26] hover:bg-[#26263a] text-slate-300 border border-[#2a2a36]"
          aria-label="Fechar"
        >
          ✕
        </button>

        <div className="px-5 pt-8 pb-6">
          {/* Hero: ícone + número LED gigante */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="text-6xl mb-3 leading-none">{getSubcategoryIcon(preset.subcategory)}</div>
            <div className="rounded-2xl bg-black/60 border border-[#2a2a36] px-8 py-4 mb-3 inline-block">
              <PresetDisplay value={preset.display} size="xl" pulse />
            </div>
            <h2 className="text-2xl font-bold text-slate-100 mb-1.5">{preset.name}</h2>
            <p className="text-sm text-slate-400">
              Esse é o número que você seleciona no aparelho.
            </p>
          </div>

          <div className="flex items-center flex-wrap justify-center gap-2 mb-6">
            <CategoryBadge category={preset.category} size="lg" />
            <span className="inline-flex items-center gap-1 text-sm text-slate-300">
              <span className="text-lg">{getRegionIcon(preset.region)}</span> {preset.region}
            </span>
            {charIcon && (
              <span className="text-sm text-slate-400 capitalize">· {charIcon} {preset.character}</span>
            )}
            {preset.double_size && <DoubleSizeBadge />}
          </div>

          {preset.notes && (
            <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 text-amber-100 px-4 py-3 text-sm mb-5 leading-relaxed">
              <span className="block text-[10px] uppercase tracking-wider text-amber-400/80 mb-1 font-semibold">Dica</span>
              {preset.notes}
            </div>
          )}

          {preset.double_size && (
            <div className="rounded-xl bg-rose-500/5 border border-rose-500/20 text-rose-100/90 px-4 py-3 text-sm mb-5">
              <span className="block text-[10px] uppercase tracking-wider text-rose-400 mb-1 font-semibold">Double-size</span>
              Head e rim funcionam como um instrumento único. Toque no centro = grave/aberto;
              borda = slap/agudo. Edite com PtH (afinação geral) e parâmetros específicos do algoritmo.
            </div>
          )}

          {/* Algoritmos */}
          <section className="mb-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Algoritmos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <AlgoCard label="Head" id={preset.head_algo} algo={headAlgo} inst={preset.head_inst} />
              {!preset.double_size && (
                <AlgoCard label="Rim" id={preset.rim_algo} algo={rimAlgo} inst={preset.rim_inst} />
              )}
            </div>
          </section>

          {/* Tags */}
          {preset.tags?.length > 0 && (
            <section className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-1.5">
                {preset.tags.map(t => (
                  <span key={t} className="text-xs bg-[#1c1c26] text-slate-300 border border-[#2a2a36] px-2 py-0.5 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </section>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sticky bottom-0 -mx-5 px-5 py-3 bg-[#14141c]/95 border-t border-[#2a2a36]">
            <button
              type="button"
              onClick={() => onSaveToBank?.(preset)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 hover:bg-emerald-500/25 px-4 py-3 text-sm font-semibold transition"
            >
              <span>🎯</span> Salvar no banco
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1c1c26] border border-[#2a2a36] text-slate-200 hover:bg-[#26263a] px-4 py-3 text-sm font-semibold transition"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AlgoCard({ label, id, algo, inst }) {
  if (!id) {
    return (
      <div className="rounded-xl border border-[#2a2a36] bg-[#1c1c26] px-3 py-2.5">
        <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{label}</div>
        <div className="text-sm text-slate-500 italic">— (parte do double-size)</div>
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-[#2a2a36] bg-[#1c1c26] px-3 py-2.5">
      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{label}</div>
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-amber-400 text-sm">#{String(id).padStart(2, '0')}</span>
        <span className="text-sm text-slate-100 font-semibold">{algo?.name || '—'}</span>
      </div>
      {algo?.family && <div className="text-xs text-slate-400">{algo.family}</div>}
      {algo?.useFor && <div className="text-[11px] text-slate-500 mt-0.5">{algo.useFor}</div>}
      {inst != null && <div className="text-[11px] text-slate-500 mt-1 font-mono">PCM #{inst}</div>}
    </div>
  );
}
