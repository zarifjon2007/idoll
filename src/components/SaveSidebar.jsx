import { useRef } from 'react';

export default function SaveSidebar({
  slots,
  importedSlots,
  onSaveSlot,
  onLoadSlot,
  onDeleteSlot,
  onLoadImportedSlot,
  onDeleteImportedSlot,
  onClose,
  onExportCurrent,
  onImportFile,
}) {
  const fileInputRef = useRef(null);

  return (
    <aside className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[30rem] rounded-2xl border border-cyan-500/60 bg-zinc-900/95 shadow-[0_0_36px_rgba(34,211,238,0.35)] p-5 text-xs md:text-sm text-zinc-200 font-mono">
      <div className="flex items-center justify-between mb-4 border-b border-zinc-700 pb-3">
        <p className="uppercase tracking-[0.3em] text-cyan-300 font-medium text-[11px] md:text-xs">
          Save / Load
        </p>
        <button
          type="button"
          onClick={onClose}
          className="text-zinc-400 hover:text-zinc-100 px-3 py-1 rounded-full border border-zinc-600 hover:border-zinc-400 text-[10px] uppercase tracking-wider transition"
        >
          Close
        </button>
      </div>
      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
        {slots.map((slot, idx) => {
          const index = idx + 1;
          const label = slot?.savedAt
            ? new Date(slot.savedAt).toLocaleString()
            : 'Empty slot';
          return (
            <div
              key={index}
              className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-zinc-950/90 border border-zinc-700"
            >
              <div className="flex-1 min-w-0">
                <p className="truncate text-[11px] md:text-sm">
                  <span className="text-zinc-400">Slot {index}:</span> {label}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onSaveSlot(idx)}
                  className="px-2.5 py-0.5 rounded-full border border-zinc-600 text-[10px] hover:border-zinc-300"
                >
                  S
                </button>
                <button
                  type="button"
                  onClick={() => onLoadSlot(idx)}
                  disabled={!slot}
                  className="px-2.5 py-0.5 rounded-full border border-zinc-600 text-[10px] hover:border-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  L
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteSlot(idx)}
                  disabled={!slot}
                  className="px-2.5 py-0.5 rounded-full border border-zinc-600 text-[10px] text-red-300 hover:border-red-400 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ✕
                </button>
              </div>
            </div>
          );
        })}

        {Array.isArray(importedSlots) && importedSlots.some((slot) => slot) && (
          <div className="mt-4 space-y-2">
            <p className="uppercase tracking-[0.2em] text-cyan-400 text-[10px] md:text-[11px]">
              Imported Slots
            </p>
            <div className="space-y-2">
              {importedSlots.map((slot, idx) => {
                const index = idx + 1;
                const label = slot?.savedAt
                  ? new Date(slot.savedAt).toLocaleString()
                  : 'Empty imported slot';
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-zinc-950/90 border border-cyan-700/70"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-[11px] md:text-sm">
                        <span className="text-cyan-300">Imp {index}:</span> {label}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onLoadImportedSlot && onLoadImportedSlot(idx)}
                        disabled={!slot}
                        className="px-2.5 py-0.5 rounded-full border border-cyan-500/70 text-[10px] hover:border-cyan-300 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        L
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteImportedSlot && onDeleteImportedSlot(idx)}
                        disabled={!slot}
                        className="px-2.5 py-0.5 rounded-full border border-red-400/70 text-[10px] text-red-300 hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between text-[11px] md:text-xs">
        <button
          type="button"
          onClick={onExportCurrent}
          className="px-3 py-1.5 rounded-full border border-cyan-500/60 text-cyan-100 hover:border-cyan-300 hover:bg-cyan-500/10 transition"
        >
          Export JSON
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          className="px-3 py-1.5 rounded-full border border-cyan-500/60 text-cyan-100 hover:border-cyan-300 hover:bg-cyan-500/10 transition"
        >
          Import JSON
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files && e.target.files[0];
            if (file && onImportFile) {
              onImportFile(file);
            }
            if (e.target) {
              e.target.value = '';
            }
          }}
        />
      </div>
    </aside>
  );
}

