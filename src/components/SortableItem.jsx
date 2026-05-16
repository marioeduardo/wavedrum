import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function SortableItem({ item, isFavorite, onToggleFavorite }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}
      className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-cyan-600 transition group">
      <div className="flex items-start gap-3">
        <button {...attributes} {...listeners}
          className="mt-1 cursor-grab active:cursor-grabbing text-slate-500 hover:text-slate-300 shrink-0">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 2a2 2 0 10.001 4.001A2 2 0 007 2zm0 6a2 2 0 10.001 4.001A2 2 0 007 8zm0 6a2 2 0 10.001 4.001A2 2 0 007 14zm6-8a2 2 0 10-.001-4.001A2 2 0 0013 6zm0 2a2 2 0 10.001 4.001A2 2 0 0013 8zm0 6a2 2 0 10.001 4.001A2 2 0 0013 14z" />
          </svg>
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-cyan-300 truncate">{item.title}</h3>
            <button onClick={onToggleFavorite}
              className="text-lg shrink-0 ml-2 transition hover:scale-110">
              {isFavorite ? '⭐' : '☆'}
            </button>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">{item.content}</p>
          {item.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {item.tags.map(tag => (
                <span key={tag} className="text-xs bg-slate-700 text-cyan-400 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
