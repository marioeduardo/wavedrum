import Section from './Section';
import PresetDisplay from '../PresetDisplay';

export default function SaveSection() {
  return (
    <Section id="save" title="Salvando sons (WRITE)" icon="💾">
      <ol className="space-y-1.5">
        {[
          'Edite o som que quiser.',
          'Pressione WRITE uma vez — o display pisca o número do destino.',
          'Gire VALUE para escolher o slot User (U.00–U.99).',
          'Pressione WRITE novamente para confirmar.',
        ].map((t, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            <span className="shrink-0 w-6 h-6 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
            <span>{t}</span>
          </li>
        ))}
      </ol>
      <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 text-amber-100/90 text-xs px-3 py-2 leading-relaxed">
        Presets <PresetDisplay value="P.xx" size="sm" /> nunca são sobrescritos. Você sempre salva em <PresetDisplay value="U.xx" size="sm" />.
      </div>
    </Section>
  );
}
