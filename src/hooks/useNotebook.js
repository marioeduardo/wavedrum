import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY = 'waveguide_notebook';

export function useNotebook() {
  const [entries, setEntries] = useLocalStorage(STORAGE_KEY, []);

  function addEntry(entry) {
    const id = `note-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setEntries(prev => [{ id, date: new Date().toISOString(), ...entry }, ...prev]);
  }

  function updateEntry(id, patch) {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, ...patch } : e));
  }

  function deleteEntry(id) {
    setEntries(prev => prev.filter(e => e.id !== id));
  }

  function exportAsText() {
    if (!entries.length) return '';
    return entries.map(e => {
      const d = new Date(e.date).toLocaleDateString('pt-BR');
      return [
        `═════════════════════════════════════`,
        `Data: ${d}`,
        `Preset base: ${e.basePreset || '—'}`,
        `Salvo em: U.${String(e.userSlot ?? '__').padStart(2, '0')}` + (e.name ? `  Nome: ${e.name}` : ''),
        e.changes ? `\nParâmetros alterados:\n${e.changes}` : '',
        e.result ? `\nResultado: ${e.result}` : '',
      ].filter(Boolean).join('\n');
    }).join('\n\n');
  }

  return { entries, addEntry, updateEntry, deleteEntry, exportAsText };
}
