import './ExtensionClickPopup.css'

const RECENT_ARTICLES = [
  { id: 1, title: 'You Are Not Behind', source: 'theatlantic.com', readTime: 8 },
  { id: 2, title: "Why We Can't Stop Scrolling", source: 'nytimes.com', readTime: 6 },
  { id: 3, title: 'The Case for Doing Nothing', source: 'newyorker.com', readTime: 12 },
]

function ExtensionClickPopup({
  currentPage = { title: 'The Quiet Art of Reading Slowly', source: 'theatlantic.com' },
  onOpen,
  onOpenRecent,
  onClose,
  onSettings,
}) {
  return (
    <div className="rs-clickpopup">
      <header className="rs-clickpopup__header">
        <div className="rs-clickpopup__brand">
          <span className="rs-clickpopup__logo">
            <span className="rs-clickpopup__logo-mark">RS</span>
          </span>
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

      <section className="rs-clickpopup__recent">
        <div className="rs-ui-label rs-clickpopup__section-label">Recent</div>
        <ul className="rs-clickpopup__recent-list">
          {RECENT_ARTICLES.map((a) => (
            <li key={a.id}>
              <button
                type="button"
                className="rs-clickpopup__recent-row"
                onClick={() => onOpenRecent?.(a)}
              >
                <div className="rs-clickpopup__recent-text">
                  <div className="rs-clickpopup__recent-title">{a.title}</div>
                  <div className="rs-clickpopup__recent-meta">
                    {a.source} · {a.readTime} min
                  </div>
                </div>
                <span className="rs-clickpopup__recent-arrow">→</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <footer className="rs-clickpopup__footer">
        <button
          type="button"
          className="rs-clickpopup__footer-link"
          onClick={onSettings}
        >
          Settings
        </button>
        <span className="rs-clickpopup__version">v1.0</span>
      </footer>
    </div>
  )
}

export default ExtensionClickPopup