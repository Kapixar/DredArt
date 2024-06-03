// chrome.runtime.onInstalled.addListener((details) => { if (details.reason === 'install') chrome.tabs.create({ url: chrome.runtime.getURL('help.html') }); });

// chrome.sidePanel
//     .setPanelBehavior({ openPanelOnActionClick: true })
//     .catch((error) => console.error(error));

// chrome.tabs.onActivated.addListener(async () => {
//     console.log('chnage');
//     chrome.tabs.query({ active: true, currentWindow: true }, async (tab) => {
//         let tabId = tab[0].id
//         if (tab[0].url) {
//             console.log('show');
//             await chrome.sidePanel.setOptions({
//                 tabId,
//                 path: 'main.html',
//                 enabled: true,
//             });
//         } else {
//             console.log('hide');
//             await chrome.sidePanel.setOptions({
//                 tabId,
//                 enabled: false
//             });
//         }
//     })
// });

function loadScript(tabID) {
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
