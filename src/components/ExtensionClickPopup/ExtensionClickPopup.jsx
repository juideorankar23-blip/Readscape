import './ExtensionClickPopup.css'

function getLogoUrl() {
  if (typeof chrome !== 'undefined' && chrome.runtime?.getURL) {
    return chrome.runtime.getURL('public/icon-128.png')
  }
  return '/icon-128.png'
}

function ExtensionClickPopup({
  currentPage = { title: '', source: '' },
  onOpen,
  onClose,
}) {
  return (
    <div className="rs-clickpopup">
      <header className="rs-clickpopup__header">
        <div className="rs-clickpopup__brand">
          <img
            src={getLogoUrl()}
            alt=""
            className="rs-clickpopup__logo-img"
          />
          <span className="rs-clickpopup__name">Readscape</span>
        </div>
        <button
          type="button"
          className="rs-clickpopup__close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
      </header>

      <section className="rs-clickpopup__current">
        <div className="rs-ui-label rs-clickpopup__section-label">Current page</div>
        <div className="rs-clickpopup__current-title">{currentPage.title}</div>
        <div className="rs-clickpopup__current-source">{currentPage.source}</div>
      </section>

      <button
        type="button"
        className="rs-clickpopup__cta"
        onClick={() => onOpen?.(currentPage)}
      >
        Open in Readscape →
      </button>

      <footer className="rs-clickpopup__footer">
        <span className="rs-clickpopup__version">v1.0</span>
      </footer>
    </div>
  )
}

export default ExtensionClickPopup