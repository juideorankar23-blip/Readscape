// Content script: runs on every page. Extracts article content on demand.

import { Readability } from '@mozilla/readability'

function extractArticle() {
  try {
    const clone = document.cloneNode(true)
    const reader = new Readability(clone)
    const article = reader.parse()
    if (!article) return null

    const wpm = 230
    const wordCount = (article.textContent || '').trim().split(/\s+/).length
    const readTime = Math.max(1, Math.round(wordCount / wpm))

    return {
      title: article.title || document.title,
      byline: article.byline || '',
      siteName: article.siteName || location.hostname.replace(/^www\./, ''),
      content: article.content || '',
      textContent: article.textContent || '',
      excerpt: article.excerpt || '',
      readTime,
      url: location.href,
    }
  } catch (err) {
    console.error('Readscape extraction failed:', err)
    return null
  }
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg?.type === 'READSCAPE_EXTRACT') {
    const article = extractArticle()
    sendResponse({ article })
    return true
  }
})