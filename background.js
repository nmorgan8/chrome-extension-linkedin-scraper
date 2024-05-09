// Handle message from content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'scrapedData') {

    chrome.runtime.sendMessage({
      action: 'displayScrapedData',
      data: message.data
    });
  }
  return true
});