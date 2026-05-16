export default function SearchBar({ query, onChange }) {
  return (
    <div className="relative mb-4">
      <input
        type="text"
        placeholder="Buscar no guia..."
        value={query}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 pl-10
                   text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500
                   focus:border-transparent transition"
      />
      <svg className="absolute left-3 top-3 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  );
}
