import { useState } from 'react';
import Section from './Section';
import { useNotebook } from '../../hooks/useNotebook';

const EMPTY = { basePreset: '', changes: '', result: '', userSlot: '', name: '' };

export default function NotebookSection() {
  const { entries, addEntry, deleteEntry, exportAsText } = useNotebook();
  const [form, setForm] = useState(EMPTY);
  const [open, setOpen] = useState(false);

  function update(k, v) { setForm(f => ({ ...f, [k]: v })); }
  function save() {
    if (!form.basePreset && !form.changes && !form.result) return;
    addEntry(form);
    setForm(EMPTY);
    setOpen(false);
  }
  function exportText() {
    const text = exportAsText();
    if (!text) return;
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text);
    alert('Caderno copiado para a área de transferência.');
  }

  return (
    <Section id="notebook" title="Caderno de descobertas" icon="📓">
      <p className="text-xs text-slate-400">
        Registre seus sons editados. Salvo só no seu dispositivo — não há nuvem.
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => setOpen(o => !o)}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-200 hover:bg-amber-500/25 px-3 py-2 text-sm font-semibold transition"
        >
          {open ? 'Cancelar' : '+ Nova entrada'}
        </button>
        {entries.length > 0 && (
          <button
            onClick={exportText}
            className="rounded-lg bg-[#1c1c26] border border-[#2a2a36] text-slate-300 hover:bg-[#26263a] px-3 py-2 text-sm"
            title="Copiar todas as entradas"
          >
            📋
          </button>
        )}
      </div>

      {open && (
        <div className="rounded-xl bg-[#1c1c26] border border-[#2a2a36] p-3 space-y-2 animate-fade-in">
          <Field label="Preset base (ex: P.19, P.47…)" value={form.basePreset} onChange={v => update('basePreset', v)} />
          <Field label="Parâmetros alterados" value={form.changes} onChange={v => update('changes', v)} multiline />
          <Field label="Resultado (descrição livre)" value={form.result} onChange={v => update('result', v)} multiline />
          <div className="grid grid-cols-2 gap-2">
            <Field label="Salvo em U." value={form.userSlot} onChange={v => update('userSlot', v.replace(/\D/g,'').slice(0,2))} />
            <Field label="Nome" value={form.name} onChange={v => update('name', v)} />
          </div>
          <button
            onClick={save}
            className="w-full rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 hover:bg-emerald-500/25 px-3 py-2 text-sm font-semibold"
          >
            Salvar entrada
          </button>
        </div>
      )}

      {entries.length === 0 ? (
        <div className="text-center py-6 text-xs text-slate-500">
          Nenhuma descoberta ainda. Edite um som, salve em um slot User e anote aqui.
        </div>
      ) : (
        <ul className="space-y-2">
          {entries.map(e => (
            <li key={e.id} className="rounded-xl bg-[#1c1c26] border border-[#2a2a36] p-3">
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <div className="text-xs font-semibold text-slate-100">
                  {e.basePreset || '—'} → U.{String(e.userSlot ?? '__').padStart(2,'0')}
                  {e.name && <span className="text-slate-400 font-normal"> · {e.name}</span>}
                </div>
                <button onClick={() => deleteEntry(e.id)} className="text-[11px] text-slate-500 hover:text-rose-300">
                  excluir
                </button>
              </div>
              <div className="text-[11px] text-slate-500">{new Date(e.date).toLocaleDateString('pt-BR')}</div>
              {e.changes && <pre className="text-[11px] text-slate-300 whitespace-pre-wrap mt-1.5">{e.changes}</pre>}
              {e.result && <p className="text-[11px] text-slate-400 mt-1 italic">{e.result}</p>}
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}

function Field({ label, value, onChange, multiline }) {
  const Comp = multiline ? 'textarea' : 'input';
  return (
    <label className="block">
      <span className="block text-[10.5px] uppercase tracking-wider text-slate-500 font-semibold mb-1">{label}</span>
      <Comp
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={multiline ? 2 : undefined}
        className="w-full bg-[#0f0f17] border border-[#2a2a36] rounded-md px-2.5 py-1.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500/60"
      />
    </label>
  );
}
