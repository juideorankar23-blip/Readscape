import ProgressBar from './components/ProgressBar/ProgressBar'

function App() {
  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <ProgressBar progress={38} />
      </div>
      <div style={{ padding: 'var(--rs-space-7)', maxWidth: '700px', margin: '0 auto' }}>
        <p className="rs-article-byline">BY JAMES SOMERS · 8 MIN READ · THE ATLANTIC</p>
        <h1 className="rs-article-title" style={{ marginTop: 'var(--rs-space-4)' }}>
          You Are Not Behind
        </h1>
        <p className="rs-article-subhead" style={{ marginTop: 'var(--rs-space-3)' }}>
          A meditation on time, attention, and the grace of reading without urgency
        </p>
        <div style={{ width: '48px', height: '1px', background: 'var(--rs-accent)', margin: 'var(--rs-space-5) 0' }} />
        <p className="rs-article-body">
          There is a particular kind of anxiety that arrives not from doing too little,
          but from believing you should have done more by now.
        </p>
      </div>
    </>
  )
}

export default App