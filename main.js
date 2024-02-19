/* eslint-disable no-bitwise */
// let tabID = null;

// document.querySelector('button').onclick = () => {
//     // chrome.runtime.sendMessage({ message: 'hello' }, (res) => {
//     //     document.querySelector('p').textContent = res.status
//     // })
//     // console.log(tabID);
//     // if(tabID) chrome.tabs.sendMessage(tabID, {message: "your message"})
//     sendData('hello my guy');
// };

// chrome.tabs.onActivated.addListener(async () => {
//     chrome.tabs.query({ active: true, currentWindow: true }, async (tab) => {
//         tabID = tab[0].id;
//         console.log(tabID);
//         if (tab[0].url) {
//             console.log('show');
//             await chrome.sidePanel.setOptions({
//                 tabID,
//                 path: 'main.html',
//                 enabled: true,
//             });
//         } else {
//             console.log('hide');
//             await chrome.sidePanel.setOptions({
//                 tabID,
//                 enabled: false
//             });
//         }
//     })
// });

// function sendData(mess) {
//     chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
//         chrome.tabs.sendMessage(tabs[0].id, {message: mess})
//     });
// }

// setup for base2048
const BITS_PER_CHAR = 11;
const BITS_PER_BYTE = 8;
const pairStrings = [
    '89AZazÆÆÐÐØØÞßææððøøþþĐđĦħııĸĸŁłŊŋŒœŦŧƀƟƢƮƱǃǝǝǤǥǶǷȜȝȠȥȴʯͰͳͶͷͻͽͿͿΑΡΣΩαωϏϏϗϯϳϳϷϸϺϿЂЂЄІЈЋЏИКикяђђєіјћџѵѸҁҊӀӃӏӔӕӘәӠӡӨөӶӷӺԯԱՖաֆאתװײؠءاؿفي٠٩ٮٯٱٴٹڿہہۃےەەۮۼۿۿܐܐܒܯݍޥޱޱ߀ߪࠀࠕࡀࡘࡠࡪࢠࢴࢶࢽऄनपरलळवहऽऽॐॐॠॡ०९ॲঀঅঌএঐওনপরললশহঽঽৎৎৠৡ০ৱ৴৹ৼৼਅਊਏਐਓਨਪਰਲਲਵਵਸਹੜੜ੦੯ੲੴઅઍએઑઓનપરલળવહઽઽૐૐૠૡ૦૯ૹૹଅଌଏଐଓନପରଲଳଵହଽଽୟୡ୦୯ୱ୷ஃஃஅஊஎஐஒஓககஙசஜஜஞடணதநபமஹௐௐ௦௲అఌఎఐఒనపహఽఽౘౚౠౡ౦౯౸౾ಀಀಅಌಎಐಒನಪಳವಹಽಽೞೞೠೡ೦೯ೱೲഅഌഎഐഒഺഽഽൎൎൔൖ൘ൡ൦൸ൺൿඅඖකනඳරලලවෆ෦෯กะาาเๅ๐๙ກຂຄຄງຈຊຊຍຍດທນຟມຣລລວວສຫອະາາຽຽເໄ໐໙ໞໟༀༀ༠༳ཀགངཇཉཌཎདནབམཛཝཨཪཬྈྌကဥဧဪဿ၉ၐၕ',
    '07',
];

const lookupE = {};
const lookupD = {};
pairStrings.forEach((pairString, r) => {
    const encodeRepertoire = [];
    pairString.match(/../gu).forEach((pair) => {
        const first = pair.codePointAt(0);
        const last = pair.codePointAt(1);
        for (let codePoint = first; codePoint <= last; codePoint++) {
            encodeRepertoire.push(String.fromCodePoint(codePoint));
        }
    });

    const numZBits = BITS_PER_CHAR - BITS_PER_BYTE * r; // 0 -> 11, 1 -> 3
    lookupE[numZBits] = encodeRepertoire;
    encodeRepertoire.forEach((chr, z) => {
        lookupD[chr] = [numZBits, z];
    });
});

// encode canvas to string with base2048
const encodePix = (uint8Array) => {
    const { length } = uint8Array;

    let str = '';
    let z = 0;
    let numZBits = 0;

    for (let i = 0; i < length; i++) {
        const uint8 = uint8Array[i];
        for (let j = BITS_PER_BYTE - 1; j >= 0; j--) {
            const bit = (uint8 >> j) & 1;

            z = (z << 1) + bit;
            numZBits++;

            if (numZBits === BITS_PER_CHAR) {
                str += lookupE[numZBits][z];
                z = 0;
                numZBits = 0;
            }
        }
    }
    if (numZBits !== 0) {
        while (!(numZBits in lookupE)) {
            z = (z << 1) + 1;
            numZBits++;
        }

        str += lookupE[numZBits][z];
    }
    return str;
};

// decode string to canvas with base2048
const decodePix = (str) => {
    const { length } = str;

    // This length is a guess. There's a chance we allocate one more byte here
    // than we actually need. But we can count and slice it off later
    const uint8Array = new Uint8Array(Math.floor((length * BITS_PER_CHAR) / BITS_PER_BYTE));
    let numUint8s = 0;
    let uint8 = 0;
    let numUint8Bits = 0;

    for (let i = 0; i < length; i++) {
        const chr = str.charAt(i);

        if (!(chr in lookupD)) {
            throw new Error(`Unrecognised Base2048 character: ${chr}`);
        }

        const [numZBits, z] = lookupD[chr];

        if (numZBits !== BITS_PER_CHAR && i !== length - 1) {
            throw new Error(`Secondary character found before end of input at position ${String(i)}`);
        }

        // Take most significant bit first
        for (let j = numZBits - 1; j >= 0; j--) {
            const bit = (z >> j) & 1;

            uint8 = (uint8 << 1) + bit;
            numUint8Bits++;

            if (numUint8Bits === BITS_PER_BYTE) {
                uint8Array[numUint8s] = uint8;
                numUint8s++;
                uint8 = 0;
                numUint8Bits = 0;
            }
        }
    }

    if (uint8 !== ((1 << numUint8Bits) - 1)) {
        throw new Error('Padding mismatch');
    }

    return new Uint8Array(uint8Array.buffer, 0, numUint8s);
};

