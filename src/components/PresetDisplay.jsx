// Display LED — mostra "P.19", "U.03", etc. com cara de 7-segments.

const SIZES = { sm: 'led-sm', md: 'led-md', lg: 'led-lg', xl: 'led-xl' };

export default function PresetDisplay({ value, size = 'md', pulse = false, dim = false, className = '' }) {
  const sz = SIZES[size] || SIZES.md;
  return (
    <span className={`led ${sz} ${pulse ? 'led-pulse' : ''} ${dim ? 'led-dim' : ''} ${className}`}>
      {value}
    </span>
  );
}
