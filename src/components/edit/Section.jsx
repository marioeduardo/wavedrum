// Accordion section reusable.
export default function Section({ id, title, icon, defaultOpen = false, children }) {
  return (
    <details
      id={id}
      open={defaultOpen}
      className="group rounded-2xl border border-[#2a2a36] bg-[#14141c] overflow-hidden"
    >
      <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between gap-3 hover:bg-[#1a1a26] transition">
        <div className="flex items-center gap-3">
          {icon && <span className="text-xl">{icon}</span>}
          <h3 className="text-sm font-bold text-slate-100">{title}</h3>
        </div>
        <span className="text-slate-400 group-open:rotate-180 transition">▾</span>
      </summary>
      <div className="px-4 pb-4 pt-1 text-sm text-slate-300 leading-relaxed space-y-3 border-t border-[#2a2a36]/60">
        {children}
      </div>
    </details>
  );
}