const toggleSettingsUIBtn = document.querySelector(`button[onclick="toggleUI('settings');"`);
const rgb = [[222, 165, 164], [214, 145, 136], [173, 111, 105], [128, 64, 64], [77, 0, 0], [77, 25, 0], [128, 0, 0], [144, 30, 30], [186, 1, 1], [179, 54, 54], [179, 95, 54], [255, 0, 0], [216, 124, 99], [255, 64, 64], [255, 128, 128], [255, 195, 192], [195, 153, 83], [128, 85, 64], [128, 106, 64], [77, 51, 38], [77, 51, 0], [128, 42, 0], [155, 71, 3], [153, 101, 21], [213, 70, 0], [218, 99, 4], [255, 85, 0], [237, 145, 33], [255, 179, 31], [255, 128, 64], [255, 170, 128], [255, 212, 128], [181, 179, 92], [77, 64, 38], [77, 77, 0], [128, 85, 0], [179, 128, 7], [183, 162, 20], [179, 137, 54], [238, 230, 0], [255, 170, 0], [255, 204, 0], [255, 255, 0], [255, 191, 64], [255, 255, 64], [223, 190, 111], [255, 255, 128], [234, 218, 184], [199, 205, 144], [128, 128, 64], [77, 77, 38], [64, 77, 38], [128, 128, 0], [101, 114, 32], [141, 182, 0], [165, 203, 12], [179, 179, 54], [191, 201, 33], [206, 255, 0], [170, 255, 0], [191, 255, 64], [213, 255, 128], [248, 249, 156], [253, 254, 184], [135, 169, 107], [106, 128, 64], [85, 128, 64], [51, 77, 38], [51, 77, 0], [67, 106, 13], [85, 128, 0], [42, 128, 0], [103, 167, 18], [132, 222, 2], [137, 179, 54], [95, 179, 54], [85, 255, 0], [128, 255, 64], [170, 255, 128], [210, 248, 176], [143, 188, 143], [103, 146, 103], [64, 128, 64], [38, 77, 38], [25, 77, 0], [0, 77, 0], [0, 128, 0], [34, 139, 34], [3, 192, 60], [70, 203, 24], [54, 179, 54], [54, 179, 95], [0, 255, 0], [64, 255, 64], [119, 221, 119], [128, 255, 128], [64, 128, 85], [64, 128, 106], [38, 77, 51], [0, 77, 26], [0, 77, 51], [0, 128, 43], [23, 114, 69], [0, 171, 102], [28, 172, 120], [11, 218, 81], [0, 255, 85], [80, 200, 120], [64, 255, 128], [128, 255, 170], [128, 255, 212], [168, 227, 189], [110, 174, 161], [64, 128, 128], [38, 77, 64], [38, 77, 77], [0, 77, 77], [0, 128, 85], [0, 166, 147], [0, 204, 153], [0, 204, 204], [54, 179, 137], [54, 179, 179], [0, 255, 170], [0, 255, 255], [64, 255, 191], [64, 255, 255], [128, 255, 255], [133, 196, 204], [93, 138, 168], [64, 106, 128], [38, 64, 77], [0, 51, 77], [0, 128, 128], [0, 85, 128], [0, 114, 187], [8, 146, 208], [54, 137, 179], [33, 171, 205], [0, 170, 255], [100, 204, 219], [64, 191, 255], [128, 212, 255], [175, 238, 238], [64, 85, 128], [38, 51, 77], [0, 26, 77], [0, 43, 128], [0, 47, 167], [54, 95, 179], [40, 106, 205], [0, 127, 255], [0, 85, 255], [49, 140, 231], [73, 151, 208], [64, 128, 255], [113, 166, 210], [100, 149, 237], [128, 170, 255], [182, 209, 234], [146, 161, 207], [64, 64, 128], [38, 38, 77], [0, 0, 77], [25, 0, 77], [0, 0, 128], [42, 0, 128], [0, 0, 205], [54, 54, 179], [95, 54, 179], [0, 0, 255], [28, 28, 240], [106, 90, 205], [64, 64, 255], [133, 129, 217], [128, 128, 255], [177, 156, 217], [150, 123, 182], [120, 81, 169], [85, 64, 128], [106, 64, 128], [51, 38, 77], [51, 0, 77], [85, 0, 128], [137, 54, 179], [85, 0, 255], [138, 43, 226], [167, 107, 207], [127, 64, 255], [191, 64, 255], [148, 87, 235], [170, 128, 255], [153, 85, 187], [140, 100, 149], [128, 64, 128], [64, 38, 77], [77, 38, 77], [77, 0, 77], [128, 0, 128], [159, 0, 197], [179, 54, 179], [184, 12, 227], [170, 0, 255], [255, 0, 255], [255, 64, 255], [213, 128, 255], [255, 128, 255], [241, 167, 254], [128, 64, 106], [105, 45, 84], [77, 38, 64], [77, 0, 51], [128, 0, 85], [162, 0, 109], [179, 54, 137], [202, 31, 123], [255, 0, 170], [255, 29, 206], [233, 54, 167], [207, 107, 169], [255, 64, 191], [218, 112, 214], [255, 128, 213], [230, 168, 215], [145, 95, 109], [128, 64, 85], [77, 38, 51], [77, 0, 25], [128, 0, 42], [215, 0, 64], [179, 54, 95], [255, 0, 127], [255, 0, 85], [255, 0, 40], [222, 49, 99], [208, 65, 126], [215, 59, 62], [255, 64, 127], [249, 90, 97], [255, 128, 170], [17, 17, 17], [34, 34, 34], [51, 51, 51], [68, 68, 68], [85, 85, 85], [102, 102, 102], [119, 119, 119], [136, 136, 136], [153, 153, 153], [170, 170, 170], [187, 187, 187], [204, 204, 204], [221, 221, 221], [238, 238, 238], [255, 255, 255]];
const canvasSettings = { colorSpace: 'srgb' };

const holoItems = [
    [50, 'scrap'],
    [52, 'ball_vg'],
    [54, 'ball_bg'],
    [119, 'hand_cannon'],
    [161, 'void_orb'],
    [254, 'annihilator_tile'],
    [300, 'wrench_bronze_et'],
    [301, 'wrench_silver_et'],
    [302, 'wrench_gold_et'],
    [303, 'wrench_flux_et'],
    [304, 'wrench_platinum_et'],
    [311, 'wrench_platinum'],
    [312, 'wrench_flux'],
    [313, 'cap'],
    [314, 'glasses'],
    [315, 'shades'],
    [316, 'top_hat'],
    [317, 'horns'],
    [318, 'mask_alien'],
    [319, 'mask_clown'],
    [320, 'mask_goblin'],
    [322, 'witch_hat'],
    [323, 'gremlin_red'],
    [324, 'gremlin_orange'],
    [325, 'gremlin_yellow'],
];

