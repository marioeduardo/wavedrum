import { architecture } from '../../data/editingGuide';
import Section from './Section';

export default function ArchitectureSection() {
  return (
    <Section id="architecture" title="Arquitetura do Som" icon="🧱" defaultOpen>
      <p>{architecture.summary}</p>
      <pre className="text-[10.5px] sm:text-xs leading-tight text-slate-300 bg-black/50 border border-[#2a2a36] rounded-lg p-3 overflow-x-auto font-mono whitespace-pre">
{architecture.diagram}
      </pre>
      <ul className="list-disc list-inside space-y-1.5 text-sm">
        {architecture.bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    </Section>
  );
}
