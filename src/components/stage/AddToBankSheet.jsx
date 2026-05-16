// Bottom sheet de busca rápida para adicionar preset a um slot vazio.
import { useEffect, useState } from 'react';
import SearchBar from '../finder/SearchBar';
import { useSearch } from '../../hooks/useSearch';
import PresetDisplay from '../PresetDisplay';
import { getSubcategoryIcon } from '../../data/icons';
import CategoryBadge from '../CategoryBadge';

export default function AddToBankSheet({ bankId, slotIdx, onClose, onPick }) {
  const [query, setQuery] = useState('');
  const { results } = useSearch({ query, sortBy: 'id' });

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-end justify-center animate-fade-in"
         onClick={onClose}>
      <div
        className="w-full max-w-2xl bg-[#14141c] border-t border-[#2a2a36] rounded-t-2xl shadow-2xl max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-4 pt-3">
          <div className="w-10 h-1.5 mx-auto bg-[#2a2a36] rounded-full mb-3" />
          <div className="flex items-center justify-between mb-3 gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                Adicionar preset
              </div>
              <div className="text-sm font-bold text-slate-100">
                Bank {bankId.slice(-1).toUpperCase()} · Btn {slotIdx + 1}
              </div>
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-full bg-[#1c1c26] hover:bg-[#26263a] text-slate-300 border border-[#2a2a36]">✕</button>
          </div>
          <SearchBar query={query} onChange={setQuery} placeholder="Buscar preset…" />
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          <ul className="space-y-1.5">
            {results.slice(0, 60).map(p => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => onPick(p.id)}
                  className="w-full flex items-center gap-3 rounded-xl border border-[#2a2a36] bg-[#1c1c26] hover:border-amber-500/40 hover:bg-[#26263a] px-3 py-2.5 text-left transition active:scale-[0.995]"
                >
                  <span className="text-2xl leading-none w-7 text-center">{getSubcategoryIcon(p.subcategory)}</span>
                  <PresetDisplay value={p.display} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-100 truncate">{p.name}</div>
                    <div className="text-[11px] text-slate-400">
                      <CategoryBadge category={p.category} /> <span className="ml-1">{p.region}</span>
                    </div>
                  </div>
                </button>
              </li>
            ))}
            {results.length === 0 && (
              <li className="text-center text-sm text-slate-500 py-8">Nenhum resultado.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
