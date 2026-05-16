import { universalParameters, algorithmSpecificExamples } from '../../data/editingGuide';
import Section from './Section';
import ParameterRow from './ParameterRow';

export default function Edit1Section() {
  return (
    <Section id="edit1" title="Edit 1 — Motor DSP" icon="🎚">
      <p>Parâmetros universais que aparecem em todos os algoritmos:</p>
      <div className="space-y-2">
        {universalParameters.map(p => <ParameterRow key={p.display} {...p} />)}
      </div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-3">
        Parâmetros específicos por algoritmo (exemplos)
      </h4>
      <div className="space-y-2.5">
        {algorithmSpecificExamples.map(grp => (
          <div key={grp.name} className="rounded-xl border border-[#2a2a36] bg-[#1c1c26] p-3">
            <div className="text-xs font-semibold text-slate-100 mb-2">{grp.name}</div>
            <ul className="space-y-1.5">
              {grp.params.map(p => (
                <li key={p.display} className="flex items-start gap-2 text-xs">
                  <code className="led led-sm shrink-0">{p.display}</code>
                  <span className="text-slate-300">{p.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
