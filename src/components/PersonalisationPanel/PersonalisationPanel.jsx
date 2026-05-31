import PostureSwitcher from '../PostureSwitcher/PostureSwitcher'
import './PersonalisationPanel.css'

const THEMES = [
  { id: 'paper', label: 'Paper' },
  { id: 'dusk', label: 'Dusk' },
  { id: 'aged', label: 'Aged' },
  { id: 'ambient', label: 'Ambient' },
]

const AMBIENT_HUES = [
  { id: 'lavender', label: 'Lavender', color: '#7C6EA8' },
  { id: 'sage', label: 'Sage', color: '#4A8A5E' },
  { id: 'slate', label: 'Slate', color: '#4A7090' },
  { id: 'rose', label: 'Rose', color: '#9A5A62' },
  { id: 'sand', label: 'Sand', color: '#8A7448' },
]

const FONTS = [
  { id: 'lora', label: 'Lora', family: "'Lora', Georgia, serif" },
  { id: 'merriweather', label: 'Merriweather', family: "'Merriweather', Georgia, serif" },
  { id: 'georgia', label: 'Georgia', family: 'Georgia, serif' },
]

function PersonalisationPanel({
  open,
  onClose,
  theme,
  onThemeChange,
  hue,
  onHueChange,
  font,
  onFontChange,
  fontSize,
  onFontSizeChange,
  posture,
  onPostureChange,
  focusMode,
  onFocusModeChange,
}) {
  if (!open) return null

  const activeHue = AMBIENT_HUES.find((h) => h.id === hue) ?? AMBIENT_HUES[0]

  return (
    <>
      <div className="rs-panel__overlay" onClick={onClose} aria-hidden="true" />

      <aside className="rs-panel" role="dialog" aria-label="Preferences">
        <header className="rs-panel__header">
          <button
            type="button"
            className="rs-panel__close"
            onClick={onClose}
            aria-label="Close preferences"
          >
            ✕
          </button>
          <h2 className="rs-panel__title">Preferences</h2>
          <span className="rs-panel__header-spacer" />
        </header>

        <div className="rs-panel__sections">
          <section className="rs-panel__section">
            <div className="rs-ui-label rs-panel__label">Reading theme</div>
            <div className="rs-chip-row">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`rs-chip ${theme === t.id ? 'rs-chip--active' : ''}`}
                  onClick={() => onThemeChange?.(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </section>

          {theme === 'ambient' && (
            <section className="rs-panel__section">
              <div className="rs-ui-label rs-panel__label">Ambient hue</div>
              <div className="rs-hue-row">
                {AMBIENT_HUES.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    className={`rs-hue-dot ${hue === h.id ? 'rs-hue-dot--active' : ''}`}
                    style={{ backgroundColor: h.color }}
                    onClick={() => onHueChange?.(h.id)}
                    aria-label={h.label}
                  />
                ))}
                <span className="rs-hue-label">{activeHue.label}</span>
              </div>
            </section>
          )}

          <section className="rs-panel__section">
            <div className="rs-ui-label rs-panel__label">Font</div>
            <div className="rs-chip-row">
              {FONTS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`rs-chip ${font === f.id ? 'rs-chip--active' : ''}`}
                  style={{ fontFamily: f.family }}
                  onClick={() => onFontChange?.(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </section>

          <section className="rs-panel__section">
            <div className="rs-ui-label rs-panel__label">Size</div>
            <div className="rs-size-row">
              <span className="rs-size-marker rs-size-marker--small">A</span>
              <input
                type="range"
                min="16"
                max="24"
                step="1"
                value={fontSize}
                onChange={(e) => onFontSizeChange?.(Number(e.target.value))}
                className="rs-size-slider"
                aria-label="Font size"
              />
              <span className="rs-size-marker rs-size-marker--large">A</span>
            </div>
          </section>

          <section className="rs-panel__section">
            <div className="rs-ui-label rs-panel__label">Reading posture</div>
            <PostureSwitcher value={posture} onChange={onPostureChange} />
          </section>

          <section className="rs-panel__section rs-panel__section--focus">
            <div className="rs-focus-row">
              <div className="rs-focus-text">
                <div className="rs-focus-title">Focus mode</div>
                <div className="rs-focus-desc">Dim everything but the current paragraph</div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={focusMode}
                className={`rs-toggle ${focusMode ? 'rs-toggle--on' : ''}`}
                onClick={() => onFocusModeChange?.(!focusMode)}
                aria-label="Focus mode"
              >
                <span className="rs-toggle__knob" />
              </button>
            </div>
          </section>
        </div>
      </aside>
    </>
  )
}

export default PersonalisationPanel