import { useState } from 'react'
import Reader from './components/Reader/Reader'
import ExtensionClickPopup from './components/ExtensionClickPopup/ExtensionClickPopup'
import ExtensionPopup from './components/ExtensionPopup/ExtensionPopup'

const VIEWS = ['reader', 'clickpopup', 'autopopup']

function App() {
  const [view, setView] = useState('reader')

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: 16,
          left: 16,
          zIndex: 999,
          display: 'flex',
          gap: 8,
          padding: 8,
          background: 'var(--rs-surface)',
          border: '1px solid var(--rs-border)',
          borderRadius: 8,
          fontFamily: 'var(--rs-font-ui)',
          fontSize: 12,
        }}
      >
        {VIEWS.map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            style={{
              padding: '4px 10px',
              border: '1px solid var(--rs-border)',
              borderRadius: 4,
              background: view === v ? 'var(--rs-accent)' : 'transparent',
              color: view === v ? 'var(--rs-bg)' : 'var(--rs-text)',
              cursor: 'pointer',
            }}
          >
            {v}
          </button>
        ))}
      </div>

      {view === 'reader' && <Reader />}

      {view === 'clickpopup' && (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--rs-surface)',
          }}
        >
          <ExtensionClickPopup
            onOpen={() => setView('reader')}
            onClose={() => setView('reader')}
          />
        </div>
      )}

      {view === 'autopopup' && (
        <div
          style={{
            minHeight: '100vh',
            background: 'var(--rs-surface)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 60,
              right: 24,
            }}
          >
            <ExtensionPopup
              onOpen={() => setView('reader')}
              onDismiss={() => setView('reader')}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default App