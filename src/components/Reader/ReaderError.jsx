import './ReaderError.css'

function getLogoUrl() {
  if (typeof chrome !== 'undefined' && chrome.runtime?.getURL) {
    return chrome.runtime.getURL('public/icon-128.png')
  }
  return '/icon-128.png'
}

function ReaderError({
  title = "This page couldn't be simplified",
  message = 'Readscape works best with long-form article pages. Try a different URL.',
  onRetry,
  retryLabel = '← Go back',
}) {
  return (
    <div className="rs-error" role="alert">
      <div className="rs-error__icon" aria-hidden="true">
        <img src={getLogoUrl()} alt="" />
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