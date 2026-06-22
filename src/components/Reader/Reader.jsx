import { useEffect, useRef, useState } from 'react'
import TopBar from '../TopBar/TopBar'
import PersonalisationPanel from '../PersonalisationPanel/PersonalisationPanel'
import ReaderSkeleton from './ReaderSkeleton'
import ReaderError from './ReaderError'
import { useReadingProgress } from '../../hooks/useReadingProgress'
import './Reader.css'

const SAMPLE_ARTICLE = {
  title: 'You Are Not Behind',
  subhead: 'A meditation on time, attention, and the grace of reading without urgency',
  byline: 'BY JAMES SOMERS',
  siteName: 'THE ATLANTIC',
  readTime: 8,
  contentHtml: null,
  paragraphs: [
    'There is a particular kind of anxiety that arrives not from doing too little, but from believing you should have done more by now. It whispers that the books unread, the ideas unexplored, the conversations not yet had — that all of it represents a kind of failure. But reading, real reading, has never been about keeping up.',
    'Lora at twenty pixels with a line height of one point seven five is not an arbitrary choice. It is the typographic equivalent of a comfortable chair — the kind you sink into without noticing the furniture at all. The words arrive. That is enough.',
    'The web reading experience has been broken for so long that we have forgotten what it could be. Readscape is a small gesture against that forgetting — a quiet room in a noisy building.',
    'Consider how much of what we read each day is shaped not by the writer but by the platform — the ads, the recommendations, the urgency of an unread counter. The page is no longer the page. It has become a marketplace dressed as a page.',
    'To read slowly is a small act of resistance. Not against technology itself, but against the parts of it that ask us to be faster, shallower, more distracted versions of ourselves. The text has always been patient. We are the ones who forgot how to wait.',
  ],
}

function Reader() {
  const articleRef = useRef(null)
  const progress = useReadingProgress(articleRef)

  const [article, setArticle] = useState(SAMPLE_ARTICLE)
  const [status, setStatus] = useState('ready') // 'loading' | 'ready' | 'error'

  const [theme, setTheme] = useState('paper')
  const [hue, setHue] = useState('lavender')
  const [font, setFont] = useState('lora')
  const [fontSize, setFontSize] = useState(20)
  const [posture, setPosture] = useState('read')
  const [focusMode, setFocusMode] = useState(false)
  const [panelOpen, setPanelOpen] = useState(() => {
  if (typeof window === 'undefined') return false
  const params = new URLSearchParams(window.location.search)
  return params.get('settings') === '1'
})

  // If launched via the extension, fetch the article from the source tab
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tabId = params.get('tabId')
    if (!tabId) return
    if (typeof chrome === 'undefined' || !chrome.runtime) return

    setStatus('loading')
    chrome.runtime.sendMessage(
      { type: 'READSCAPE_FETCH_FROM_TAB', tabId: Number(tabId) },
      (response) => {
        if (!response?.article) {
          setStatus('error')
          return
        }
        setArticle({
          title: response.article.title,
          subhead: '',
          byline: response.article.byline ? `BY ${response.article.byline.toUpperCase()}` : '',
          siteName: response.article.siteName,
          readTime: response.article.readTime,
          contentHtml: response.article.content,
          paragraphs: [],
        })
        setStatus('ready')
      }
    )
  }, [])

  useEffect(() => { document.documentElement.setAttribute('data-theme', theme) }, [theme])
  useEffect(() => { document.documentElement.setAttribute('data-posture', posture) }, [posture])
  useEffect(() => {
    if (theme === 'ambient') document.documentElement.setAttribute('data-hue', hue)
    else document.documentElement.removeAttribute('data-hue')
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
    if (focusMode) document.documentElement.setAttribute('data-focus', 'on')
    else document.documentElement.removeAttribute('data-focus')
  }, [focusMode])

  if (status === 'loading') return <ReaderSkeleton />
  if (status === 'error') return <ReaderError onRetry={() => window.close()} retryLabel="← Close" />

  const minutesRemaining = Math.max(0, Math.ceil((1 - progress / 100) * (article.readTime ?? 8)))

  return (
    <>
      <TopBar
        progress={progress}
        posture={posture}
        onPostureChange={setPosture}
        readTime={minutesRemaining}
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

      <article ref={articleRef} className="rs-reader">
        <p className="rs-article-byline">
          {article.byline} · {article.readTime} MIN READ · {article.siteName}
        </p>

        <h1 className="rs-article-title rs-reader__title">{article.title}</h1>

        {article.subhead && (
          <p className="rs-article-subhead rs-reader__subhead">{article.subhead}</p>
        )}

        <div className="rs-rule rs-reader__rule" />

        {article.contentHtml ? (
          <div
            className="rs-reader__html"
            style={{ fontSize: `${fontSize}px` }}
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />
        ) : (
          article.paragraphs.map((p, i) => (
            <p
              key={i}
              className="rs-article-body rs-reader__paragraph"
              style={{ fontSize: `${fontSize}px` }}
            >
              {p}
            </p>
          ))
        )}
      </article>
    </>
  )
}

export default Reader