const teamMenu = document.getElementById('team_menu');
const legHoloItems = ['anchor', 'sign', 'sign_hover', 'sign_near', 'item_hatch_bg', 'item_hatch', 'item_hatch_starter', 'bg_ship', 'tiles_subworld', 'tiles_overworld', 'bg_gradient'];

const base64ToFile = (url) => {
    const arr = url.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const data = arr[1];

    const dataStr = atob(data);
    let n = dataStr.length;
    const dataArr = new Uint8Array(n);

    while (n--) dataArr[n] = dataStr.charCodeAt(n);
    return new File([dataArr], 'File.zip', { type: mime });
};

function refreshTXT() {
    document.querySelector(`button[onclick="toggleUI('settings');"`).click();
    document.querySelector('#new-ui-left section:nth-of-type(3) button').click();
    document.querySelector('#new-ui-left p + button').click();
    document.querySelector('#new-ui-left button').click();
}

function disableLegacyHolo() {
    chrome.storage.local.get('DA_txt', (res) => {
        if (res.DA_txt) {
            document.querySelector(`button[onclick="toggleUI('settings');"`).click();
            document.querySelector('#new-ui-left section:nth-of-type(3) button').click();
            document.querySelector('#new-ui-left .btn-red').click();
            document.querySelector('.modal-container .btn-green');
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(base64ToFile(res.DA_txt));
            window.dispatchEvent(new DragEvent('drop', { dataTransfer }));
            document.querySelector('.modal-container .btn-green');
        } else {
            chrome.storage.local.get('DA_status', (resp) => {
                document.querySelector(`button[onclick="toggleUI('settings');"`).click();
                document.querySelector('#new-ui-left section:nth-of-type(3) button').click();
                if (resp.DA_status === 'legacy') {
                    legHoloItems.forEach((i) => {
                        if (document.evaluate(`//td[text()="${i}.png"]`, teamMenu, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue != null) document.evaluate(`//td[text()="${i}.png"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.parentElement.querySelector('td:nth-of-type(3) button').click();
                    });
                } else {
                    holoItems.forEach((i) => {
                        if (document.evaluate(`//td[text()="${i}.png"]`, teamMenu, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue != null) document.evaluate(`//td[text()="${i}.png"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.parentElement.querySelector('td:nth-of-type(3) button').click();
                    });
                }
                document.querySelector('#new-ui-left button').click();
                return chrome.storage.local.remove('DA_status');
            });
        }
        document.querySelector('#new-ui-left button').click();
        chrome.storage.local.remove('DA_status');
    });
}

const daBlob = document.createElement('div');
daBlob.id = 'da-blob';

function addIcon(p, f) {
    const i = document.createElement('i');
    i.classList.add('fas', 'big-icon', p);
    daBlob.append(i);
    i.onclick = f;
}

addIcon('fa-palette', () => {
    const isDredArtLoaded = document.querySelector('#da-popup') != null;
    chrome.runtime.sendMessage({ action: isDredArtLoaded ? 'togglePopup' : 'loadScript' });
});

addIcon('fa-broom', disableLegacyHolo);

addIcon('fa-redo', refreshTXT);

document.body.append(daBlob);

window.addEventListener('beforeunload', () => {
    console.log('huh');
    const count = localStorage.getItem('count');
    localStorage.setItem('count', count ? parseInt(count) + 1 : 1);
    chrome.runtime.sendMessage({ action: 'reload' });
});
