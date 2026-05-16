import { recipes } from '../../data/editingGuide';
import Section from './Section';

export default function RecipesSection() {
  return (
    <Section id="recipes" title="Receitas práticas" icon="🍳">
      <p className="text-xs text-slate-400">
        Passo a passo para situações reais. Comece do preset indicado e siga a sequência.
      </p>
      <div className="space-y-3">
        {recipes.map(r => (
          <article key={r.id} className="rounded-xl bg-[#1c1c26] border border-[#2a2a36] p-3.5">
            <h4 className="text-sm font-bold text-amber-200 mb-1">{r.title}</h4>
            <p className="text-[11px] text-slate-400 mb-2">
              <span className="text-slate-300 font-semibold">Preset base:</span> {r.base}
            </p>
            <ol className="space-y-1.5">
              {r.steps.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold mt-0.5">
                    {i + 1}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
            {r.tip && (
              <p className="mt-2.5 text-[11px] text-amber-300/90 italic border-t border-[#2a2a36] pt-2">💡 {r.tip}</p>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
