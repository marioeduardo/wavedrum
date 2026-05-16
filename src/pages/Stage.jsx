import { useState } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core';
import BankGrid from '../components/stage/BankGrid';
import StageInstructions from '../components/stage/StageInstructions';
import AddToBankSheet from '../components/stage/AddToBankSheet';
import { useBanks } from '../hooks/useBanks';
import { getPresetById } from '../hooks/useSearch';

const BANK_LABELS = { bank_a: 'A', bank_b: 'B', bank_c: 'C' };

function parseSlotKey(key) {
  const [bankId, idx] = String(key).split(':');
  return { bankId, slotIdx: parseInt(idx, 10) };
}

export default function Stage() {
  const { banks, clearSlot, setSlot, moveSlot, clearBank, resetToFactory } = useBanks();
  const [adding, setAdding] = useState(null);
  const [toast, setToast] = useState('');

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 1800);
  }

  function handleDragEnd(e) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const a = parseSlotKey(active.id);
    const b = parseSlotKey(over.id);
    moveSlot(a.bankId, a.slotIdx, b.bankId, b.slotIdx);
  }

  function handlePickEmpty(bankId, slotIdx) {
    setAdding({ bankId, slotIdx });
  }

  function handleAddPick(presetId) {
    if (adding) {
      setSlot(adding.bankId, adding.slotIdx, presetId);
      setAdding(null);
    }
  }

  function handleExport() {
    const lines = ['WaveGuide — Bancos Live Mode', '═══════════════════════════════'];
    for (const bid of ['bank_a','bank_b','bank_c']) {
      lines.push(`\nBank ${BANK_LABELS[bid]}:`);
      banks[bid].forEach((pid, idx) => {
        const p = pid != null ? getPresetById(pid) : null;
        lines.push(`  ${idx + 1}. ${p ? `${p.display} — ${p.name}` : '—'}`);
      });
    }
    const text = lines.join('\n');
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(
        () => showToast('Copiado para a área de transferência'),
        () => showToast('Não consegui copiar — abra o console')
      );
    } else {
      console.log(text);
      showToast('Copiado no console (clipboard indisponível)');
    }
  }

  function handleReset() {
    if (confirm('Resetar todos os bancos para o padrão de fábrica?')) {
      resetToFactory();
      showToast('Bancos restaurados');
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 pt-4 pb-6 space-y-4">
      <header className="flex items-baseline justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-slate-100">Stage</h2>
          <p className="text-xs text-slate-400">
            3 bancos × 4 botões — arraste para reorganizar.
          </p>
        </div>
        <div className="flex gap-1.5">
          <button onClick={handleExport}
                  className="text-xs rounded-lg border border-[#2a2a36] bg-[#14141c] hover:bg-[#1c1c26] text-slate-300 px-2.5 py-1.5">
            📋 Exportar
          </button>
          <button onClick={handleReset}
                  className="text-xs rounded-lg border border-[#2a2a36] bg-[#14141c] hover:bg-[#1c1c26] text-slate-300 px-2.5 py-1.5">
            ↺ Fábrica
          </button>
        </div>
      </header>

      <StageInstructions />

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <BankGrid
          banks={banks}
          onClearSlot={clearSlot}
          onPickEmpty={handlePickEmpty}
          onClearBank={clearBank}
        />
      </DndContext>

      {adding && (
        <AddToBankSheet
          bankId={adding.bankId}
          slotIdx={adding.slotIdx}
          onClose={() => setAdding(null)}
          onPick={handleAddPick}
        />
      )}

      {toast && (
        <div className="fixed bottom-24 inset-x-0 z-[70] flex justify-center pointer-events-none">
          <div className="bg-emerald-500/90 text-slate-900 font-semibold text-sm px-4 py-2 rounded-full shadow-lg animate-fade-in">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
