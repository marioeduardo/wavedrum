import { liveModeInstructions } from '../../data/editingGuide';

export default function StageInstructions() {
  return (
    <details className="rounded-2xl border border-amber-500/20 bg-amber-500/5 group">
      <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-amber-200 flex items-center gap-2">
          <span>📘</span> Como atribuir no aparelho
        </span>
        <span className="text-amber-300 group-open:rotate-180 transition">▾</span>
      </summary>
      <div className="px-4 pb-4 text-sm text-amber-100/90 leading-relaxed space-y-2">
        <p>{liveModeInstructions.intro}</p>
        <ol className="list-decimal list-inside space-y-1 marker:text-amber-400/70">
          {liveModeInstructions.steps.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
      </div>
    </details>
  );
}
