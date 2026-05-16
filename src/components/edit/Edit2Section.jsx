import { edit2Parameters, playModes, globalParameters } from '../../data/editingGuide';
import Section from './Section';
import ParameterRow from './ParameterRow';
import PresetDisplay from '../PresetDisplay';

export default function Edit2Section() {
  return (
    <Section id="edit2" title="Edit 2 — PCM & sensores" icon="🎛">
      <p>Parâmetros do Edit 2 controlam qual sample PCM toca e como o sensor responde:</p>
      <div className="space-y-2">
        {edit2Parameters.map(p => <ParameterRow key={p.display} {...p} />)}
      </div>

      <div className="pt-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Play Modes
        </h4>
        <p className="text-xs text-slate-400 mb-2">
          Se um som parece "errado" ou sem punch, troque o Play Mode antes de qualquer outra coisa.
        </p>
        <div className="space-y-1.5">
          {playModes.map(m => (
            <div key={m.code} className="flex items-start gap-3 rounded-lg bg-[#1c1c26] border border-[#2a2a36] px-3 py-2">
              <PresetDisplay value={m.code} size="sm" />
              <span className="text-xs text-slate-300">{m.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Global (GLb)
        </h4>
        <div className="space-y-2">
          {globalParameters.map(p => <ParameterRow key={p.display} {...p} />)}
        </div>
      </div>
    </Section>
  );
}
