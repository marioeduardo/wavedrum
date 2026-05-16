import { useMemo, useState } from 'react';
import { singleSizeAlgorithms, doubleSizeAlgorithms } from '../../data/editingGuide';
import Section from './Section';

function norm(s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase(); }

export default function AlgorithmsSection() {
  const [q, setQ] = useState('');
  const qq = norm(q);

  const single = useMemo(() => singleSizeAlgorithms.filter(a =>
    !qq || norm(`${a.name} ${a.family} ${a.useFor}`).includes(qq)
  ), [qq]);
  const dbl = useMemo(() => doubleSizeAlgorithms.filter(a =>
    !qq || norm(`${a.name} ${a.base}`).includes(qq)
  ), [qq]);

  return (
    <Section id="algos" title="60 Algoritmos DSP" icon="⚙️">
      <input
        type="search"
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Filtrar algoritmo…"
        className="w-full bg-[#1c1c26] border border-[#2a2a36] rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
      />

      <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 text-amber-100/90 text-xs leading-relaxed px-3 py-2">
        <strong className="text-amber-300">Double-size:</strong> o instrumento inteiro funciona como um único objeto.
        Centro = grave/aberto, borda = slap/agudo. Single-size deixa head e rim independentes.
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Single-size (01–26)
        </h4>
        <ul className="space-y-1">
          {single.map(a => (
            <li key={a.id} className="grid grid-cols-[2.2rem_1fr] gap-3 items-baseline rounded-lg bg-[#1c1c26] border border-[#2a2a36] px-2.5 py-2">
              <code className="led led-sm">{String(a.id).padStart(2,'0')}</code>
              <div>
                <div className="text-sm font-semibold text-slate-100">{a.name}</div>
                <div className="text-[11px] text-slate-400">{a.family} · <span className="text-slate-500">{a.useFor}</span></div>
              </div>
            </li>
          ))}
          {!single.length && <li className="text-xs text-slate-500">Nenhum.</li>}
        </ul>
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-300/80 mb-2 mt-2">
          Double-size (27–36)
        </h4>
        <ul className="space-y-1">
          {dbl.map(a => (
            <li key={a.id} className="grid grid-cols-[2.2rem_1fr] gap-3 items-baseline rounded-lg bg-rose-500/5 border border-rose-500/20 px-2.5 py-2">
              <code className="led led-sm">{String(a.id).padStart(2,'0')}</code>
              <div>
                <div className="text-sm font-semibold text-slate-100">{a.name}</div>
                <div className="text-[11px] text-slate-400">{a.base}</div>
              </div>
            </li>
          ))}
          {!dbl.length && <li className="text-xs text-slate-500">Nenhum.</li>}
        </ul>
      </div>
    </Section>
  );
}
