import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import ExtensionClickPopup from '../components/ExtensionClickPopup/ExtensionClickPopup'
import '../styles/tokens.css'
import '../styles/typography.css'
import '../styles/global.css'
import './popup.css'

function Popup() {
  const [currentPage, setCurrentPage] = useState({
    title: 'Loading…',
    source: '',
    url: '',
  })

  useEffect(() => {
    if (typeof chrome === 'undefined' || !chrome.tabs) return

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0]
      if (!tab) return

      let source
      try {
        source = new URL(tab.url).hostname.replace(/^www\./, '')
      } catch {
        source = ''
      }

      setCurrentPage({
        title: tab.title || 'Untitled',
        source,
        url: tab.url || '',
      })
    })
  }, [])

  const openReader = () => {
    if (typeof chrome === 'undefined' || !chrome.tabs) return

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0]
      if (!tab) return
      chrome.tabs.create({
        url: chrome.runtime.getURL(`index.html?tabId=${tab.id}`),
      })
      window.close()
    })
  }

  return (
    <ExtensionClickPopup
      currentPage={currentPage}
      onOpen={openReader}
      onClose={() => window.close()}
    />
  )
}

createRoot(document.getElementById('popup-root')).render(
  <StrictMode>
    <Popup />
  </StrictMode>
)