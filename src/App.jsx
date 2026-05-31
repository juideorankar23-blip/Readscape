import { useEffect, useState } from 'react'
import TopBar from './components/TopBar/TopBar'
import PersonalisationPanel from './components/PersonalisationPanel/PersonalisationPanel'

function App() {
  const [theme, setTheme] = useState('paper')
  const [hue, setHue] = useState('lavender')
  const [font, setFont] = useState('lora')
  const [fontSize, setFontSize] = useState(20)
  const [posture, setPosture] = useState('read')
  const [focusMode, setFocusMode] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('data-posture', posture)
  }, [posture])

  useEffect(() => {
    if (theme === 'ambient') {
      document.documentElement.setAttribute('data-hue', hue)
    } else {
      document.documentElement.removeAttribute('data-hue')
    }
  }, [hue, theme])

  useEffect(() => {
    const families = {
      lora: "'Lora', Georgia, serif",
      merriweather: "'Merriweather', Georgia, serif",
      georgia: 'Georgia, serif',
    }
    document.documentElement.style.setProperty('--rs-font-serif', families[font])
  }, [font])

  useEffect(() => {
    if (focusMode) {
      document.documentElement.setAttribute('data-focus', 'on')
    } else {
      document.documentElement.removeAttribute('data-focus')
    }
  }, [focusMode])

  return (
    <>
      <TopBar
        progress={38}
        posture={posture}
        onPostureChange={setPosture}
        readTime={5}
        theme={theme}
        onThemeChange={setTheme}
        onOpenPanel={() => setPanelOpen(true)}
      />

      <PersonalisationPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        theme={theme}
        onThemeChange={setTheme}
        hue={hue}
        onHueChange={setHue}
        font={font}
        onFontChange={setFont}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        posture={posture}
        onPostureChange={setPosture}
        focusMode={focusMode}
        onFocusModeChange={setFocusMode}
      />

      <div style={{ padding: 'var(--rs-space-7)', paddingTop: 'calc(48px + var(--rs-space-7))', maxWidth: '700px', margin: '0 auto' }}>
        <p className="rs-article-byline">BY JAMES SOMERS · 8 MIN READ · THE ATLANTIC</p>
        <h1 className="rs-article-title" style={{ marginTop: 'var(--rs-space-4)' }}>
          You Are Not Behind
        </h1>
        <p className="rs-article-subhead" style={{ marginTop: 'var(--rs-space-3)' }}>
          A meditation on time, attention, and the grace of reading without urgency
        </p>
        <div className="rs-rule" style={{ width: '48px', height: '1px', background: 'var(--rs-accent)', margin: 'var(--rs-space-5) 0' }} />
        <p className="rs-article-body" style={{ fontSize: `${fontSize}px` }}>
          There is a particular kind of anxiety that arrives not from doing too little,
          but from believing you should have done more by now. It whispers that the books
          unread, the ideas unexplored, the conversations not yet had — that all of it
          represents a kind of failure. But reading, real reading, has never been about
          keeping up.
        </p>
        <p className="rs-article-body" style={{ fontSize: `${fontSize}px`, marginTop: 'var(--rs-space-5)' }}>
          Lora at twenty pixels with a line height of one point seven five is not an
          arbitrary choice. It is the typographic equivalent of a comfortable chair —
          the kind you sink into without noticing the furniture at all. The words arrive.
          That is enough.
        </p>
        <p className="rs-article-body" style={{ fontSize: `${fontSize}px`, marginTop: 'var(--rs-space-5)' }}>
          The web reading experience has been broken for so long that we have forgotten
          what it could be. Readscape is a small gesture against that forgetting — a
          quiet room in a noisy building.
        </p>
      </div>
    </>
  )
}

export default App