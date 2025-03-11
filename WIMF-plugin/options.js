// Save options to Chrome storage
function saveOptions() {
  const windowWidth = document.getElementById('windowWidth').value;
  const windowHeight = document.getElementById('windowHeight').value;
  
  chrome.storage.sync.set({
    windowWidth: windowWidth,
    windowHeight: windowHeight
  }, function() {
    // Update status to let user know options were saved
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    status.className = 'status success';
    status.style.display = 'block';
    setTimeout(function() {
      status.style.display = 'none';
    }, 1500);
  });
}

// Restore options from Chrome storage
function restoreOptions() {
  chrome.storage.sync.get({
    windowWidth: 800,
    windowHeight: 600
  }, function(items) {
    document.getElementById('windowWidth').value = items.windowWidth;
    document.getElementById('windowHeight').value = items.windowHeight;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);