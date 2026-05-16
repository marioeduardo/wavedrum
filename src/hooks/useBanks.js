import { useLocalStorage } from './useLocalStorage';
import presetsData from '../data/presets.json';

const STORAGE_KEY = 'waveguide_banks';

function buildDefaultBanks() {
  const map = (arr) => arr.map(s => s.preset_id);
  return {
    bank_a: map(presetsData.default_live_banks.bank_a),
    bank_b: map(presetsData.default_live_banks.bank_b),
    bank_c: map(presetsData.default_live_banks.bank_c),
  };
}

export const DEFAULT_BANKS = buildDefaultBanks();

export function useBanks() {
  const [banks, setBanks] = useLocalStorage(STORAGE_KEY, buildDefaultBanks);

  function setSlot(bankId, slotIdx, presetId) {
    setBanks(prev => {
      const next = { ...prev, [bankId]: [...prev[bankId]] };
      next[bankId][slotIdx] = presetId;
      return next;
    });
  }

  function clearSlot(bankId, slotIdx) {
    setBanks(prev => {
      const next = { ...prev, [bankId]: [...prev[bankId]] };
      next[bankId][slotIdx] = null;
      return next;
    });
  }

  function moveSlot(fromBankId, fromIdx, toBankId, toIdx) {
    setBanks(prev => {
      const next = {
        ...prev,
        [fromBankId]: [...prev[fromBankId]],
        [toBankId]: [...prev[toBankId]],
      };
      const moving = next[fromBankId][fromIdx];
      const replaced = next[toBankId][toIdx];
      next[toBankId][toIdx] = moving;
      next[fromBankId][fromIdx] = replaced ?? null;
      return next;
    });
  }

  function clearBank(bankId) {
    setBanks(prev => ({ ...prev, [bankId]: [null, null, null, null] }));
  }

  function resetToFactory() {
    setBanks(buildDefaultBanks());
  }

  // Encontra primeiro slot vazio e coloca o preset. Se nenhum vazio, retorna false.
  function addToFirstEmpty(presetId) {
    let placed = null;
    setBanks(prev => {
      const next = { ...prev };
      for (const bid of ['bank_a', 'bank_b', 'bank_c']) {
        const arr = [...prev[bid]];
        const idx = arr.findIndex(v => v == null);
        if (idx !== -1) {
          arr[idx] = presetId;
          next[bid] = arr;
          placed = { bankId: bid, slotIdx: idx };
          break;
        }
      }
      return next;
    });
    return placed;
  }

  return {
    banks,
    setSlot,
    clearSlot,
    moveSlot,
    clearBank,
    resetToFactory,
    addToFirstEmpty,
  };
}
