import './PostureSwitcher.css'

const POSTURES = [
  { id: 'scan', label: 'Scan' },
  { id: 'read', label: 'Read' },
  { id: 'deep', label: 'Deep' },
]

function PostureSwitcher({ value = 'read', onChange }) {
  return (
    <div
      className="rs-posture"
      role="radiogroup"
      aria-label="Reading posture"
    >
      {POSTURES.map((posture) => {
        const isActive = posture.id === value
        return (
          <button
            key={posture.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            className={`rs-posture__segment ${isActive ? 'rs-posture__segment--active' : ''}`}
            onClick={() => onChange?.(posture.id)}
          >
            {posture.label}
          </button>
        )
      })}
    </div>
  )
}

export default PostureSwitcher