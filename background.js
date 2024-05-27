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

let inserted;
chrome.storage.local.get('inserted', (res) => { console.log(res); inserted = res.inserted || []; });

function togglePopup(tabID) {
    console.log(tabID, inserted);
    if (inserted.includes(tabID)) chrome.tabs.sendMessage(tabID, { action: 'togglePopup' });
    else {
        chrome.scripting.executeScript({
            target: { tabId: tabID },
            files: ['main.js', 'pako.js', 'patch_worker.js'],
        });
        inserted.push(tabID);
        chrome.storage.local.set({ inserted });
    }
}

chrome.action.onClicked.addListener((tab) => {
    if (tab.url) togglePopup(tab.id);
});

chrome.runtime.onMessage.addListener(async (req, sender) => {
    // const scripts = await chrome.scripting.getRegisteredContentScripts();
    // console.log(scripts);
    if (req.action === 'togglePopup') togglePopup(sender.tab.id);
    if (req.action === 'reload') {
        if (inserted.includes(sender.tab.id)) {
            console.log('removing tad id', sender.tab.id);
            inserted.splice(inserted.indexOf(sender.tab.id), 1);
            chrome.storage.local.set({ inserted });
        }
    }
});
