import './ReaderError.css'

function ReaderError({
  title = "This page couldn't be simplified",
  message = 'Readscape works best with long-form article pages. Try a different URL.',
  onRetry,
  retryLabel = '← Go back',
}) {
  return (
    <div className="rs-error" role="alert">
      <div className="rs-error__icon" aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="1" y="1" width="46" height="46" rx="8" stroke="currentColor" strokeWidth="1.5" />
          <line x1="16" y1="24" x2="32" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      <h1 className="rs-error__title">{title}</h1>
      <p className="rs-error__message">{message}</p>

      {onRetry && (
        <button
          type="button"
          className="rs-error__btn"
          onClick={onRetry}
        >
          {retryLabel}
        </button>
      )}
    </div>
  )
}

export default ReaderError