const tool = document.createElement('div');
tool.id = 'da-popup';
tool.classList.add('hidden');
setTimeout(() => tool.classList.remove('hidden'), 1);
document.body.append(tool);
const messageContainer = document.createElement('div');
messageContainer.id = 'da-messageContainer';
// Top bar
const topBar = document.createElement('div');
topBar.id = 'da-top-bar';
topBar.onclick = () => {
    console.log(tool.classList.contains('drag'));
    if (!tool.classList.contains('drag')) mainMenu.classList.toggle('active');
    tool.classList.remove('drag');
};
const menuHam = document.createElement('img');
menuHam.src = chrome.runtime.getURL('img/icons8-menu.svg');

const closeBtn = document.createElement('img');
closeBtn.src = chrome.runtime.getURL('img/icons8-x-50.png');
closeBtn.onclick = () => {
    chrome.runtime.sendMessage({ action: 'togglePopup' });
};
// const settingBtn = document.createElement('img');
// settingBtn.src = chrome.runtime.getURL('img/icons8-settings.svg');
// settingBtn.onclick = () => {
//     console.log('settings');
// };
// const helpBtn = document.createElement('img');
// helpBtn.src = chrome.runtime.getURL('img/icons8-help.png');
// helpBtn.onclick = () => {
//     console.log('help');
// };
const buttonsSpan = document.createElement('span');
buttonsSpan.append(closeBtn);
const title = document.createElement('span');
title.textContent = 'DredArt';
topBar.append(menuHam, title, buttonsSpan);

dragElement(tool, topBar);

// The tool menu and content
const mainContent = document.createElement('div');
mainContent.id = 'da-content';

const mainMenu = document.createElement('div');
mainMenu.id = 'da-menu';
mainMenu.classList.add('active');

const useButton = document.createElement('span');
useButton.textContent = 'Paint';
useButton.setAttribute('data-desc', 'Insert PixelMap and use Holo to paint it in a blitz!');
useButton.onclick = () => { generateInsertion(); };

const createButton = document.createElement('span');
createButton.textContent = 'Design';
createButton.setAttribute('data-desc', 'Generate fine pixel art from ordinary images!');
createButton.onclick = () => { window.open(chrome.runtime.getURL('../public/index.html')); };

const helpButtonGroup = document.createElement('div');
helpButtonGroup.classList.add('btn-group');

const settingsButton = document.createElement('span');
settingsButton.textContent = 'Settings';
settingsButton.setAttribute('data-desc', 'Generate fine pixel art from ordinary images!');
settingsButton.onclick = () => { }; // todo

const guideButton = document.createElement('span');
guideButton.textContent = 'Guide';
guideButton.setAttribute('data-desc', 'Generate fine pixel art from ordinary images!');
guideButton.onclick = () => { }; // todo

helpButtonGroup.append(settingsButton, guideButton);

mainMenu.append(useButton, createButton, helpButtonGroup);

// Settings tab
const settings = document.createElement('div');
settings.id = 'da-settings';

// dialog - setup
const dialogBox = document.createElement('div');
dialogBox.id = 'da-dialog';
const dialogClose = document.createElement('span');
dialogClose.textContent = 'x';
dialogClose.onclick = () => dialogBox.classList.remove('active');
const dialogContent = document.createElement('span');
dialogBox.append(dialogClose, dialogContent);

// inserting image
const insertBox = document.createElement('div');
insertBox.id = 'da-insert';

// main box with holo UI
const mainBox = document.createElement('div');
mainBox.id = 'da-ui';

mainContent.append(mainMenu, dialogBox, settings, insertBox, mainBox);
tool.append(topBar, mainContent, messageContainer);

chrome.runtime.onMessage.addListener((req) => {
    if (req.action === 'togglePopup') tool.classList.toggle('hidden');
});

// Dragging popup handler
function dragElement(element, dragzone) {
    let startX = 0; // -> mouse position.
    let startY = 0;

    let offsetX = 0; // -> Element position
    let offsetY = 0;

    let minBoundX = 0; // -> top Drag Position ( min )
    let minBoundY = 0;

    let maxBoundX = 0; // -> Bottom Drag Position ( max )
    let maxBoundY = 0;

    const dragMouseUp = () => {
        document.onmouseup = null;
        document.onmousemove = null;
    };

    const dragMouseMove = (event) => {
        event.preventDefault();
        element.classList.add('drag');
        element.style.top = `${Math.max(minBoundY, Math.min(offsetY + event.clientY - startY, maxBoundY))}px`;
        element.style.left = `${Math.max(minBoundX, Math.min(offsetX + event.clientX - startX, maxBoundX))}px`;
    };

    const dragMouseDown = (event) => {
        event.preventDefault();

        startX = event.clientX;
        startY = event.clientY;

        // current Element position
        offsetX = element.offsetLeft; // -> convert to INT
        offsetY = element.offsetTop;

        // Border ( Div Container )
        minBoundX = element.parentNode.offsetLeft; // minimal -> Top Position.
        minBoundY = 30;

        maxBoundX = minBoundX + element.parentNode.offsetWidth - element.offsetWidth; // Maximal.
        maxBoundY = minBoundY + element.parentNode.offsetHeight - element.offsetHeight - 30;

        document.onmouseup = dragMouseUp;
        document.onmousemove = dragMouseMove;
    };

    dragzone.onmousedown = dragMouseDown;
}

