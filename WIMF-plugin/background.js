// Create context menu on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "search-fossil",
    title: "Search in Where is my fossil?",
    contexts: ["selection"]
  });
  
  // Set default options if not already set
  chrome.storage.sync.get(['windowWidth', 'windowHeight'], function(result) {
    if (!result.windowWidth || !result.windowHeight) {
      chrome.storage.sync.set({
        windowWidth: 800,
        windowHeight: 600
      });
    }
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "search-fossil" && info.selectionText) {
    // Create the URL with the search parameter
    const searchUrl = `https://migueldlm.github.io/Where-is-my-fossil/?taxon=${encodeURIComponent(info.selectionText)}`;
    
    // Get window size from options
    chrome.storage.sync.get({
      windowWidth: 800,
      windowHeight: 600
    }, function(items) {
      // Open a popup window with user-defined dimensions
      chrome.windows.create({
        url: searchUrl,
        type: 'popup',
        width: parseInt(items.windowWidth),
        height: parseInt(items.windowHeight)
      });
    });
  }
});

// Handle browser action click
chrome.action.onClicked.addListener((tab) => {
  chrome.windows.create({
    url: 'https://migueldlm.github.io/Where-is-my-fossil/',
    type: 'popup',
    width: 800,
    height: 600
  });
});