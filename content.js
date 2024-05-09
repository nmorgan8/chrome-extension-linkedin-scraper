// Function to scrape data from the LinkedIn profile
function scrapeLinkedInProfile() {
  
  let data = {};

  // Extract name
  data.Name = document.querySelector('.text-heading-xlarge.inline.t-24.v-align-middle.break-words').textContent

  // Extract Position Title and Job
  data.Position = document.querySelector('.text-body-medium.break-words').textContent

  // Extract education

  edu = document.querySelectorAll('.optional-action-target-wrapper.display-flex.flex-column.full-width')

  data.Education = []
  const eduChecks = ['university', 'college']
  for (let i = 0; i < edu.length; i++) {
    const text = edu[i].innerText;
    const lines = text.split('\n');

    const uniqueLines = lines.filter((line, index) => {
      return lines.indexOf(line) === index;
    });
  
    // Trim each line and remove empty lines
    const trimmedLines = uniqueLines.map(line => line.trim()).filter(line => line !== '');
    console.log(trimmedLines)

    if (eduChecks.some(ed => trimmedLines[0].toLowerCase().includes(ed)) && !trimmedLines[1].toLowerCase().includes('followers')) {
      console.log('added')
      data.Education.push(trimmedLines)
    }
  }
  console.log(data.Education)
  return data;
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'scrapeData') {
    // Scrape data from LinkedIn profile
    const scrapedData = scrapeLinkedInProfile();

    // Send scraped data to popup
    chrome.runtime.sendMessage({
      action: 'displayScrapedData',
      data: scrapedData
    });
  }
});