function generateInsertion() {
    while (insertBox.childNodes.length) insertBox.childNodes[0].remove();
    insertBox.classList.add('active');
    mainMenu.classList.remove('active');

    const insertHeader = document.createElement('h3');
    insertHeader.textContent = 'Insert PixelMap';

    // close button
    const closeButton = document.createElement('span');
    closeButton.textContent = 'x';
    closeButton.onclick = () => {
        insertBox.classList.remove('active');
    };

    // File input handler
    const fileLabel = document.createElement('label');
    fileLabel.setAttribute('for', 'da-image-upload');
    fileLabel.textContent = 'Choose from system';
    const fileUpload = document.createElement('input');
    fileUpload.id = 'da-image-upload';
    fileUpload.onchange = function () {
        if (this.files[0] == null) return info('Error. Choose file again.', false);
        validateImage(this.files[0]);
        this.value = null;
    };
    fileUpload.type = 'file';

    // Tips
    const dropTip = document.createElement('span');
    dropTip.textContent = 'Drag & Drop';
    const pasteTip = document.createElement('span');
    pasteTip.textContent = 'Paste image or URL';
    fileLabel.append(dropTip, pasteTip);

    // Drop Handler
    fileLabel.ondragleave = (e) => {
        e.preventDefault();
        fileLabel.classList.remove('highlight');
    };
    fileLabel.ondragover = (e) => {
        e.preventDefault();
        fileLabel.classList.add('highlight');
    };
    fileLabel.ondrop = function (e) {
        e.preventDefault();
        fileLabel.classList.remove('highlight');
        const imageUrl = e.dataTransfer.getData('URL');
        if (imageUrl.includes('?width')) return validateImage(false, imageUrl.slice(0, imageUrl.lastIndexOf('?')));

        if (e.dataTransfer.files) {
            if (e.dataTransfer.files.length === 1 && e.dataTransfer.files[0].type.includes('image')) return validateImage(e.dataTransfer.files[0]);
            if (imageUrl) validateImage(false, imageUrl);
        }
    };

    // Paste handler
    document.onpaste = (e) => {
        if (!insertBox.classList.contains('active') || mainMenu.classList.contains('active')) return;
        e.preventDefault();
        const { items } = e.clipboardData;
        // if (items.length > 1) return info('You can only paste one file', false);
        const file = items[0].getAsFile();
        if (file) return validateImage(file);
        const textURL = e.clipboardData.getData('Text');
        if (textURL) return validateImage(false, textURL);
        info('Image not found in pasted content', false);

        validateImage(file);
    };

    // last used
    const lastGallery = document.createElement('div');
    chrome.storage.local.get('lastUsed').then((result) => {
        if (!result.lastUsed) {
            lastGallery.textContent = 'Nothing. Let\'s create history!';
            return;
        }
        for (const last of result.lastUsed) {
            const thumbnailLast = strToCan(last);
            lastGallery.append(thumbnailLast);
            thumbnailLast.onclick = () => {
                generateTool(thumbnailLast);
            };
        }
    });

    // load from the chat
    const chatLoad = document.createElement('button');
    chatLoad.textContent = 'Load from chat';
    chatLoad.onclick = () => {
        if (document.getElementById('exit_button').style.display === 'none') return info('You need to join a ship to do that.', false);
        const messages = document.querySelectorAll('#chat-content p');
        let sender = null;
        let str = '';
        for (const mess of messages) {
            if (sender) {
                if (!mess.textContent.includes(sender)) continue;
                str += mess.textContent.slice(mess.textContent.indexOf(':') + 2);
                continue;
            } else if (mess.textContent.includes('DA$')) {
                sender = mess.querySelector('bdi').textContent;
                str += mess.textContent.slice(mess.textContent.indexOf(':') + 5);
            }
        }
        if (str === '') return info('No image data found in chat.', false);
        const canChat = strToCan(str.slice(0, -3));
        if (canChat) generateTool(canChat);
    };

    insertBox.append(closeButton, insertHeader, fileUpload, fileLabel, chatLoad, lastGallery);
}

// validate image from various sources
function validateImage(file = false, url = false) {
    if (file.length === null && !url) return info('Probably file is empty.', false);

    if (file.type !== 'image/png' && !url) return info('File is not a PNG.', false);

    const img = new Image();
    const imgUrl = url ? (url.startsWith('data') ? url : `https://corsing.kapixar.repl.co/${url.slice(url.indexOf('://') + 2)}`) : URL.createObjectURL(file);
    img.src = imgUrl;
    console.log(imgUrl);
    img.onerror = function (e) {
        console.log(e);
        return info('There was an issue resolving this URL. (If you dragged from Discord, CORS Proxy may be down - try different upload option).', false);
    };
    img.onload = async function () {
        console.log(img.src);
        URL.revokeObjectURL(imgUrl);
        if (this.width > 1600 || this.height > 1625) {
            return info('Too large image!', false);
        }
        if (this.width < 20 || this.height < 45) {
            return info('Too small image!', false);
        }
        const source = document.createElement('canvas');
        source.width = this.width / 20;
        source.height = (this.height - 25) / 20;
        const sourceCtx = source.getContext('2d', canvasSettings);
        sourceCtx.fillRect(0, 0, source.width, source.height);
        const sourceData = sourceCtx.getImageData(0, 0, source.width, source.height);
        const sData = sourceData.data;

        const scanner = document.createElement('canvas');
        scanner.width = this.width;
        scanner.height = this.height - 25;
        const scanCtx = scanner.getContext('2d', canvasSettings);
        scanCtx.drawImage(this, 0, 0);
        const sD = scanCtx.getImageData(0, 0, scanner.width, scanner.height).data;
        for (let y = 0; y < scanner.height; y += 20) {
            for (let x = 0; x < scanner.width; x += 20) {
                const i = pxIndex(x, y, scanner.width);
                if (findIndex([sD[i], sD[i + 1], sD[i + 2]]) === 256) return info('Image contains colors that don\'t exist in Dredark color pallete. Use Designer for pixel arts.', false);
                if (sD[i + 3] !== 255) return info('Image contains transparency. No transparency is allowed. Use Designer for pixel arts.', false);
                const j = pxIndex(x / 20, y / 20, source.width);
                sData[j] = sD[i];
                sData[j + 1] = sD[i + 1];
                sData[j + 2] = sD[i + 2];
            }
        }
        sourceCtx.putImageData(sourceData, 0, 0);

        if (source.width < 6 || source.height < 6) return info('DredArt Painter supports only Pixel Maps larger than 5 pixels.', false);

        generateTool(source);

        // displaying info
        // info();
        // const desc = document.createElement('p');
        // desc.classList.add('desc');
        // desc.textContent = `${file.name.length > 15 ? `${file.name.substring(0, 14)}...` : file.name}, ${source.width} width x ${source.height} height`;

        // const thumbnail = document.createElement('img');
        // const thurl = source.toDataURL();
        // thumbnail.src = thurl;
        // thumbnail.onload = function () { URL.revokeObjectURL(thurl); };
        // thumbnail.setAttribute('class', 'pixelart');

        // const settingD = document.createElement('div');
        // settingD.innerHTML = '<p>Coordinates for bottom-left corner of painting<br><input type=\'text\' placeholder=\'1\' id=\'cornerX\'> x <input type=\'text\' placeholder=\'1\' id=\'cornerY\'></p>';

        // const rPix = document.createElement('button');
        // rPix.textContent = 'Generate!';
        // rPix.onclick = function () { renderPixelart(source, corner1.value, corner2.value); };

        // message.append(desc, thumbnail, settingD, rPix);
        // const corner1 = document.getElementById('cornerX');
        // const corner2 = document.getElementById('cornerY');
        // setInputFilter(corner1, corner2);
    };
}

