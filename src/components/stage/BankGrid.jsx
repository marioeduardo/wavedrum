import BankSlot from './BankSlot';

const LABELS = { bank_a: 'A', bank_b: 'B', bank_c: 'C' };

export default function BankGrid({ banks, onClearSlot, onPickEmpty, onClearBank }) {
  return (
    <div className="space-y-4">
      {(['bank_a','bank_b','bank_c']).map(bid => (
        <section key={bid} className="rounded-2xl bg-[#14141c]/60 border border-[#2a2a36] p-3">
          <header className="flex items-center justify-between mb-2 px-1">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-amber-500/15 text-amber-300 text-xs font-mono">
                {LABELS[bid]}
              </span>
              Bank {LABELS[bid]}
            </h3>
            <button
              type="button"
              onClick={() => onClearBank(bid)}
              className="text-[11px] text-slate-500 hover:text-rose-300"
            >
              limpar banco
            </button>
          </header>
          <div className="grid grid-cols-4 gap-2">
            {banks[bid].map((pid, idx) => (
              <BankSlot
                key={idx}
                bankId={bid}
                slotIdx={idx}
                presetId={pid}
                onClear={onClearSlot}
                onPick={onPickEmpty}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
