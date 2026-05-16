import { useMemo, useState } from 'react';
import SearchBar from '../components/finder/SearchBar';
import CategoryGrid from '../components/finder/CategoryGrid';
import SubcategoryGrid from '../components/finder/SubcategoryGrid';
import RegionStrip from '../components/finder/RegionStrip';
import FilterChips from '../components/finder/FilterChips';
import PresetCard from '../components/finder/PresetCard';
import PresetDetail from '../components/finder/PresetDetail';
import BankPicker from '../components/finder/BankPicker';
import { useSearch, ALL } from '../hooks/useSearch';
import { useBanks } from '../hooks/useBanks';
import { useLocalStorage } from '../hooks/useLocalStorage';

const SORTS = [
  { id: 'id',       label: 'Nº' },
  { id: 'name',     label: 'A-Z' },
  { id: 'category', label: 'Cat.' },
];

export default function Finder() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(null);
  const [subcategory, setSubcategory] = useState(null);
  const [region, setRegion] = useState(null);
  const [character, setCharacter] = useState(null);
  const [sortBy, setSortBy] = useLocalStorage('waveguide_sort', 'id');
  const [openPreset, setOpenPreset] = useState(null);
  const [pickingFor, setPickingFor] = useState(null);

  const { banks, setSlot } = useBanks();
  const { results } = useSearch({ query, category, subcategory, region, character, sortBy });

  // Pool para subcategoria/região se categoria fixada
  const subcatPool = useMemo(() => {
    return category ? ALL.filter(p => p.category === category) : ALL;
  }, [category]);

  const hasFilters = !!(category || subcategory || region || character || query);
  const drilldownView = !hasFilters; // sem filtros mostra grid grande de categorias

  function clearAll() {
    setQuery(''); setCategory(null); setSubcategory(null); setRegion(null); setCharacter(null);
  }
  function removeFilter(k) {
    if (k === 'category')    { setCategory(null); setSubcategory(null); }
    if (k === 'subcategory') setSubcategory(null);
    if (k === 'region')      setRegion(null);
    if (k === 'character')   setCharacter(null);
  }

  function handleSaveToBank(preset) {
    setOpenPreset(null);
    setPickingFor(preset);
  }
  function handlePickSlot(bankId, slotIdx) {
    if (pickingFor) {
      setSlot(bankId, slotIdx, pickingFor.id);
      setPickingFor(null);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 pt-4 pb-6 space-y-4">
      <SearchBar query={query} onChange={setQuery} />

      {hasFilters && (
        <FilterChips
          filters={{ category, subcategory, region, character }}
          onRemove={removeFilter}
          onClearAll={clearAll}
        />
      )}

      {/* Drill-down visual quando não há nenhum filtro */}
      {drilldownView && (
        <section className="space-y-5">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
              Comece pela categoria
            </h2>
            <CategoryGrid presets={ALL} onPick={setCategory} />
          </div>
          <p className="text-[12px] text-slate-500 text-center pt-2">
            ou digite acima para buscar direto pelo nome, instrumento ou tag.
          </p>
        </section>
      )}

      {/* Filtro de subcategoria — aparece quando uma categoria foi selecionada e ainda não escolheu sub */}
      {category && !subcategory && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            {category} — escolha um instrumento
          </h2>
          <SubcategoryGrid presets={subcatPool} onPick={setSubcategory} />
        </section>
      )}

      {/* Região: só aparece se já há resultados */}
      {results.length > 0 && hasFilters && (
        <RegionStrip presets={results} selected={region} onPick={setRegion} />
      )}

      {/* Lista de resultados */}
      {hasFilters && (
        <>
          <div className="flex items-center justify-between gap-3 pt-1">
            <p className="text-xs text-slate-400">
              <span className="text-slate-100 font-semibold">{results.length}</span>
              {' '}preset{results.length === 1 ? '' : 's'}
            </p>
            <div className="inline-flex bg-[#14141c] border border-[#2a2a36] rounded-lg p-0.5">
              {SORTS.map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSortBy(s.id)}
                  className={`text-[11px] px-2.5 py-1 rounded-md font-semibold transition ${
                    sortBy === s.id ? 'bg-amber-500/15 text-amber-200' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">🔇</p>
              <p className="text-slate-300 font-semibold mb-1">Nenhum preset encontrado</p>
              <p className="text-xs text-slate-500 mb-4">Tente afrouxar os filtros.</p>
              <button
                onClick={clearAll}
                className="rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-200 hover:bg-amber-500/25 px-4 py-2 text-sm font-semibold"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <ul className="space-y-2.5 animate-fade-in">
              {results.map(p => (
                <li key={p.id}>
                  <PresetCard preset={p} onOpen={setOpenPreset} onSaveToBank={handleSaveToBank} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {openPreset && (
        <PresetDetail
          preset={openPreset}
          onClose={() => setOpenPreset(null)}
          onSaveToBank={handleSaveToBank}
        />
      )}

      {pickingFor && (
        <BankPicker
          preset={pickingFor}
          banks={banks}
          onClose={() => setPickingFor(null)}
          onPick={handlePickSlot}
        />
      )}
    </div>
  );
}