async function generateTool(sourceCanvas) {
    while (mainBox.childNodes.length) mainBox.lastChild.remove();
    insertBox.classList.remove('active');
    tool.classList.add('loading');
    mainBox.classList.add('active');

    // drawing input on main canvas
    const can = document.createElement('canvas');
    can.width = sourceCanvas.width;
    can.height = sourceCanvas.height;
    const ctx = can.getContext('2d', { willReadFrequently: true, colorSpace: 'srgb' });
    ctx.fillStyle = 'rgb(187,187,187)';
    ctx.drawImage(sourceCanvas, 0, 0);
    const { data } = ctx.getImageData(0, 0, can.width, can.height);

    // Saving art to string and last Used
    const canString = canToStr(can, data);
    const previous = await chrome.storage.local.get('lastUsed');
    if (!previous.lastUsed) chrome.storage.local.set({ lastUsed: [canString] });
    else {
        const spotID = previous.lastUsed.indexOf(canString);
        if (spotID !== -1) previous.lastUsed.splice(spotID, 1);
        previous.lastUsed.unshift(canString);
        if (previous.lastUsed.length > 5) previous.lastUsed = previous.lastUsed.slice(0, 5);
        chrome.storage.local.set({ lastUsed: previous.lastUsed });
    }

    // calculating size of textures for holo
    const xSizesBP = generateHoloSizes(can.width, 4); // bp holo
    const xCentersBP = generateCentres(xSizesBP);
    const ySizesBP = generateHoloSizes(can.height, 4);
    const yCentersBP = generateCentres(ySizesBP);

    const xSizesLeg = generateHoloSizes(can.width, 4); // leg holo
    const xCentersLeg = generateCentres(xSizesLeg);
    const ySizesLeg = generateHoloSizes(can.height, 4);
    const yCentersLeg = generateCentres(ySizesLeg);

    console.log(xSizesBP, xCentersBP, ySizesBP, yCentersBP);

    // BP string
    const holoBP = await encodeBlueprint(can.width, can.height, xCentersBP, yCentersBP);
    console.log(holoBP);

    // Calculating existing colors inside the worker
    const { imgColors, borderColors } = await scanCanvasWithWorker();

    // First box in Holo UI - info about art
    const stats = document.createElement('div');
    stats.id = 'da-stats';
    stats.classList.add('long');

    const thumbnail = document.createElement('img');
    const thUrl = sourceCanvas.toDataURL();
    thumbnail.src = thUrl;
    // thumbnail.onload = function () { URL.revokeObjectURL(thUrl); };
    thumbnail.setAttribute('class', 'pixelart');
    // stats.style = `background: url(${thUrl}), linear-gradient(left transparent, #727272);`;
    // stats.append(thumbnail);

    const ironCost = sourceCanvas.width * sourceCanvas.height * 2;
    const pxInfo = [
        [`Art size: ${sourceCanvas.width} x ${sourceCanvas.height}`, false],
        [`Paint cost: ${ironCost} iron`, false],
        [`Estimated real cost: ${Math.round(ironCost * 1.02) + Math.abs(sourceCanvas.width + sourceCanvas.height - 23) * 4} iron`, 'Expanding starter ship + 2% of mistakes'],
    ];

    for (const stat of pxInfo) {
        const pInfo = document.createElement('p');
        [pInfo.textContent] = stat;
        if (stat[1]) pInfo.setAttribute('data-help', stat[1]);
        stats.append(pInfo);
    }

    const sendChat = document.createElement('button');
    sendChat.textContent = 'Share by chat';
    sendChat.onclick = () => {
        if (document.getElementById('exit_button').style.display === 'none') return info('You need to join a ship to do that.', false);
        const strToSend = `DA$${canString}$+$`;
        let counter = 0;
        const chatBox = document.getElementById('chat');
        const chatInp = document.getElementById('chat-input');
        const chatBtn = document.getElementById('chat-send');
        const sendingInt = setInterval(() => {
            if (counter > strToSend.length) clearInterval(sendingInt);
            if (chatBox.classList.contains('closed')) chatBtn.click();
            chatInp.value = strToSend.slice(counter, counter + 300);
            chatBtn.click();
            counter += 300;
        }, 1500);
    };
    stats.append(sendChat);

    // slider what type of holo use
    const holoModeBox = document.createElement('label');
    holoModeBox.classList.add('long');
    holoModeBox.setAttribute('for', 'holo-type');
    const modeCheck = document.createElement('input');
    modeCheck.type = 'checkbox';
    modeCheck.id = 'holo-type';

    // holo setup button
    const setupButton = document.createElement('div');
    setupButton.id = 'da-setup-btn';
    setupButton.classList.add('long');
    // setupButton.textContent = 'Holo Setup';

    mainBox.append(stats, modeCheck, holoModeBox, setupButton);

    // Setting theme of image
    const length = ((stats.clientHeight * can.width) / can.height) / stats.clientWidth;
    const artThemeRGB = rgb[parseInt(Object.entries(borderColors).sort((a, b) => b[1] - a[1])[0][0], 16)];
    const themeString = `rgb(${artThemeRGB[0]}, ${artThemeRGB[1]}, ${artThemeRGB[2]})`;
    tool.style.setProperty('--themeColor', themeString);
    stats.style = `background-image: linear-gradient(to right, transparent 0%, var(--themeColor) ${length * 100}%), url(${thUrl});`;
    // topBar.style.backgroundColor = themeString;

    // draw Show all canvas
    const allCan = document.createElement('canvas');
    const allCtx = allCan.getContext('2d');
    allCan.width = can.width * 40;
    allCan.height = can.height * 40;
    allCtx.imageSmoothingEnabled = false;
    // allCtx.drawImage(can, 0, 0, allCtx.width, allCtx.height);
    allCtx.fillStyle = 'rgb(153,153,153)';
    allCtx.font = 'bold 24px monospace';
    allCtx.shadowColor = 'black';
    for (let y = 0; y < can.height; y++) {
        for (let x = 0; x < can.width; x++) {
            if (xCentersBP.includes(x) && yCentersBP.includes(y)) allCtx.shadowBlur = 2;
            else allCtx.shadowBlur = 0;
            const i = (x + y * can.width) * 4;
            const t = findIndex([data[i], data[i + 1], data[i + 2]]).toString(16).padStart(2, '0').toUpperCase();
            allCtx.fillStyle = `rgb(${data[i] / 1.32},${data[i + 1] / 1.32},${data[i + 2] / 1.32})`;
            allCtx.fillText(t, x * 40 + 6, y * 40 + 28);
        }
    }

    // draw error canvas
    const blendCan = document.createElement('canvas');
    const chtx = blendCan.getContext('2d', settings);
    blendCan.width = can.width;
    blendCan.height = can.height;
    chtx.drawImage(can, 0, 0);
    const checkData = chtx.getImageData(0, 0, blendCan.width, blendCan.height);
    const cData = checkData.data;
    for (let i = 0; i < cData.length; i += 4) {
        cData[i] = blend(cData[i]);
        cData[i + 1] = blend(cData[i + 1]);
        cData[i + 2] = blend(cData[i + 2]);
        cData[i + 3] = 153;
    }
    chtx.putImageData(checkData, 0, 0);

    function blend(c) { return Math.floor(255 - (c * 2) / 3); }

    // uploadTextures([[allCan, 'block.png']]);
    // divideCanvas(renderShadow([77, 25, 0]), xSizesBP, ySizesBP);
    divideCanvas(allCan, xSizesBP, ySizesBP, true);

    // sticky box
    const stickyBox = document.createElement('div');
    stickyBox.classList.add('sticky', 'long');

    // make stickyBox float
    const stickyObserver = new IntersectionObserver(
        (e) => {
            console.log(e.intersectionRatio);
            e.target.classList.toggle('pinned', e.intersectionRatio < 1);
            topBar.classList.toggle('pinned', e.intersectionRatio < 1);
            e.target.style.setProperty('--stickTheme', e.intersectionRatio < 1 ? themeString : '');
        },
        // { threshold: [1] },
    );
    stickyObserver.observe(stickyBox);

    // quick help bubble in sticky div
    // const helpBubble = document.createElement('div');
    // helpBubble.classList.add('toolHelp', 'rolled');
    // helpBubble.onclick = function () { this.classList.toggle('rolled'); };
    // const allHelp = document.createElement('p');
    // const checkHelp = document.createElement('p');
    // const coordHelp = document.createElement('p');
    // const cornerHelp = document.createElement('p');
    // const colorsHelp = document.createElement('p');
    // allHelp.textContent = 'Show all - display unplaced paint as text AKA display map as Holo';
    // checkHelp.textContent = 'Find errors - spot mistakes easier. Correct tiles turns grey';
    // coordHelp.textContent = 'Get color - returns which color is on entered coordinates';
    // cornerHelp.textContent = 'Corner Selector - select in which part of ship display Holo';
    // colorsHelp.textContent = 'Particular color box - display Holo of it. Fill transparent holes with paint. Number in corners means its amount in chosen part.';
    // helpBubble.append(allHelp, checkHelp, coordHelp, cornerHelp, colorsHelp);
    // stickyBox.appendChild(helpBubble);

    // show all button
    const allColors = document.createElement('button');
    allColors.textContent = 'Show all';
    allColors.id = 'allButton';
    allColors.setAttribute('title', 'Display every color on Holo as text');
    allColors.onclick = function () {
        // if (!this.classList.contains('selected')) refreshCurrent(allCan);
        document.querySelectorAll('.colorLabel, #checkButton').forEach((e) => {
            e.classList.remove('selected');
        });
        this.classList.add('selected');
    };

    // check button
    const check = document.createElement('button');
    check.textContent = 'Find errors';
    check.id = 'checkButton';
    check.setAttribute('title', 'Find mistakes easier. Only correct tiles turn grey.');
    check.onclick = function () {
        // if (!this.classList.contains('selected')) refreshCurrent(errorCan);
        document.querySelectorAll('.colorLabel, #allButton').forEach((e) => {
            e.classList.remove('selected');
        });
        this.classList.add('selected');
    };

    stickyBox.append(allColors, check);

    // color search
    // const searchBox = document.createElement('div');
    // searchBox.classList.add('search');
    // const searchResult = document.createElement('div');
    // const search1 = document.createElement('input');
    // search1.setAttribute('placeholder', '1');
    // search1.onkeyup = function () { searchForColor(); };
    // const serachComma = document.createElement('span');
    // serachComma.textContent = ',';
    // const search2 = document.createElement('input');
    // search2.setAttribute('placeholder', '1');
    // search2.onkeyup = function () { searchForColor(); };

    // function searchForColor() {
    //     if (search1.value.length < 1 || search2.value.length < 1) {
    //         searchBox.style.background = '';
    //         searchResult.textContent = '--';
    //         return;
    //     }
    //     let c = document.querySelector(`#tbox td[data-xy='${search1.value},${search2.value}']`);
    //     if (c == null) {
    //         searchBox.style.background = '';
    //         searchResult.textContent = '--';
    //         return;
    //     }
    //     c = c.textContent;
    //     searchResult.textContent = c;
    //     c = rgb[parseInt(c, 16)];
    //     searchBox.style.background = `rgb(${c[0]},${c[1]},${c[2]})`;
    // }
    // searchResult.textContent = 'Get color';
    // searchBox.append(search1, serachComma, search2, searchResult);
    // stickyBox.appendChild(searchBox);
    // setInputFilter(search1, search2);

    // Part selection
    const partBox = document.createElement('div');
    partBox.classList.add('partSelector');

    // fill blocks with good values
    const blocks = ['f', 'f', 'f', 'f'];
    let blocksSum = 0;
    for (let i = 0; i < 4; i += 1) {
        if (blocks[i] === '') continue;
        blocksSum += i;
        const cornerLabel = document.createElement('label');
        cornerLabel.setAttribute('for', `da-part${i}`);
        const cornerInput = document.createElement('input');
        if (i === 0) cornerInput.checked = true;
        cornerInput.onchange = () => { changePart(i); };
        cornerInput.type = 'radio';
        cornerInput.name = 'da-part';
        cornerInput.id = `da-part${i}`;
        cornerInput.value = i;
        partBox.append(cornerInput, cornerLabel);
    }
    if (blocksSum === 2) partBox.classList.add('tower');
    if (blocksSum === 0) stickyBox.classList.add('simple');
    else stickyBox.appendChild(partBox);

    mainBox.appendChild(stickyBox);

    // Sorting form
    const sortBox = document.createElement('div');
    sortBox.classList.add('long', 'sort');
    const sortLabel = document.createElement('span');
    sortLabel.textContent = 'Sort by: ';

    const sortNameInput = document.createElement('input');
    sortNameInput.type = 'radio';
    sortNameInput.value = '0';
    sortNameInput.name = 'da-sort';
    sortNameInput.id = 'da-sname';
    sortNameInput.checked = true;
    sortNameInput.onclick = function () { sortBy(); };
    const sortNameLabel = document.createElement('label');
    sortNameLabel.textContent = 'Name';
    sortNameLabel.setAttribute('for', 'da-sname');

    const sortAmountInput = document.createElement('input');
    sortAmountInput.type = 'radio';
    sortAmountInput.value = '1';
    sortAmountInput.name = 'da-sort';
    sortAmountInput.id = 'da-samount';
    sortAmountInput.onclick = function () { sortBy(); };
    const sortAmountLabel = document.createElement('label');
    sortAmountLabel.textContent = 'Amount';
    sortAmountLabel.setAttribute('for', 'da-samount');

    sortBox.append(sortLabel, sortNameInput, sortNameLabel, sortAmountInput, sortAmountLabel);
    mainBox.appendChild(sortBox);

    // add colors buttons
    console.log(imgColors);
    for (const c in imgColors) {
        if (imgColors[c].sum === 0) continue;
        const col = document.createElement('div');
        col.classList.add('colorLabel');
        col.style.opacity = 0;
        col.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, delay: 2000, fill: 'forwards' });

        col.textContent = c;
        col.setAttribute('amount', imgColors[c][0]);

        const cRGB = rgb[parseInt(c, 16)];
        col.onclick = async function () {
            document.querySelectorAll('.colorLabel, #allButton, #checkButton').forEach((e) => {
                e.classList.remove('selected');
            });
            this.classList.add('selected');
            if (!this.classList.contains('selected')) {
                //     refreshCurrent(renderShadow(cRGB));
            }
        };
        col.style['background-color'] = `rgb(${cRGB[0]},${cRGB[1]},${cRGB[2]})`;
        col.style['accent-color'] = `rgb(${cRGB[0]},${cRGB[1]},${cRGB[2]})`;
        mainBox.appendChild(col);
    }

    tool.classList.remove('loading');

    function scanCanvasWithWorker() {
        // use promise
        return new Promise((resolve) => {
            const myWorker = new Worker(chrome.runtime.getURL('scanner.js'));
            myWorker.onmessage = (event) => {
                resolve(event.data);
                myWorker.terminate();
            };
            myWorker.postMessage({ xSizesLeg, ySizesLeg, data });
        });
    }

    function changePart(partID) {

    }

    // Return size of each holo segment from one edge
    function generateHoloSizes(edgeLength, div) {
        const div2 = div * 2;
        let diff = (edgeLength + div) % div2;

        const base = (Math.floor((edgeLength + div) / div2) * div2 - div) / div; // (Math.floor((edgeLength + 5) / 10) * 10 - 5) / 5
        const res = [...Array(div)].map(() => base);
        let i = 0;
        while (diff > 0) {
            if (diff > 1) {
                res[i] += 2;
                diff -= 2;
            } else if (diff > 0) {
                res[i]++;
                diff--;
            }
            i++;
        }
        return res;
    }

    // generate coords of holo projectors WARNING! 0,0 in top left corner
    function generateCentres(sideSizes) {
        const result = [];
        let distance = 0;
        for (const partLength of sideSizes) {
            result.push(distance + Math.floor(partLength / 2 + 1) - 1);
            distance += partLength;
        }
        return result;
    }

    function renderShadow(c) {
        const shadowCan = document.createElement('canvas');
        shadowCan.width = can.width;
        shadowCan.height = can.height;
        const shadowCtx = shadowCan.getContext('2d');
        shadowCtx.fillStyle = `rgb(${c[0] / 1.32}, ${c[1] / 1.32}, ${c[2] / 1.32})`;
        shadowCtx.fillRect(0, 0, shadowCan.width, shadowCan.height);
        const holoData = shadowCtx.getImageData(0, 0, shadowCan.width, shadowCan.height);
        const hData = holoData.data;
        for (let i = 0; i < data.length; i += 4) {
            if (data[i] === c[0] && data[i + 1] === c[1] && data[i + 2] === c[2]) {
                hData[i + 3] = 0;
            }
        }
        shadowCtx.putImageData(holoData, 0, 0);
        return shadowCan;
    }

    function divideCanvas(canToDiv, xLen, yLen, large = false) {
        const canList = [];
        let iCount = 0;
        let xDist = 0;
        for (const x of xLen) {
            let yDist = 0;
            for (const y of yLen) {
                const canDiv = document.createElement('canvas');
                const divCtx = canDiv.getContext('2d');
                // sizeCtx.lineWidth = 4;
                // canDiv.width = 680;
                // canDiv.height = 680;
                canDiv.width = x % 2 ? x * 40 : (x + 1) * 40;
                canDiv.height = y % 2 ? y * 40 : (y + 1) * 40;
                divCtx.imageSmoothingEnabled = false;
                // divCtx.fillStyle = 'black';
                // divCtx.fillRect(0,0,680,680);
                divCtx.drawImage(canToDiv, xDist, yDist, large ? x * 40 : x, large ? y * 40 : y, 0, 0, x * 40, y * 40);
                // sizeCtx.strokeRect(1, 1, (x ? width2 : width1) - 1, (y ? height2 : height1) - 1);
                canList.push([canDiv, `${holoItems[iCount][1]}.png`]);
                // console.log(Object.values(holoItems)[iCount], canToDiv, xDist, yDist, divCtx.width, divCtx.height, 0, 0, divCtx.width, divCtx.height);
                iCount++;
                yDist += large ? y * 40 : y;
            }
            xDist += large ? x * 40 : x;
        }
        uploadTextures(canList);
    }

    // Insert array of canvases as game assets
    function uploadTextures(canData) {
        for (const [c, n] of canData) {
            c.toBlob((blob) => {
                toggleSettingsUIBtn.click();
                [...document.querySelectorAll('#new-ui-left button')].find((e) => e.textContent === 'Modify Assets').click();
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(new File([blob], n));
                document.querySelector('.file-pane .file-pane').dispatchEvent(new DragEvent('drop', { dataTransfer }));
                document.querySelector('#new-ui-left button').click();
            });
        }
    }

    // setup holo for user process
    // stage 1: check if have scanner, if no, observe for it
    // 2: check if scanner menu was open before, if no, ask to click R and observer its div
    // 3: automaticaly insert bp, insert template Holos, ask to place it correctly
    function runSetupBp(stage) {
        while (dialogContent.childNodes.length) dialogContent.lastChild.remove();
        // const [title, img] = generateSetupContent('Grab Blueprint Scanner', 'drednot.io/img/bp_scanner.png');
        const invObserver = new MutationObserver(() => {
            if (swapInventoryItem('Blueprint Scanner')) {
                invObserver.disconnect();
            }
        });
        invObserver.observe(document.querySelector('#item-ui-inv'), {});
        if (stage === 1) {
            dialogContent.append([...generateSetupContent('Grab Blueprint Scanner', 'drednot.io/img/bp_scanner.png')]);
            swapInventoryItem('Blueprint Scanner');
            const invObserver = new MutationObserver(() => {
                if (swapInventoryItem('Blueprint Scanner')) {
                    invObserver.disconnect();
                }
            });
            invObserver.observe(document.querySelector('#item-ui-inv'), {});
        }
    }

    function runSetupLeg() {
        while (dialogContent.childNodes.length) dialogContent.lastChild.remove();
        const asking = document.createElement('p');
        asking.textContent = 'If you have BP scanner, change mode.';
        dialogContent.append([...generateSetupContent('Grab Blueprint Scanner', 'drednot.io/img/bp_scanner.png'), asking]);
    }

    function generateSetupContent(text, img) {
        const hg = document.createElement('h3');
        hg.textContent = text;

        const ig = document.createElement('img');
        ig.src = img;
        return [hg, ig];
    }
}

