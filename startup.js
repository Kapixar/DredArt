const holoItems = [
    [
        // bp items
        [323, 'gremlin_red.png'],
        [324, 'gremlin_orange.png'],
        [325, 'gremlin_yellow.png'],
        [52, 'ball_vg.png'],
        [54, 'ball_bg.png'],
        [119, 'hand_cannon.png'],
        [161, 'void_orb.png'],
        [254, 'annihilator_tile.png'],
        [300, 'wrench_bronze_et.png'],
        [301, 'wrench_silver_et.png'],
        [302, 'wrench_gold_et.png'],
        [303, 'wrench_flux_et.png'],
        [304, 'wrench_platinum_et.png'],
        [311, 'wrench_platinum.png'],
        [312, 'wrench_flux.png'],
        [313, 'cap.png'],
        [314, 'glasses.png'],
        [315, 'shades.png'],
        [316, 'top_hat.png'],
        [317, 'horns.png'],
        [318, 'mask_alien.png'],
        [319, 'mask_clown.png'],
        [320, 'mask_goblin.png'],
        [322, 'witch_hat.png'],
        [49, 'comp_exp.png'],
        [50, 'comp_iron.png'],
    ],
    [
        // legacy items
        [0, 'sign.png'],
        [1, 'sign_hover.png'],
        [2, 'sign_near.png'],
        [3, 'item_hatch_bg.png'],
    ],
];

const paintTexturesNames = [
    'bg_ship.png',
    'tiles_subworld.png',
];

function refreshTXT() {
    document.querySelector(`button[onclick="toggleUI('settings');"`).click();
    [...document.querySelectorAll('#new-ui-left button')].find((e) => e.textContent === 'Modify Assets').click();
    [...document.querySelectorAll('#new-ui-left button')].find((e) => e.textContent === 'Refresh ↻').click();
    document.querySelector('#new-ui-left button').click();
}

function disableHolo() {
    chrome.storage.local.get('DA_txt', (res) => {
        if (res.DA_txt) {
            openDB().then(() => {
                retrieveTXTPack(res.DA_txt).then((file) => {
                    document.querySelector(`button[onclick="toggleUI('settings');"`).click();
                    [...document.querySelectorAll('#new-ui-left button')].find((e) => e.textContent === 'Modify Assets').click();
                    [...document.querySelectorAll('#new-ui-left button')].find((e) => e.textContent === 'Clear X').click();
                    document.querySelector('.modal-container .window .btn-green').click();
                    document.querySelector('#new-ui-left button').click();
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    const dataDragEvent = new DragEvent('drop', { dataTransfer });
                    window.dispatchEvent(dataDragEvent);
                    document.evaluate('//button[text()="Okay"]', document.querySelector('.modal-container'), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
                });
            });
        } else {
            clearHolo();
        }
        localStorage.removeItem('dredArtApplied');
        const dredArtActiveButton = document.querySelector('.colorLabel.selected');
        if (dredArtActiveButton) dredArtActiveButton.classList.remove('selected');
    });

    let db;
    function openDB() {
        return new Promise((resolve, reject) => {
            if (!('indexedDB' in window)) {
                alert('This browser doesn\'t support IndexedDB. Saving Texture pack is not available.');
                reject(new Error('Error opening IndexedDB - no support'));
            }
            const request = window.indexedDB.open('holoTXT', 1);
            request.onerror = () => {
                alert('IndexedDB is off?! Saving Texture pack is not available.');
                reject(new Error('Error opening IndexedDB  - database off'));
            };
            request.onsuccess = (event) => {
                db = event.target.result;
                resolve(db);
            };
        });
    }

    function retrieveTXTPack(fileName) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['holoTXT'], 'readonly');
            const store = transaction.objectStore('holoTXT');
            const request = store.get(fileName);

            request.onerror = () => {
                reject(new Error('Error retrieving file from IndexedDB'));
            };

            request.onsuccess = (event) => {
                if (event.target.result) resolve(event.target.result.file);
                else resolve(false);
            };
        });
    }
}

function clearHolo() {
    document.querySelector(`button[onclick="toggleUI('settings');"`).click();
    [...document.querySelectorAll('#new-ui-left button')].find((e) => e.textContent === 'Modify Assets').click();
    const tableCells = [...document.querySelectorAll('#new-ui-left .file-pane table td')];
    for (const tableCell of tableCells) {
        const fileName = tableCell.textContent;
        if (holoItems.flat().map((e) => e[1]).includes(fileName) || paintTexturesNames.includes(fileName)) {
            tableCell.parentElement.querySelector('td:nth-of-type(3) button').click();
        }
    }
    document.querySelector('#new-ui-left button').click();
}

const daBlob = document.createElement('div');
daBlob.id = 'da-blob';
document.body.append(daBlob);

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

addIcon('fa-broom', disableHolo);

addIcon('fa-redo', refreshTXT);
