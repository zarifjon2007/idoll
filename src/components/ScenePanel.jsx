export default function ScenePanel({
  sceneId,
  scene,
  textParagraphs,
  hasInput,
  hasChoices,
  showNextButton,
  choices,
  inputValue,
  onInputChange,
  onInputSubmit,
  selectedChoice,
  onSelectChoice,
  onConfirmChoice,
  onNext,
}) {
  return (
    <main className="max-w-4xl mx-auto px-8 py-12 flex-1">
      <div className="rounded-2xl border border-cyan-500/50 bg-zinc-900/85 p-8 md:p-10">
        <p className="text-sm md:text-base font-mono text-cyan-400 mb-5 pb-3 border-b border-cyan-500/30">
          by Mfein
        </p>

        <div className="space-y-5 text-gray-200 leading-relaxed">
          {textParagraphs.map((p, i) => (
            <p key={i} className="whitespace-pre-line text-lg md:text-xl">
              {p}
            </p>
          ))}
        </div>

        {/* Input sahna */}
        {hasInput && scene?.input && (
          <div className="mt-10 pt-5 border-t border-cyan-500/30 space-y-4">
            {scene.input.key && (
              <input
                type="text"
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onInputSubmit()}
                placeholder={scene.input.placeholder || ''}
                className="w-full px-5 py-4 rounded-lg border-2 border-cyan-500/60 bg-zinc-900 text-gray-100 placeholder-zinc-500 focus:border-cyan-400 focus:outline-none"
              />
            )}
            <button
              type="button"
              onClick={onInputSubmit}
              className="w-full px-6 py-4 rounded-lg border-2 border-fuchsia-500/60 bg-zinc-900 text-gray-100 text-base md:text-lg hover:border-fuchsia-400 hover:bg-fuchsia-500/10 transition"
            >
              {scene.input.buttonText || 'Next'}
            </button>
          </div>
        )}

        {/* Tanlovlar */}
        {hasChoices && (
          <div className="mt-10 pt-5 border-t border-cyan-500/30 space-y-4">
            {choices.map((choice, i) => {
              const active = selectedChoice === choice;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => onSelectChoice(choice)}
                  className={
                    'w-full text-left px-6 py-4 rounded-xl border text-base md:text-lg transition ' +
                    (active
                      ? 'border-cyan-400 bg-cyan-500/20 text-cyan-100'
                      : 'border-fuchsia-500/60 bg-zinc-900 text-gray-100 hover:border-fuchsia-400 hover:bg-fuchsia-500/10')
                  }
                >
                  {choice._labelForRender ?? choice.text ?? 'Next'}
                </button>
              );
            })}
          </div>
        )}

        {/* Tanlovdan keyingi Next */}
        {hasChoices && selectedChoice && (
          <div className="mt-5">
            <button
              type="button"
              onClick={onConfirmChoice}
              className="w-full px-6 py-4 rounded-xl border border-cyan-500/60 bg-cyan-500/20 text-cyan-100 text-base md:text-lg hover:border-cyan-400 hover:bg-cyan-500/30 transition"
            >
              {scene?.nextButtonText || 'Next'}
            </button>
          </div>
        )}

        {/* Oddiy Next tugma */}
        {showNextButton && (
          <div className="mt-10 pt-5 border-t border-cyan-500/30">
            <button
              type="button"
              onClick={onNext}
              className="w-full px-6 py-4 rounded-xl border border-fuchsia-500/60 bg-zinc-900 text-gray-100 text-base md:text-lg hover:border-fuchsia-400 hover:bg-fuchsia-500/10 transition"
            >
              {scene?.nextButtonText || 'Next'}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