// Inserting blueprint into UI
function swapInventoryItem(item) {
    const itemsHeld = document.querySelectorAll('#item-ui-inv h3');
    if (itemsHeld.length === 0) return false;
    const searched = [...itemsHeld].filter((n) => n.textContent === item);
    if (searched.length === 0) return false;
    searched[0].click();
    return true;
}

// Image processing
function findIndex(a) {
    for (let s = 0; s < 255; s++) if (Math.abs(a[0] - rgb[s][0]) <= 1 && Math.abs(a[1] - rgb[s][1]) <= 1 && Math.abs(a[2] - rgb[s][2]) <= 1) return s;
    return 256;
}

function pxIndex(x, y, w) {
    return (x + y * w) * 4;
}

function canToStr(canStr, dataCan) { // converts pixel art into base64 (78x78 will give 5k characters)
    let imgStr = `${canStr.width},${canStr.height},`;
    // let prevID = '';
    // let sameCount = 0;
    let imgArray = [];
    for (let y = 0; y < canStr.height; y++) {
        for (let x = 0; x < canStr.width; x++) {
            const i = (x + y * canStr.width) * 4;
            const cID = findIndex([dataCan[i], dataCan[i + 1], dataCan[i + 2]]);
            imgArray.push(cID);
            // const t = findIndex([dataCan[i], dataCan[i + 1], dataCan[i + 2]]).toString(16).padStart(2, '0').toUpperCase();
            // if (prevID === t && sameCount < 9) sameCount++;
            // else {
            //     imgStr += prevID;
            //     if (sameCount > 1) imgStr += `;${sameCount}`;
            //     sameCount = 1;
            //     prevID = t;
            // }
        }
    }
    const compressedImg = encodePix(imgArray);
    console.log(compressedImg);
    imgStr += compressedImg;
    // imgStr += prevID;
    // if (sameCount > 1) imgStr += `;${sameCount}`;
    // const compressedUint8array = pako.gzip(imgStr);
    // const b64encodedString = btoa(String.fromCharCode.apply(null, compressedUint8array));
    return imgStr;
}

