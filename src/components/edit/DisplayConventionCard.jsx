// Callout que ensina a convenção de leitura dos códigos no display.
import PresetDisplay from '../PresetDisplay';

export default function DisplayConventionCard({ convention, variant = 'edit1' }) {
  const tone = variant === 'edit2' ? 'sky' : 'amber';
  const toneClasses = {
    amber: 'bg-amber-500/5 border-amber-500/25 text-amber-100',
    sky:   'bg-sky-500/5   border-sky-500/25   text-sky-100',
  }[tone];
  const accent = {
    amber: 'text-amber-300',
    sky:   'text-sky-300',
  }[tone];

  return (
    <details className={`rounded-xl border ${toneClasses} group`}>
      <summary className={`cursor-pointer list-none px-3 py-2 flex items-center justify-between gap-2`}>
        <span className={`text-xs font-semibold ${accent} flex items-center gap-1.5`}>
          📺 {convention.title}
        </span>
        <span className={`${accent} group-open:rotate-180 transition`}>▾</span>
      </summary>
      <div className="px-3 pb-3 pt-1 space-y-2.5 text-xs leading-relaxed">
        <ul className="space-y-1.5">
          {convention.rules.map((r, i) => (
            <li key={i} className="grid grid-cols-[3.6rem_1fr] gap-2 items-baseline">
              <code className="led led-sm">{r.code}</code>
              <span>{r.meaning}</span>
            </li>
          ))}
        </ul>

        {convention.examples && (
          <div className="pt-1.5 border-t border-white/5">
            <p className={`text-[10.5px] uppercase tracking-wider font-semibold ${accent} mb-1.5`}>Exemplos</p>
            <ul className="space-y-1">
              {convention.examples.map(([code, meaning], i) => (
                <li key={i} className="flex items-baseline gap-2">
                  <PresetDisplay value={code} size="sm" />
                  <span className="text-slate-300">{meaning}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {convention.note && (
          <p className="text-[11px] italic opacity-90 border-t border-white/5 pt-2">{convention.note}</p>
        )}
      </div>
    </details>
  );
}
