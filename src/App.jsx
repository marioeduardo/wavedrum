import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import SortableItem from './components/SortableItem';
import SearchBar from './components/SearchBar';
import { useLocalStorage } from './hooks/useLocalStorage';
import { parseGuide } from './utils/parseGuide';
import sampleGuide from './assets/sampleGuide';

const STORAGE_KEYS = {
  ITEMS: 'wavedrum_items',
  FAVORITES: 'wavedrum_favorites',
  SETTINGS: 'wavedrum_settings',
};

export default function App() {
  const [items, setItems] = useLocalStorage(STORAGE_KEYS.ITEMS, () => parseGuide(sampleGuide));
  const [favorites, setFavorites] = useLocalStorage(STORAGE_KEYS.FAVORITES, []);
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('all'); // 'all' | 'favorites'

  const fuse = useMemo(() => new Fuse(items, {
    keys: ['title', 'content', 'tags'],
    threshold: 0.35,
    includeScore: true,
  }), [items]);

  const filtered = useMemo(() => {
    let list = query ? fuse.search(query).map(r => r.item) : items;
    if (tab === 'favorites') list = list.filter(i => favorites.includes(i.id));
    return list;
  }, [query, items, fuse, tab, favorites]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setItems(prev => {
      const oldIdx = prev.findIndex(i => i.id === active.id);
      const newIdx = prev.findIndex(i => i.id === over.id);
      return arrayMove(prev, oldIdx, newIdx);
    });
  }

  function toggleFavorite(id) {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-cyan-400 mb-1">🥁 WaveDrum</h1>
        <p className="text-slate-400 text-sm">Editing Guide — drag to reorder, search, favorite</p>
      </header>

      <SearchBar query={query} onChange={setQuery} />

      <div className="flex gap-2 mb-4">
        {['all', 'favorites'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              tab === t ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}>
            {t === 'all' ? 'Todos' : '⭐ Favoritos'}
          </button>
        ))}
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={filtered.map(i => i.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {filtered.map(item => (
              <SortableItem
                key={item.id}
                item={item}
                isFavorite={favorites.includes(item.id)}
                onToggleFavorite={() => toggleFavorite(item.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {filtered.length === 0 && (
        <p className="text-center text-slate-500 mt-10">Nenhum item encontrado.</p>
      )}
    </div>
  );
}
