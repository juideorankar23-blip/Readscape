// Background service worker

chrome.runtime.onInstalled.addListener(() => {
  console.log('Readscape installed')
})

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg?.type === 'READSCAPE_FETCH_FROM_TAB') {
    const tabId = msg.tabId
    if (!tabId) {
      sendResponse({ article: null, error: 'No tabId' })
      return
    }
    chrome.tabs.sendMessage(tabId, { type: 'READSCAPE_EXTRACT' }, (response) => {
      sendResponse(response ?? { article: null })
    })
    return true
  }
})