function strToCan(imgStr) {
    try {
        // const compressedUint8Array = Uint8Array.from(atob(base64Str), (c) => c.charCodeAt(0));
        // const inflatedStr = pako.inflate(compressedUint8Array, { to: 'string' });
        const [width, height, base2048] = imgStr.split(',');
        const imgArray = decodePix(base2048);
        const canStr = document.createElement('canvas');
        canStr.width = width;
        canStr.height = height;
        const ctx = canStr.getContext('2d');
        let x = 0;
        let y = 0;
        let dataIndex = 0;
        while (dataIndex < imgArray.length) {
            // const hexValue = `${base2048[dataIndex]}${base2048[dataIndex + 1]}`;
            // const colorID = rgb[parseInt(hexValue, 16)];
            // let amount = 1;
            // if (base2048[dataIndex + 2] === ';') {
            //     amount = parseInt(base2048[dataIndex + 3]);
            //     dataIndex += 4;
            // } else dataIndex += 2;
            // while (amount > 0) {
            //     ctx.fillStyle = `rgb(${colorID[0]}, ${colorID[1]}, ${colorID[2]})`;
            //     ctx.fillRect(x, y, 1, 1);
            //     amount--;
            //     if (x >= width - 1) {
            //         x = 0;
            //         y++;
            //     } else x++;
            // }
            const colorID = rgb[imgArray[dataIndex]];
            ctx.fillStyle = `rgb(${colorID[0]}, ${colorID[1]}, ${colorID[2]})`;
            ctx.fillRect(x, y, 1, 1);
            dataIndex++;
            if (x >= width - 1) {
                x = 0;
                y++;
            } else x++;
        }
        if (x !== 0) throw new Error('Package not complete');
        return canStr;
    } catch (error) {
        info('Something went wrong when loading image. Check console.', false);
        return false;
    }
}

