// Function to send message to content script to scrape data
function scrapeDataFromContentScript() {
  // Send message to content script
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'scrapeData' });
  });
}

// Function to display scraped data in the popup
function displayScrapedData(scrapedData) {
  // Display data in the popup
  const profileDataElement = document.getElementById('profileData');
  profileDataElement.innerHTML = ''; // Clear previous data

  for (const [key, value] of Object.entries(scrapedData)) {
    const listItem = document.createElement('p');

    if (Array.isArray(value)) {
      console.log(value)
      const listItems = value.map(item => `<li>${item.map(i => `<p style="margin: 0">${i}</p>`).join('')}</li>`).join('');
      listItem.innerHTML = `<strong>${key}:</strong><ul>${listItems}</ul>`;
    } else {
      listItem.innerHTML = `<strong>${key}:</strong> ${value}`;
    }

    profileDataElement.appendChild(listItem);
  }
}

// Add event listener for popup opening
document.addEventListener('DOMContentLoaded', function() {
  // Send message to content script to scrape data
  scrapeDataFromContentScript();
});

// Add listener for messages from content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'displayScrapedData') {
    // Display scraped data in the popup
    displayScrapedData(message.data);
  }
});
