import './ProgressBar.css'

function ProgressBar({ progress = 0 }) {
  // Clamp progress between 0 and 100
  const clamped = Math.min(100, Math.max(0, progress))

  return (
    <div
      className="rs-progress"
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="rs-progress__fill"
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}

export default ProgressBar