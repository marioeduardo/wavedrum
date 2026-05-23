import { universalParameters, algorithmSpecificExamples, displayConvention } from '../../data/editingGuide';
import Section from './Section';
import ParameterRow from './ParameterRow';
import DisplayConventionCard from './DisplayConventionCard';

export default function Edit1Section() {
  return (
    <Section id="edit1" title="Edit 1 — Motor DSP" icon="🎚">
      <DisplayConventionCard convention={displayConvention.edit1} variant="edit1" />

      <p className="pt-1">
        Parâmetros universais que aparecem em todos os algoritmos. Cada código tem 3 letras no display do aparelho —
        a explicação letra-por-letra está em <span className="text-amber-300 font-mono">amber</span> abaixo do nome.
      </p>
      <div className="space-y-2">
        {universalParameters.map(p => <ParameterRow key={p.display} {...p} />)}
      </div>

      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-3">
        Parâmetros específicos por algoritmo
      </h4>
      <p className="text-xs text-slate-400">
        Aparecem só quando o algoritmo correspondente está ativo — vão além dos 11 universais acima.
      </p>
      <div className="space-y-2.5">
        {algorithmSpecificExamples.map(grp => (
          <div key={grp.name} className="rounded-xl border border-[#2a2a36] bg-[#1c1c26] p-3">
            <div className="text-xs font-semibold text-slate-100 mb-2">{grp.name}</div>
            <ul className="space-y-2">
              {grp.params.map(p => (
                <li key={p.display}>
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <code className="led led-sm">{p.display}</code>
                    {p.letters && <span className="text-[11px] text-amber-300/80 font-mono">{p.letters}</span>}
                  </div>
                  <p className="text-xs text-slate-300 leading-snug">{p.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
