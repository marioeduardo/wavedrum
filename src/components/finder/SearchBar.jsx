export default function SearchBar({ query, onChange, placeholder = 'Buscar preset, instrumento, tag…' }) {
  return (
    <div className="relative">
      <input
        type="search"
        inputMode="search"
        autoCapitalize="none"
        autoCorrect="off"
        placeholder={placeholder}
        value={query}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-[#14141c] border border-[#2a2a36] rounded-xl pl-11 pr-10 py-3 text-base
                   text-slate-100 placeholder-slate-500
                   focus:outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 transition"
      />
      <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
           fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
      </svg>
      {query && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 inline-flex items-center justify-center text-slate-400 hover:text-slate-200"
          aria-label="Limpar busca"
        >
          ✕
        </button>
      )}
    </div>
  );
}
