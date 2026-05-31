import { useEffect, useState } from 'react'
import TopBar from './components/TopBar/TopBar'

function App() {
  const [posture, setPosture] = useState('read')
  const [theme, setTheme] = useState('paper')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('data-posture', posture)
  }, [posture])

  return (
    <>
      <TopBar
        progress={38}
        posture={posture}
        onPostureChange={setPosture}
        readTime={5}
        theme={theme}
        onThemeChange={setTheme}
        onOpenPanel={() => console.log('open panel')}
      />

      <div style={{ padding: 'var(--rs-space-7)', paddingTop: 'calc(48px + var(--rs-space-7))', maxWidth: '700px', margin: '0 auto' }}>
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
          but from believing you should have done more by now. It whispers that the books
          unread, the ideas unexplored, the conversations not yet had — that all of it
          represents a kind of failure. But reading, real reading, has never been about
          keeping up.
        </p>
      </div>
    </>
  )
}

export default App