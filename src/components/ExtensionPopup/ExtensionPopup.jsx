import './ExtensionPopup.css'

function ExtensionPopup({
  title = 'The Quiet Art of Reading Slowly',
  source = 'theatlantic.com',
  onOpen,
  onDismiss,
}) {
  return (
    <div className="rs-autopopup" role="dialog" aria-label="Open in Readscape">
      <div className="rs-autopopup__logo">
        <span className="rs-autopopup__logo-mark">RS</span>
      </div>

      <div className="rs-autopopup__text">
        <div className="rs-autopopup__title">{title}</div>
        <div className="rs-autopopup__source">{source}</div>
      </div>

      <button
        type="button"
        className="rs-autopopup__cta"
        onClick={onOpen}
      >
        Open →
      </button>

      <button
        type="button"
        className="rs-autopopup__dismiss"
        onClick={onDismiss}
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  )
}

export default ExtensionPopup