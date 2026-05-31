import { Readability } from '@mozilla/readability'

export function extractFromDocument(doc = document) {
  try {
    const clone = doc.cloneNode(true)
    const reader = new Readability(clone)
    const article = reader.parse()
    if (!article) return null

    return {
      title: article.title || '',
      byline: article.byline || '',
      siteName: article.siteName || '',
      content: article.content || '',
      textContent: article.textContent || '',
      length: article.length || 0,
      excerpt: article.excerpt || '',
      readTime: estimateReadTime(article.textContent || ''),
    }
  } catch (err) {
    console.error('Readability extraction failed:', err)
    return null
  }
}

export async function extractFromUrl(url) {
  try {
    const res = await fetch(url)
    const html = await res.text()
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    return extractFromDocument(doc)
  } catch (err) {
    console.error('URL extraction failed:', err)
    return null
  }
}

export function estimateReadTime(text, wpm = 230) {
  if (!text) return 0
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / wpm))
}