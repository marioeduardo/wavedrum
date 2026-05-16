// Mapeamento subcategoria/região → ícone (emoji).
// Sem dependência de imagens — funciona 100% offline.

export const subcategoryIcons = {
  'Snare':      '🥁',
  'Tom':        '🪘',
  'Conga':      '🪘',
  'Bongo':      '🪘',
  'Djembe':     '🪘',
  'Cajon':      '📦',
  'Taiko':      '🥢',
  'Tabla':      '🫖',
  'Udu':        '🏺',
  'Berimbau':   '🏹',
  'Pandeiro':   '🪘',
  'Surdo':      '🥁',
  'Timbales':   '🥁',
  'Darbuka':    '🏺',
  'Gamelan':    '🔔',
  'Kalimba':    '🎹',
  'Steel Drum': '🛢️',
  'Koto':       '🎻',
  'Balafon':    '🎼',
  'Kick':       '👟',
  'Combo':      '🎛️',
  'Ambient':    '🌫️',
  'Electronic': '⚡',
  'Efeito':     '✨',
};

export const regionIcons = {
  'Latino':         '🇨🇺',
  'Africano':       '🌍',
  'Japonês':        '🇯🇵',
  'Médio Oriente':  '🕌',
  'Indiano':        '🇮🇳',
  'Brasileiro':     '🇧🇷',
  'Orquestral':     '🎼',
  'Eletrônico':     '🎛️',
  'Flamenco':       '💃',
  'Asiático':       '🏯',
  'Global':         '🌐',
};

export const categoryIcons = {
  'Real Instrument':    '🪘',
  'Pitched Instrument': '🎵',
  'BD/SD Split':        '🥁',
  'Synth':              '🎛️',
  'Wavedrum Taste':     '🌊',
  'SE':                 '🔊',
};

export const characterIcons = {
  acoustic:   '🪵',
  electronic: '⚡',
  ambient:    '🌫️',
  expressive: '✋',
  melodic:    '🎵',
  dramatic:   '🎬',
  orchestral: '🎻',
};

// Cores por categoria — vão para classes Tailwind.
// Estilo: badge com fundo translúcido + borda + texto.
export const categoryStyles = {
  'Real Instrument':    { chip: 'bg-orange-500/15 text-orange-300 border-orange-500/30',  ring: 'ring-orange-500/40',  dot: 'bg-orange-400' },
  'Pitched Instrument': { chip: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30', ring: 'ring-emerald-500/40', dot: 'bg-emerald-400' },
  'BD/SD Split':        { chip: 'bg-sky-500/15 text-sky-300 border-sky-500/30',           ring: 'ring-sky-500/40',     dot: 'bg-sky-400' },
  'Synth':              { chip: 'bg-violet-500/15 text-violet-300 border-violet-500/30', ring: 'ring-violet-500/40',  dot: 'bg-violet-400' },
  'Wavedrum Taste':     { chip: 'bg-amber-500/15 text-amber-300 border-amber-500/30',    ring: 'ring-amber-500/40',   dot: 'bg-amber-400' },
  'SE':                 { chip: 'bg-teal-500/15 text-teal-300 border-teal-500/30',       ring: 'ring-teal-500/40',    dot: 'bg-teal-400' },
};

export function getSubcategoryIcon(sub) {
  return subcategoryIcons[sub] || '🥁';
}
export function getRegionIcon(region) {
  return regionIcons[region] || '🌐';
}
export function getCategoryIcon(cat) {
  return categoryIcons[cat] || '🥁';
}
export function getCategoryStyle(cat) {
  return categoryStyles[cat] || { chip: 'bg-slate-700 text-slate-300 border-slate-600', ring: 'ring-slate-500/40', dot: 'bg-slate-400' };
}
