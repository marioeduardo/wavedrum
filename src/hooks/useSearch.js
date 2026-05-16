import { useMemo } from 'react';
import Fuse from 'fuse.js';
import presetsData from '../data/presets.json';

const ALL_PRESETS = presetsData.presets;

function norm(s) {
  return String(s ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

export function useSearch({ query, category, subcategory, region, character, sortBy }) {
  const fuse = useMemo(
    () => new Fuse(ALL_PRESETS, {
      keys: [
        { name: 'name',        weight: 0.45 },
        { name: 'tags',        weight: 0.25 },
        { name: 'subcategory', weight: 0.18 },
        { name: 'region',      weight: 0.07 },
        { name: 'notes',       weight: 0.05 },
      ],
      threshold: 0.38,
      ignoreLocation: true,
      includeScore: true,
      getFn: (obj, path) => {
        const k = Array.isArray(path) ? path[0] : path;
        const val = obj[k];
        if (Array.isArray(val)) return val.map(norm);
        return norm(val);
      },
    }),
    []
  );

  const filtered = useMemo(() => {
    let list = ALL_PRESETS;

    if (category)    list = list.filter(p => p.category === category);
    if (subcategory) list = list.filter(p => p.subcategory === subcategory);
    if (region)      list = list.filter(p => p.region === region);
    if (character)   list = list.filter(p => p.character === character);

    if (query && query.trim()) {
      const q = norm(query);
      const ids = new Set(fuse.search(q).map(r => r.item.id));
      list = list.filter(p => ids.has(p.id));
    }

    const out = [...list];
    if (sortBy === 'name')      out.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
    else if (sortBy === 'category') out.sort((a, b) => a.category.localeCompare(b.category, 'pt-BR') || a.id - b.id);
    else                        out.sort((a, b) => a.id - b.id);

    return out;
  }, [query, category, subcategory, region, character, sortBy, fuse]);

  return { results: filtered, total: ALL_PRESETS.length };
}

export function getPresetById(id) {
  return ALL_PRESETS.find(p => p.id === id) || null;
}

export const ALL = ALL_PRESETS;
