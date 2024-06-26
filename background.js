function loadScript(tabID) {
    chrome.scripting.insertCSS({
        target: { tabId: tabID },
        files: ['style.css'],
    });
    chrome.scripting.executeScript({
        target: { tabId: tabID },
        files: ['main.js', 'pako.js', 'patch_worker.js'],
    });
}

function togglePopup(tabID) {
    chrome.tabs.sendMessage(tabID, { action: 'togglePopup' });
}

chrome.action.onClicked.addListener((tab) => {
    if (tab.url) togglePopup(tab.id);
});

chrome.runtime.onMessage.addListener(async (req, sender) => {
    if (req.action === 'togglePopup') togglePopup(sender.tab.id);
    if (req.action === 'loadScript') loadScript(sender.tab.id);
});

chrome.runtime.onInstalled.addListener((object) => {
    if (object.reason === 'install') chrome.tabs.create({ url: 'https://drednot.io/' });
});
