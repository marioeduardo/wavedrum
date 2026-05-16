import { navigationSteps, editModes } from '../../data/editingGuide';
import Section from './Section';
import PresetDisplay from '../PresetDisplay';

export default function NavigationSection() {
  return (
    <Section id="navigation" title="Navegação no aparelho" icon="🧭">
      <p>
        O Wavedrum não tem tela cheia — só um display de 3 caracteres. Cada modo tem um código curto:
      </p>
      <div className="grid grid-cols-3 gap-2">
        {editModes.map(m => (
          <div key={m.display} className="rounded-xl border border-[#2a2a36] bg-[#1c1c26] p-3 text-center">
            <div className="rounded-md bg-black/60 border border-[#2a2a36] py-1.5 px-2 inline-block mb-1.5">
              <PresetDisplay value={m.display} size="sm" />
            </div>
            <div className="text-xs font-semibold text-slate-100">{m.name}</div>
            <div className="text-[10.5px] text-slate-400 leading-snug mt-0.5">{m.desc}</div>
          </div>
        ))}
      </div>
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 mt-2">Para editar um som</h4>
        <ol className="space-y-1.5">
          {navigationSteps.map((s, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm">
              <span className="shrink-0 w-6 h-6 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span>{s.desc}</span>
            </li>
          ))}
        </ol>
      </div>
      <p className="text-[11px] text-slate-500 italic">
        Dica: letras MAIÚSCULAS no display = parâmetros do HEAD. minúsculas = parâmetros do RIM.
      </p>
    </Section>
  );
}
