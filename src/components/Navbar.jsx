export default function Navbar({ onShowStats, onToggleSaves }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-zinc-950/95 border-b border-cyan-500/40">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <span className="text-sm font-mono text-cyan-300 tracking-widest uppercase">
          i-doll
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSaves}
            className="px-5 py-2.5 rounded-full border border-cyan-500/60 bg-zinc-900/80 text-cyan-100 text-sm font-mono uppercase tracking-[0.25em] hover:border-cyan-400 hover:bg-cyan-500/10 hover:shadow-[0_0_12px_rgba(34,211,238,0.2)] transition duration-200"
          >
            Save / Load
          </button>
          <button
            type="button"
            onClick={onShowStats}
            className="px-5 py-2.5 rounded-full border border-cyan-500/60 bg-zinc-900/80 text-cyan-100 text-sm font-mono uppercase tracking-[0.25em] hover:border-cyan-400 hover:bg-cyan-500/10 hover:shadow-[0_0_12px_rgba(34,211,238,0.2)] transition duration-200"
          >
            Show Stats
          </button>
        </div>
      </div>
    </header>
  );
}


