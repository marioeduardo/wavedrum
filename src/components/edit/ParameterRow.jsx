// Linha de tabela de parâmetro (mobile-friendly, sem table HTML).
export default function ParameterRow({ name, display, letters, range, desc, tip }) {
  return (
    <div className="rounded-xl bg-[#1c1c26] border border-[#2a2a36] px-3 py-2.5">
      <div className="flex items-baseline gap-2 mb-1">
        <code className="led led-sm">{display}</code>
        <span className="text-sm font-semibold text-slate-100">{name}</span>
        {range && <span className="text-[11px] text-slate-500 ml-auto font-mono">{range}</span>}
      </div>
      {letters && (
        <p className="text-[11px] text-amber-300/80 font-mono mb-1">{letters}</p>
      )}
      <p className="text-xs text-slate-300 leading-snug">{desc}</p>
      {tip && <p className="mt-1 text-[11px] text-amber-300/90 italic">💡 {tip}</p>}
    </div>
  );
}
