const teamMenu = document.getElementById('team_menu');
const gameTopBar = document.querySelector('#top-bar div');
const legHoloItems = ['anchor', 'sign', 'sign_hover', 'sign_near', 'item_hatch_bg', 'item_hatch', 'item_hatch_starter', 'bg_ship', 'tiles_subworld', 'tiles_overworld', 'bg_gradient'];
//     0: 'bg_ship'
const holojkItems = {
    50: 'scrap',
    52: 'ball_vg',
    54: 'ball_bg',
    119: 'hand_cannon',
    161: 'void_orb',
    254: 'annihilator_tile',
    323: 'gremlin_red',
    324: 'gremlin_orange',
    325: 'gremlin_yellow',
};

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

function addIcon(p, t, f) {
    const a = document.createElement('a');
    const i = document.createElement('i');
    i.classList.add('fas', 'big-icon', p);
    const d = document.createElement('div');
    d.classList.add('tooltip', 'tooltip-low', 'dark');
    d.textContent = t;
    a.append(i, d);
    gameTopBar.append(a);
    a.onclick = f;
}

addIcon('fa-palette', 'DredArt', () => { chrome.runtime.sendMessage({ action: 'togglePopup' }); });

addIcon('fa-times-circle', 'Disable Holo', disableLegacyHolo);

addIcon('fa-redo', 'Refresh', refreshTXT);

const daBlob = document.createElement('img');
daBlob.src = chrome.runtime.getURL('img/palette-mini.png');
daBlob.id = 'da-blob';

daBlob.onclick = () => {
    chrome.runtime.sendMessage({ action: 'togglePopup' });
};
document.body.append(daBlob);
chrome.runtime.sendMessage({ action: 'reload' });