// Error and success popups
function info(text, status = true) {
    const messageWrapper = document.createElement('li');
    const message = document.createElement('p');
    message.textContent = text;
    if (!status) message.classList.add('error');
    messageWrapper.append(message);
    messageContainer.append(messageWrapper);
    message.onclick = () => {
        removeMessage(message);
    };
    setTimeout(() => {
        messageWrapper.classList.add('show');
        message.classList.add('show');
    }, 15);
    setTimeout(() => {
        removeMessage(message);
    }, 5000);
}

function removeMessage(e) {
    e.classList.remove('show');
    e.parentElement.classList.remove('show');
    e.parentElement.ontransitionend = () => {
        e.parentElement.remove();
    };
}

// Blueprint encoding

function encodeBlueprint(width, height, xC, yC) {
    const buildCommands = [];
    let iCount = 0;
    for (const xCoord of xC) {
        for (const yCoord of yC) {
            buildCommands.push(144, 0, ...generateTag(xCoord), ...generateTag(height - yCoord), ...generateTag(holoItems[iCount][0]), 145);
            iCount++;
        }
    }
    const uint8Array = [144, 0, ...generateTag(width), ...generateTag(height), 144, ...buildCommands, 145, 145];
    return base64Arraybuffer(pako.deflateRaw(uint8Array));
}

function generateTag(e) {
    if (e < 63) return [e];
    if (e < 256) return [128, e];

    let binary = e.toString(2);
    let bits = 8;
    while (bits < binary.length) bits *= 2;

    binary = binary.padStart(bits, '0');
    return [bits === 64 ? 131 : bits === 32 ? 130 : 129, ...binary.match(/.{1,8}/g).reverse().map((x) => parseInt(x, 2))];
}

const base64Arraybuffer = async (dt) => {
    const base64 = await new Promise((rr) => {
        const reader = new FileReader();
        reader.onload = () => rr(reader.result);
        reader.readAsDataURL(new Blob([dt]));
    });
    return base64.substring(base64.indexOf(',') + 1);
};
