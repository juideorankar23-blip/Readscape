import ProgressBar from '../ProgressBar/ProgressBar'
import PostureSwitcher from '../PostureSwitcher/PostureSwitcher'
import './TopBar.css'

const THEMES = [
  { id: 'paper', label: 'Paper', swatch: '#FAFAF8', ring: '#1A1A18' },
  { id: 'dusk', label: 'Dusk', swatch: '#141412', ring: '#E8E6DF' },
  { id: 'aged', label: 'Aged', swatch: '#F5EDD8', ring: '#2C2416' },
  { id: 'ambient', label: 'Ambient', swatch: '#EEEAF5', ring: '#7C6EA8' },
]

function TopBar({
  progress = 0,
  posture = 'read',
  onPostureChange,
  readTime,
  theme = 'paper',
  onThemeChange,
  onOpenPanel,
}) {
  const cycleTheme = () => {
    const i = THEMES.findIndex((t) => t.id === theme)
    const next = THEMES[(i + 1) % THEMES.length]
    onThemeChange?.(next.id)
  }

  const activeTheme = THEMES.find((t) => t.id === theme) ?? THEMES[0]

  return (
    <header className="rs-topbar">
      <ProgressBar progress={progress} />

      <div className="rs-topbar__row">
        <div className="rs-topbar__logo" aria-label="Readscape">
          <span className="rs-topbar__logo-mark">RS</span>
        </div>

        <div className="rs-topbar__spacer" />

        {readTime != null && (
          <span className="rs-topbar__meta">
            {readTime} min remaining
          </span>
        )}

        <PostureSwitcher value={posture} onChange={onPostureChange} />

        <button
          type="button"
          className="rs-topbar__theme-btn"
          onClick={cycleTheme}
          aria-label={`Theme: ${activeTheme.label}. Click to change.`}
          title={activeTheme.label}
        >
          <span
            className="rs-topbar__theme-swatch"
            style={{
              backgroundColor: activeTheme.swatch,
              borderColor: activeTheme.ring,
            }}
          />
        </button>

        <button
          type="button"
          className="rs-topbar__menu-btn"
          aria-label="Open preferences"
          onClick={onOpenPanel}
        >
          <svg
            className="rs-topbar__menu-icon"
            width="18"
            height="14"
            viewBox="0 0 18 14"
            fill="none"
            aria-hidden="true"
          >
            <line x1="1" y1="2" x2="17" y2="2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            <line x1="1" y1="7" x2="17" y2="7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            <line x1="1" y1="12" x2="17" y2="12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default TopBar