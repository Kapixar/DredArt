/* eslint-disable no-bitwise */

// setup for base2048
/**
  Base2048 is a binary-to-text encoding optimised for transmitting data
  through Twitter. https://github.com/qntm/base2048
*/
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

const { version } = chrome.runtime.getManifest();

const toggleSettingsUIBtn = document.querySelector(`button[onclick="toggleUI('settings');"`);
const rgb = [[222, 165, 164], [214, 145, 136], [173, 111, 105], [128, 64, 64], [77, 0, 0], [77, 25, 0], [128, 0, 0], [144, 30, 30], [186, 1, 1], [179, 54, 54], [179, 95, 54], [255, 0, 0], [216, 124, 99], [255, 64, 64], [255, 128, 128], [255, 195, 192], [195, 153, 83], [128, 85, 64], [128, 106, 64], [77, 51, 38], [77, 51, 0], [128, 42, 0], [155, 71, 3], [153, 101, 21], [213, 70, 0], [218, 99, 4], [255, 85, 0], [237, 145, 33], [255, 179, 31], [255, 128, 64], [255, 170, 128], [255, 212, 128], [181, 179, 92], [77, 64, 38], [77, 77, 0], [128, 85, 0], [179, 128, 7], [183, 162, 20], [179, 137, 54], [238, 230, 0], [255, 170, 0], [255, 204, 0], [255, 255, 0], [255, 191, 64], [255, 255, 64], [223, 190, 111], [255, 255, 128], [234, 218, 184], [199, 205, 144], [128, 128, 64], [77, 77, 38], [64, 77, 38], [128, 128, 0], [101, 114, 32], [141, 182, 0], [165, 203, 12], [179, 179, 54], [191, 201, 33], [206, 255, 0], [170, 255, 0], [191, 255, 64], [213, 255, 128], [248, 249, 156], [253, 254, 184], [135, 169, 107], [106, 128, 64], [85, 128, 64], [51, 77, 38], [51, 77, 0], [67, 106, 13], [85, 128, 0], [42, 128, 0], [103, 167, 18], [132, 222, 2], [137, 179, 54], [95, 179, 54], [85, 255, 0], [128, 255, 64], [170, 255, 128], [210, 248, 176], [143, 188, 143], [103, 146, 103], [64, 128, 64], [38, 77, 38], [25, 77, 0], [0, 77, 0], [0, 128, 0], [34, 139, 34], [3, 192, 60], [70, 203, 24], [54, 179, 54], [54, 179, 95], [0, 255, 0], [64, 255, 64], [119, 221, 119], [128, 255, 128], [64, 128, 85], [64, 128, 106], [38, 77, 51], [0, 77, 26], [0, 77, 51], [0, 128, 43], [23, 114, 69], [0, 171, 102], [28, 172, 120], [11, 218, 81], [0, 255, 85], [80, 200, 120], [64, 255, 128], [128, 255, 170], [128, 255, 212], [168, 227, 189], [110, 174, 161], [64, 128, 128], [38, 77, 64], [38, 77, 77], [0, 77, 77], [0, 128, 85], [0, 166, 147], [0, 204, 153], [0, 204, 204], [54, 179, 137], [54, 179, 179], [0, 255, 170], [0, 255, 255], [64, 255, 191], [64, 255, 255], [128, 255, 255], [133, 196, 204], [93, 138, 168], [64, 106, 128], [38, 64, 77], [0, 51, 77], [0, 128, 128], [0, 85, 128], [0, 114, 187], [8, 146, 208], [54, 137, 179], [33, 171, 205], [0, 170, 255], [100, 204, 219], [64, 191, 255], [128, 212, 255], [175, 238, 238], [64, 85, 128], [38, 51, 77], [0, 26, 77], [0, 43, 128], [0, 47, 167], [54, 95, 179], [40, 106, 205], [0, 127, 255], [0, 85, 255], [49, 140, 231], [73, 151, 208], [64, 128, 255], [113, 166, 210], [100, 149, 237], [128, 170, 255], [182, 209, 234], [146, 161, 207], [64, 64, 128], [38, 38, 77], [0, 0, 77], [25, 0, 77], [0, 0, 128], [42, 0, 128], [0, 0, 205], [54, 54, 179], [95, 54, 179], [0, 0, 255], [28, 28, 240], [106, 90, 205], [64, 64, 255], [133, 129, 217], [128, 128, 255], [177, 156, 217], [150, 123, 182], [120, 81, 169], [85, 64, 128], [106, 64, 128], [51, 38, 77], [51, 0, 77], [85, 0, 128], [137, 54, 179], [85, 0, 255], [138, 43, 226], [167, 107, 207], [127, 64, 255], [191, 64, 255], [148, 87, 235], [170, 128, 255], [153, 85, 187], [140, 100, 149], [128, 64, 128], [64, 38, 77], [77, 38, 77], [77, 0, 77], [128, 0, 128], [159, 0, 197], [179, 54, 179], [184, 12, 227], [170, 0, 255], [255, 0, 255], [255, 64, 255], [213, 128, 255], [255, 128, 255], [241, 167, 254], [128, 64, 106], [105, 45, 84], [77, 38, 64], [77, 0, 51], [128, 0, 85], [162, 0, 109], [179, 54, 137], [202, 31, 123], [255, 0, 170], [255, 29, 206], [233, 54, 167], [207, 107, 169], [255, 64, 191], [218, 112, 214], [255, 128, 213], [230, 168, 215], [145, 95, 109], [128, 64, 85], [77, 38, 51], [77, 0, 25], [128, 0, 42], [215, 0, 64], [179, 54, 95], [255, 0, 127], [255, 0, 85], [255, 0, 40], [222, 49, 99], [208, 65, 126], [215, 59, 62], [255, 64, 127], [249, 90, 97], [255, 128, 170], [17, 17, 17], [34, 34, 34], [51, 51, 51], [68, 68, 68], [85, 85, 85], [102, 102, 102], [119, 119, 119], [136, 136, 136], [153, 153, 153], [170, 170, 170], [187, 187, 187], [204, 204, 204], [221, 221, 221], [238, 238, 238], [255, 255, 255]];
const canvasSettings = { colorSpace: 'srgb' };

const tool = document.createElement('div');
tool.id = 'da-popup';
tool.classList.add('hidden');
setTimeout(() => tool.classList.remove('hidden'), 1);
document.body.append(tool);
const messageContainer = document.createElement('div');
messageContainer.id = 'da-messageContainer';

// MARK: Top bar
const topBar = document.createElement('div');
topBar.id = 'da-top-bar';
const menuHam = document.createElement('i');
menuHam.classList.add('fas', 'big-icon', 'fa-bars');
menuHam.onclick = () => {
    if (document.querySelector('#da-content .active:not(#da-menu)')) {
        mainMenu.classList.toggle('active');
        if (insertBox.classList.contains('active')) insertBox.classList.remove('active');
    }
};

const closeBtn = document.createElement('i');
closeBtn.classList.add('fas', 'big-icon', 'fa-times');
closeBtn.onclick = () => {
    tool.classList.toggle('hidden');
};

const title = document.createElement('span');
title.textContent = 'DredArt';
title.setAttribute('data-subtitle', `${version} by I am Shrek`);
topBar.append(menuHam, title, closeBtn);

dragElement(tool, title);

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
settingsButton.setAttribute('data-desc', 'Tweak your needs!');
settingsButton.onclick = () => { toggleSettingsUI(); };

const guideButton = document.createElement('span');
guideButton.textContent = 'Guide';
guideButton.setAttribute('data-desc', 'Learn DredArt!');
guideButton.onclick = () => { toggleGuideUI(); }; // todo

const mosaicButton = document.createElement('span');
mosaicButton.textContent = 'Mosaic';
mosaicButton.setAttribute('data-desc', 'Help the Mosaic!');
mosaicButton.onclick = () => { window.open('https://discord.gg/wM2B5k5S6M'); }; // todo

helpButtonGroup.append(settingsButton, guideButton, mosaicButton);

mainMenu.append(useButton, createButton, helpButtonGroup);

// Settings tab
const settingsBox = document.createElement('div');
settingsBox.id = 'da-settings';

// dialog - setup
const dialogBox = document.createElement('div');
dialogBox.id = 'da-dialog';

const setupBox = document.createElement('div');
setupBox.id = 'da-setup';

// inserting image
const insertBox = document.createElement('div');
insertBox.id = 'da-insert';

// main box with holo UI
const mainBox = document.createElement('div');
mainBox.id = 'da-ui';

mainContent.append(mainMenu, insertBox, settingsBox, dialogBox, setupBox, mainBox);
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
        element.classList.remove('drag');
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
        minBoundY = 0;

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
    insertBox.append(generateCloseButton(insertBox));

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
    pasteTip.textContent = 'Paste';
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
        if (imageUrl.includes('discordapp') && imageUrl.includes('width=')) return info('You can\'t drag from Discord. Instead copy and paste it please :)', false);

        if (e.dataTransfer.files) {
            if (e.dataTransfer.files.length === 1 && e.dataTransfer.files[0].type.includes('image')) return validateImage(e.dataTransfer.files[0]);
            if (imageUrl) validateImage(false, imageUrl);
        }
    };

    // Paste handler
    document.onpaste = (e) => {
        if (!insertBox.classList.contains('active') || mainMenu.classList.contains('active')) return;
        e.preventDefault();
        const { files } = e.clipboardData;
        // if (items.length > 1) return info('You can only paste one file', false);
        const file = files[0];
        if (file) return validateImage(file);
        const textURL = e.clipboardData.getData('Text');
        if (!textURL.includes('data:image')) return info('No file in pasted content.', false);
        if (textURL) return validateImage(false, textURL);
        info('Image not found in pasted content', false);

        validateImage(file);
    };

    // last used
    const lastGallery = document.createElement('div');
    chrome.storage.local.get('DA_lastUsed').then((result) => {
        if (!result.DA_lastUsed) {
            lastGallery.textContent = 'Empty. Let\'s start painting!';
            return;
        }
        for (const last of result.DA_lastUsed) {
            const thumbnailLast = strToCan(last);
            if (thumbnailLast) {
                lastGallery.append(thumbnailLast);
                thumbnailLast.onclick = () => {
                    generateTool(thumbnailLast);
                };
            } else {
                const thumbnailError = document.createElement('span');
                thumbnailError.textContent = 'ERROR';
                lastGallery.append(thumbnailError);
            }
        }
    });

    // load from the chat
    // const chatLoad = document.createElement('button');
    // chatLoad.textContent = 'Load from chat';
    // chatLoad.onclick = () => {
    //     if (document.getElementById('exit_button').style.display === 'none') return info('You need to join a ship to do that.', false);
    //     const messages = document.querySelectorAll('#chat-content p');
    //     let sender = null;
    //     let str = '';
    //     for (const mess of messages) {
    //         if (sender) {
    //             if (!mess.textContent.includes(sender)) continue;
    //             str += mess.textContent.slice(mess.textContent.indexOf(':') + 2);
    //             continue;
    //         } else if (mess.textContent.includes('DA$')) {
    //             sender = mess.querySelector('bdi').textContent;
    //             str += mess.textContent.slice(mess.textContent.indexOf(':') + 5);
    //         }
    //     }
    //     if (str === '') return info('No image data found in chat.', false);
    //     const canChat = strToCan(str.slice(0, -8));
    //     if (canChat) generateTool(canChat);
    // };

    insertBox.append(insertHeader, fileUpload, fileLabel, lastGallery);
}

// validate image from various sources
function validateImage(file = false, url = false) {
    if (file.length === null && !url) return info('Probably file is empty.', false);

    if (file.type !== 'image/png' && !url) return info('File is not a PNG - like DredArt images.', false);

    const img = new Image();
    const imgUrl = url || URL.createObjectURL(file);
    img.src = imgUrl;
    img.onerror = function () {
        return info('Failed to load (If you dragged from Discord).', false);
    };
    img.onload = async function () {
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
                if (findIndex([sD[i], sD[i + 1], sD[i + 2]]) === 256) return info('Image contains colors that don\'t exist in Dredark color palette. Use DredArt for pixel arts.', false);
                if (sD[i + 3] !== 255) return info('Image contains transparency. No transparency is allowed. Use DredArt for pixel arts.', false);
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
    insertBox.animate([
        { opacity: 1, transform: 'scale(1) translateY(0)' },
        { opacity: 0, transform: 'scale(.5) translateY(-150%)' },
    ], {
        duration: 200,
        easing: 'ease-in-out',
    });
    dialogBox.classList.remove('active');
    settingsBox.classList.remove('active');
    tool.classList.add('loading');
    mainBox.classList.add('active');

    // drawing input on main canvas
    const can = document.createElement('canvas');
    can.width = sourceCanvas.width;
    can.height = sourceCanvas.height;
    const imageAspectRatio = sourceCanvas.width / sourceCanvas.height;
    const ctx = can.getContext('2d', { willReadFrequently: true, colorSpace: 'srgb' });
    ctx.fillStyle = 'rgb(187,187,187)';
    ctx.drawImage(sourceCanvas, 0, 0);
    const { data } = ctx.getImageData(0, 0, can.width, can.height);

    // Saving art to string and last Used
    const canString = canToStr(can, data);
    const previous = await chrome.storage.local.get('DA_lastUsed');
    if (!previous.DA_lastUsed) chrome.storage.local.set({ DA_lastUsed: [canString] });
    else {
        const spotID = previous.DA_lastUsed.indexOf(canString);
        if (spotID !== -1) previous.DA_lastUsed.splice(spotID, 1);
        previous.DA_lastUsed.unshift(canString);
        if (previous.DA_lastUsed.length > 5) previous.DA_lastUsed = previous.DA_lastUsed.slice(0, 5);
        chrome.storage.local.set({ DA_lastUsed: previous.DA_lastUsed });
    }

    let regionThreshold = 30;
    const resThreshold = await chrome.storage.sync.get('DA_threshold');
    regionThreshold = resThreshold.DA_threshold || regionThreshold;
    const XpartsToDivideInto = Math.ceil(can.width / regionThreshold);
    const YpartsToDivideInto = Math.ceil(can.height / regionThreshold);

    // calculating size of textures for holo
    const xSizes = generateHoloSizes(can.width, XpartsToDivideInto);
    const xCenters = generateCentres(xSizes);
    const ySizes = generateHoloSizes(can.height, YpartsToDivideInto);
    const yCenters = generateCentres(ySizes);

    // BP string
    const holoBP = await encodeBlueprint(can.width, can.height, xCenters, yCenters);

    // Calculating existing colors inside the worker
    const { imgColors, artThemeRGB, reqContrast } = await scanCanvasWithWorker();

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
        [`Paint cost: ${ironCost} iron`, 'Pure paint cost'],
        [`Full cost: ${Math.round(ironCost * 1.02) + Math.abs(sourceCanvas.width + sourceCanvas.height - 23) * 4} iron`, 'Expanding starter ship + 2% of mistakes'],
        ['Estimated time: X hours', '(WIP) Based on average painting speed'],
    ];

    for (const stat of pxInfo) {
        const pInfo = document.createElement('p');
        [pInfo.textContent] = stat;
        if (stat[1]) pInfo.setAttribute('data-help', stat[1]);
        stats.append(pInfo);
    }

    // MARK: chat send button
    // const sendChat = document.createElement('label');
    // sendChat.classList.add('long');
    // sendChat.id = 'da-send-chat';
    // let sendingInt;
    // sendChat.onclick = () => {
    //     if (document.getElementById('exit_button').style.display === 'none') return info('You need to join a ship to do that.', false);
    //     const strToSend = `DA$${canString}$finish$`;
    //     let counter = 0;
    //     const chatBox = document.getElementById('chat');
    //     const chatInp = document.getElementById('chat-input');
    //     const chatBtn = document.getElementById('chat-send');
    //     if (sendChat.classList.contains('chat_sending')) {
    //         sendChat.classList.remove('chat_sending');
    //         clearInterval(sendingInt);
    //     } else {
    //         sendChat.classList.add('chat_sending');
    //         sendingInt = setInterval(() => {
    //             if (counter > strToSend.length) {
    //                 sendChat.classList.remove('chat_sending');
    //                 clearInterval(sendingInt);
    //             }
    //             if (chatBox.classList.contains('closed')) chatBtn.click();
    //             chatInp.value = strToSend.slice(counter, counter + 300);
    //             chatBtn.click();
    //             counter += 300;
    //         }, 1500);
    //     }
    // };

    // slider what type of holo use
    const holoModeBox = document.createElement('label');
    holoModeBox.classList.add('long');
    holoModeBox.setAttribute('for', 'holo-type');
    const modeCheck = document.createElement('input');
    modeCheck.type = 'checkbox';
    modeCheck.id = 'holo-type';
    modeCheck.onchange = () => {
        const selectedBtn = document.querySelector('.colorLabel.selected');
        if (selectedBtn) {
            selectedBtn.classList.remove('selected');
            selectedBtn.click();
        }
    };

    // holo setup button
    const setupButton = document.createElement('div');
    setupButton.id = 'da-setup-btn';
    setupButton.classList.add('long');
    setupButton.onclick = () => {
        if (modeCheck.checked) runSetupLeg();
        else runSetupBp(1);
    };

    mainBox.append(stats, modeCheck, holoModeBox, setupButton);

    // Setting theme and contrast to bg
    const length = ((stats.clientHeight * can.width) / can.height) / stats.clientWidth;

    const themeString = `rgb(${artThemeRGB[0]}, ${artThemeRGB[1]}, ${artThemeRGB[2]})`;
    tool.style.setProperty('--themeColor', themeString);
    tool.style.setProperty('--contrastColor', reqContrast ? 'white' : 'rgb(25, 35, 45)');
    stats.style = `background-image: linear-gradient(to right, transparent 0%, var(--themeColor) ${length * 100}%), url(${thUrl});`;

    const blobBtns = [
        document.querySelector('#da-blob i'),
        document.querySelector('#da-blob i:nth-last-child(2)'),
        document.querySelector('#da-blob i:nth-child(3)'),
    ];
    for (const blobBtn of blobBtns) {
        blobBtn.style.color = themeString;
        if (reqContrast) blobBtn.style.textShadow = '0 0 2px white';
        else blobBtn.style.textShadow = 'none';
    }

    // draw Show all canvas
    const allCan = document.createElement('canvas');
    const allCtx = allCan.getContext('2d');
    allCan.width = can.width * 40;
    allCan.height = can.height * 40;
    allCtx.imageSmoothingEnabled = false;
    allCtx.fillStyle = 'rgb(153,153,153)';
    allCtx.font = 'bold 24px monospace';
    allCtx.shadowColor = 'black';
    for (let y = 0; y < can.height; y++) {
        for (let x = 0; x < can.width; x++) {
            if (xCenters.includes(x) && yCenters.includes(y)) allCtx.shadowBlur = 2;
            else allCtx.shadowBlur = 0;
            const i = (x + y * can.width) * 4;
            const t = findIndex([data[i], data[i + 1], data[i + 2]]).toString(16).padStart(2, '0').toUpperCase();
            allCtx.fillStyle = `rgb(${data[i] / 1.32},${data[i + 1] / 1.32},${data[i + 2] / 1.32})`;
            allCtx.fillText(t, x * 40 + 6, y * 40 + 28);
        }
    }

    const allCanLegacy = document.createElement('canvas');
    const allCtxLegacy = allCanLegacy.getContext('2d');
    allCanLegacy.width = can.width * 40;
    allCanLegacy.height = can.height * 40;
    allCtxLegacy.imageSmoothingEnabled = false;
    allCtxLegacy.fillStyle = 'rgb(153,153,153)';
    allCtxLegacy.font = 'bold 24px monospace';
    for (let y = 0; y < can.height; y++) {
        for (let x = 0; x < can.width; x++) {
            const i = (x + y * can.width) * 4;
            const t = findIndex([data[i], data[i + 1], data[i + 2]]).toString(16).padStart(2, '0').toUpperCase();
            allCtxLegacy.fillStyle = `rgb(${data[i]},${data[i + 1]},${data[i + 2]})`;
            allCtxLegacy.fillText(t, x * 40 + 6, y * 40 + 28);
        }
    }

    // draw error canvas
    const blendCan = document.createElement('canvas');
    const chtx = blendCan.getContext('2d', settingsBox);
    blendCan.width = can.width;
    blendCan.height = can.height;
    chtx.drawImage(can, 0, 0);
    const checkData = chtx.getImageData(0, 0, blendCan.width, blendCan.height);
    const cData = checkData.data;
    for (let i = 0; i < cData.length; i += 4) {
        cData[i] = blend(cData[i]) / 1.32;
        cData[i + 1] = blend(cData[i + 1]) / 1.32;
        cData[i + 2] = blend(cData[i + 2]) / 1.32;
        cData[i + 3] = 180;
    }
    chtx.putImageData(checkData, 0, 0);

    const blendCanLegacy = document.createElement('canvas');
    const blendCtxLegacy = blendCanLegacy.getContext('2d', settingsBox);
    blendCanLegacy.width = can.width;
    blendCanLegacy.height = can.height;
    blendCtxLegacy.drawImage(can, 0, 0);
    const checkDataLegacy = blendCtxLegacy.getImageData(0, 0, blendCanLegacy.width, blendCanLegacy.height);
    const cDataLegacy = checkDataLegacy.data;
    for (let i = 0; i < cDataLegacy.length; i += 4) {
        cDataLegacy[i] = blend(cDataLegacy[i]);
        cDataLegacy[i + 1] = blend(cDataLegacy[i + 1]);
        cDataLegacy[i + 2] = blend(cDataLegacy[i + 2]);
        cDataLegacy[i + 3] = 153;
    }
    blendCtxLegacy.putImageData(checkDataLegacy, 0, 0);

    function blend(c) { return Math.floor(255 - (c * 2) / 3); }

    // regions canvases initialization
    const allCanRegions = divideCanvas(allCan, xSizes, ySizes, true);
    const blendCanRegions = divideCanvas(blendCan, xSizes, ySizes, false);
    const allCanLegacyRegions = divideCanvas(allCanLegacy, xSizes, ySizes, true);
    const blendCanLegacyRegions = divideCanvas(blendCanLegacy, xSizes, ySizes, false);

    // sticky box
    const stickyBox = document.createElement('div');
    stickyBox.classList.add('sticky', 'long');

    // make stickyBox float
    const stickyObserver = new IntersectionObserver(([e]) => {
        if (e.intersectionRatio !== 0) e.target.classList.toggle('pinned', e.intersectionRatio < 1);
    }, { threshold: [1] });
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
    const showAllBtn = document.createElement('label');
    showAllBtn.textContent = 'Show all';
    showAllBtn.id = 'allButton';
    showAllBtn.classList.add('colorLabel');
    showAllBtn.setAttribute('title', 'Display every color on Holo as text');
    showAllBtn.onclick = function () {
        if (!this.classList.contains('selected')) changeCurrentRegions(modeCheck.checked ? allCanLegacyRegions : allCanRegions);
        document.querySelectorAll('.colorLabel, #checkButton').forEach((e) => {
            e.classList.remove('selected');
        });
        this.classList.add('selected');
    };

    // check button
    const FindErrBtn = document.createElement('label');
    FindErrBtn.textContent = 'Find errors';
    FindErrBtn.id = 'checkButton';
    FindErrBtn.classList.add('colorLabel');
    FindErrBtn.setAttribute('title', 'Find mistakes easier. Only correct tiles turn grey.');
    FindErrBtn.onclick = function () {
        if (!this.classList.contains('selected')) changeCurrentRegions(modeCheck.checked ? blendCanLegacyRegions : blendCanRegions);
        document.querySelectorAll('.colorLabel, #allButton').forEach((e) => {
            e.classList.remove('selected');
        });
        this.classList.add('selected');
    };

    stickyBox.append(showAllBtn);

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

    // Region selection
    if (XpartsToDivideInto > 1 || YpartsToDivideInto > 1) {
        const regionBox = document.createElement('div');
        regionBox.classList.add('regionSelector');
        regionBox.style.setProperty('--partsOnXAxis', XpartsToDivideInto);
        // max height of selector 100px
        // max width of selector 200px
        // based on aspect ratio of image
        regionBox.style.setProperty('--selectorHeight', `${Math.min(70, 140 / imageAspectRatio)}px`);
        regionBox.style.setProperty('--selectorWidth', `${Math.min(140, 70 * imageAspectRatio)}px`);
        regionBox.style.backgroundImage = `url(${thUrl})`;

        for (let y = 0; y < YpartsToDivideInto; y++) {
            for (let x = 0; x < XpartsToDivideInto; x++) {
                const i = x + y * XpartsToDivideInto;
                const cornerLabel = document.createElement('label');
                cornerLabel.setAttribute('for', `da-region${i}`);
                const cornerInput = document.createElement('input');
                if (i === 0) cornerInput.checked = true;
                cornerInput.onchange = () => { changeRegionID(i); };
                cornerInput.type = 'radio';
                cornerInput.name = 'da-region';
                cornerInput.id = `da-region${i}`;
                cornerInput.value = i;
                regionBox.append(cornerInput, cornerLabel);
            }
        }
        stickyBox.appendChild(regionBox);
    } else stickyBox.classList.add('simple');

    stickyBox.appendChild(FindErrBtn);
    mainBox.appendChild(stickyBox);
    stickyBox.classList.remove('pinned');

    // Sorting form
    const sortBox = document.createElement('div');
    sortBox.classList.add('long', 'sort');
    const sortLabel = document.createElement('span');
    sortLabel.textContent = 'Sort by';

    const sortNameInput = document.createElement('input');
    sortNameInput.type = 'radio';
    sortNameInput.value = '0';
    sortNameInput.name = 'da-sort';
    sortNameInput.id = 'da-sname';
    sortNameInput.checked = true;
    sortNameInput.onclick = function () { sortColors(); };
    const sortNameLabel = document.createElement('label');
    sortNameLabel.textContent = 'Value';
    sortNameLabel.setAttribute('for', 'da-sname');

    const sortAmountInput = document.createElement('input');
    sortAmountInput.type = 'radio';
    sortAmountInput.value = '1';
    sortAmountInput.name = 'da-sort';
    sortAmountInput.id = 'da-samount';
    sortAmountInput.onclick = function () { sortColors(); };
    const sortAmountLabel = document.createElement('label');
    sortAmountLabel.textContent = 'Amount';
    sortAmountLabel.setAttribute('for', 'da-samount');

    sortBox.append(sortLabel, sortNameInput, sortNameLabel, sortAmountInput, sortAmountLabel);
    mainBox.appendChild(sortBox);

    const colorLabels = [];

    // add colors buttons
    for (const c in imgColors) {
        if (imgColors[c].sum === 0) continue;
        const colorTile = document.createElement('div');
        colorTile.classList.add('colorLabel');
        colorLabels.push(colorTile);

        colorTile.textContent = c;
        colorTile.setAttribute('amount', imgColors[c][0]);

        const cRGB = rgb[parseInt(c, 16)];
        colorTile.onclick = function () {
            if (!this.classList.contains('selected')) {
                changeCurrentRegions(divideCanvas(renderColorShadow(cRGB), xSizes, ySizes));
            }
            document.querySelectorAll('.colorLabel, #allButton, #checkButton').forEach((e) => {
                e.classList.remove('selected');
            });
            this.classList.add('selected');
        };
        colorTile.style.setProperty('--tileColor', `rgb(${cRGB[0]},${cRGB[1]},${cRGB[2]})`);
        // col.style['accent-color'] = `rgb(${cRGB[0]},${cRGB[1]},${cRGB[2]})`;
        mainBox.appendChild(colorTile);
    }

    function sortColors() {
        const sortType = document.querySelector('input[name="da-sort"]:checked').value;
        const colorArray = Array.from(colorLabels);
        colorArray.sort((a, b) => {
            if (sortType === '0') return parseInt(a.textContent, 16) - parseInt(b.textContent, 16);
            return parseInt(b.getAttribute('amount')) - parseInt(a.getAttribute('amount'));
        });
        for (const c of colorArray) mainBox.appendChild(c);
    }

    tool.classList.remove('loading');

    function scanCanvasWithWorker() {
        return new Promise((resolve) => {
            const myWorker = new Worker(chrome.runtime.getURL('scanner.js'));
            myWorker.onmessage = (event) => {
                resolve(event.data);
                myWorker.terminate();
            };
            myWorker.postMessage({ xSizes, ySizes, data });
        });
    }

    let currentRegions = null;
    let currentRegionID = 0;
    function changeRegionID(id) {
        currentRegionID = id;
        for (const colorLabel of colorLabels) colorLabel.setAttribute('amount', imgColors[colorLabel.textContent][currentRegionID]);
        sortColors();
        if (!currentRegions) {
            showAllBtn.classList.add('selected');
            showAllBtn.click();
        } else uploadTextures(currentRegions[currentRegionID]);
    }

    function changeCurrentRegions(canvs) {
        currentRegions = canvs;
        uploadTextures(currentRegions[currentRegionID]);
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

    function renderColorShadow(c) {
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

    function divideCanvas(canToDiv, xLen, yLen, isCanLarge = false) {
        const canList = [];
        let iCount = 0;
        let yDist = 0;
        for (const y of yLen) {
            let xDist = 0;
            for (const x of xLen) {
                const canDiv = document.createElement('canvas');
                const divCtx = canDiv.getContext('2d');
                canDiv.width = x % 2 ? x * 40 : (x + 1) * 40;
                canDiv.height = y % 2 ? y * 40 : (y + 1) * 40;
                divCtx.imageSmoothingEnabled = false;
                divCtx.lineWidth = 5;
                divCtx.strokeStyle = themeString;

                // Calculate the dimensions based on whether isCanLarge is true
                const width = isCanLarge ? x * 40 : x;
                const height = isCanLarge ? y * 40 : y;

                // Draw the rectangle around the image
                divCtx.strokeRect(0, 0, x * 40, y * 40);

                // Draw the canvas
                divCtx.drawImage(canToDiv, xDist, yDist, width, height, 0, 0, x * 40, y * 40);
                // sizeCtx.strokeRect(1, 1, (x ? width2 : width1) - 1, (y ? height2 : height1) - 1);
                canList.push([canDiv, iCount]);
                iCount++;
                xDist += isCanLarge ? x * 40 : x;
            }
            yDist += isCanLarge ? y * 40 : y;
        }
        return canList;
    }
    let lastHoloTexture = null;
    // Insert array of canvases as game assets
    function uploadTextures(canData) {
        applyPaintingTextures();
        const holoMode = modeCheck.checked ? 1 : 0;
        canData[0].toBlob((blob) => {
            toggleSettingsUIBtn.click();
            [...document.querySelectorAll('#new-ui-left button')].find((e) => e.textContent === 'Modify Assets').click();
            if (lastHoloTexture) {
                const tds = [...document.querySelectorAll(`.file-pane .file-pane-name`)].find((e) => e.textContent === lastHoloTexture);
                if (tds) {
                    const td = tds.parentElement;
                    td.querySelector('button').click();
                }
            }
            const fileName = holoItems[holoMode][canData[1] % holoItems[holoMode].length][1];
            lastHoloTexture = fileName;
            dropTexture(document.querySelector(`.file-pane${holoMode === 0 ? ' .file-pane' : ''}`), blob, fileName);
            document.querySelector('#new-ui-left button').click();
        });
    }

    function removeLastTexture() {
        toggleSettingsUIBtn.click();
        [...document.querySelectorAll('#new-ui-left button')].find((e) => e.textContent === 'Modify Assets').click();
        if (lastHoloTexture) {
            const tds = [...document.querySelectorAll(`.file-pane .file-pane-name`)].find((e) => e.textContent === lastHoloTexture);
            if (tds) {
                const td = tds.parentElement;
                td.querySelector('button').click();
            }
        }
        document.querySelector('#new-ui-left button').click();
    }

    const whiteCan = document.createElement('canvas');
    whiteCan.width = 64;
    whiteCan.height = 64;
    const whiteCtx = whiteCan.getContext('2d');
    whiteCtx.fillStyle = 'white';
    whiteCtx.fillRect(0, 0, 64, 64);
    const whiteCanBlob = await toBlobPromise(whiteCan);

    const tilesSubworld = await fetch(chrome.runtime.getURL('img/tiles_subworld.png'));
    const tilesSubworldBlob = await tilesSubworld.blob();

    const paintTextures = [
        [whiteCanBlob, 'bg_ship.png'],
        [tilesSubworldBlob, 'tiles_subworld.png'],
    ];
    // assert clear bg and invisible blocks
    function applyPaintingTextures() {
        if (localStorage.getItem('dredArtApplied')) return;
        localStorage.setItem('dredArtApplied', 1);
        toggleSettingsUIBtn.click();
        [...document.querySelectorAll('#new-ui-left button')].find((e) => e.textContent === 'Modify Assets').click();
        paintTextures.forEach((pT) => {
            dropTexture(document.querySelector(`.file-pane`), pT[0], pT[1]);
        });
        document.querySelector('#new-ui-left button').click();
    }

    function dropTexture(spot, blob, fileName) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(new File([blob], fileName));
        // firefox changes required
        spot.dispatchEvent(new DragEvent('drop', { dataTransfer }));
    }

    // Helper function to convert toBlob to a Promise
    function toBlobPromise(canvas) {
        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error('Blob creation failed'));
                }
            });
        });
    }

    // setup holo for user process
    // stage 1: check if have scanner, if no, observe for it
    // 2: check if scanner menu was open before, if no, ask to click R and observer its div
    // 3: automaticaly insert bp, insert template Holos, ask to place it correctly
    const templateLBCan = document.createElement('canvas');
    templateLBCan.width = xSizes[0] * 40;
    templateLBCan.height = ySizes[ySizes.length - 1] * 40;
    const templateLBCtx = templateLBCan.getContext('2d');
    templateLBCtx.fillStyle = 'white';
    templateLBCtx.fillRect(0, 0, templateLBCan.width, templateLBCan.height);
    templateLBCtx.strokeStyle = 'black';
    templateLBCtx.lineWidth = 20;
    templateLBCtx.moveTo(templateLBCan.width / 2, templateLBCan.height / 2);
    templateLBCtx.lineTo(10, templateLBCan.height - 10);
    templateLBCtx.lineTo(10, templateLBCan.height - 100);
    templateLBCtx.moveTo(10, templateLBCan.height - 10);
    templateLBCtx.lineTo(100, templateLBCan.height - 10);
    templateLBCtx.stroke();

    // const templateLBCanFile = await toBlobPromise(templateLBCan);

    const invObserver = new MutationObserver(() => {
        if (swapInventoryItem('Blueprint Scanner')) {
            invObserver.disconnect();
            runSetupBp(2);
        }
    });
    const rObserver = new MutationObserver(() => {
        if (document.querySelector('#pui').textContent !== '') {
            rObserver.disconnect();
            runSetupBp(3);
        }
    });

    function runSetupBp(stage = 1) {
        while (setupBox.childNodes.length) setupBox.lastChild.remove();
        setupBox.classList.add('active');

        if (stage === 1) {
            if (swapInventoryItem('Blueprint Scanner')) runSetupBp(2);
            else {
                setupBox.append(...generateSetupContent('Grab a Blueprint Scanner', '/img/item/scanner_blueprint.png', 'Cancel', () => { setupBox.classList.remove('active'); stopSetupBp(); }));
                invObserver.disconnect();
                invObserver.observe(document.querySelector('#item-ui-container'), { childList: true, subtree: true });
            }
        }
        if (stage === 2) {
            if (document.querySelector('#pui').textContent !== '') runSetupBp(3);
            else {
                setupBox.append(...generateSetupContent('Click R to open the Scanner menu', '/img/item/scanner_blueprint.png', 'Cancel', () => { setupBox.classList.remove('active'); stopSetupBp(); }));
                rObserver.observe(document.querySelector('#pui'), { childList: true, subtree: true });
            }
        }
        if (stage === 3) {
            const textareaBP = document.querySelector('#pui textarea');
            if (!textareaBP) return info('Something went wrong, try again.', false);
            if (textareaBP.value !== holoBP) {
                textareaBP.value = holoBP;
                textareaBP.dispatchEvent(new Event('input'));
            }
            setTimeout(() => {
                if (document.querySelector('#pui').style.display !== 'none') document.querySelector('#pui .close button').click();
            }, 500);
            setupBox.append(...generateSetupContent('Place blueprint multiple times at correct position, arrow points at bottom-left corner. Find errors works only with 2 times place!', '/img/item/scanner_blueprint.png', 'Done', () => {
                setupBox.classList.remove('active');
                stopSetupBp();
                removeLastTexture();
                showAllBtn.classList.remove('selected');
                showAllBtn.click();
                refreshTXT();
            }));
            const fileLBindex = XpartsToDivideInto * (YpartsToDivideInto - 1);
            uploadTextures([templateLBCan, fileLBindex]);
        }
    }

    function stopSetupBp() {
        invObserver.disconnect();
        rObserver.disconnect();
    }

    // setup holo for user process
    // stage 1: just display what and where place blocks
    function runSetupLeg() {
        while (setupBox.childNodes.length) setupBox.lastChild.remove();
        setupBox.classList.add('active');

        const hGuide = document.createElement('h3');
        hGuide.textContent = 'Legacy Setup';

        const pGuide = document.createElement('p');
        pGuide.textContent = `Input coordinates (click / to find them) of bottom-left corner of Painting, then place correct blocks as shown below.`;

        const coordsInputBox = document.createElement('div');
        const coordsInputX = document.createElement('input');
        const coordsInputY = document.createElement('input');
        coordsInputX.type = 'number';
        coordsInputY.type = 'number';
        coordsInputX.placeholder = 1;
        coordsInputY.placeholder = 1;
        coordsInputX.min = 0;
        coordsInputY.min = 0;
        coordsInputX.max = 80;
        coordsInputY.max = 80;

        coordsInputX.oninput = () => { uppdateTable(); };
        coordsInputY.oninput = () => { uppdateTable(); };

        const coordsOkButton = document.createElement('button');
        coordsOkButton.textContent = 'Placed!';
        coordsOkButton.onclick = () => {
            setupBox.classList.remove('active');
        };
        coordsInputBox.append(coordsInputX, coordsInputY, coordsOkButton);

        const table = document.createElement('div');
        table.id = 'blocksTable';
        table.style.setProperty('--tableX', xSizes.length);

        let IDcounter = 0;
        for (const y of ySizes) {
            const row = document.createElement('div');
            for (const x of xSizes) {
                const cell = document.createElement('div');
                cell.setAttribute('data-coords', `${x},${y - 1}`);
                const cellImg = document.createElement('img');
                let imgSrc = `img/${holoItems[1][IDcounter % holoItems[1].length][1]}`;
                if (imgSrc === 'img/item_hatch_bg.png') imgSrc = chrome.runtime.getURL('/img/hatch.png');
                cellImg.src = imgSrc;
                cellImg.alt = imgSrc;
                cellImg.title = imgSrc;
                cell.appendChild(cellImg);
                row.appendChild(cell);
                IDcounter++;
            }
            table.appendChild(row);
        }
        if (IDcounter > holoItems[1].length) info('Warning, too few blocks for too many regions. The same image parts will repeat. Keep track of selected region.', false);

        setupBox.append(hGuide, pGuide, coordsInputBox, table);

        uppdateTable();

        function uppdateTable() {
            const inputX = coordsInputX.value === '' ? 1 : parseInt(coordsInputX.value);
            const inputY = coordsInputY.value === '' ? 1 : parseInt(coordsInputY.value);
            const x = Math.max(0, Math.min(80, inputX));
            const y = Math.max(0, Math.min(80, inputY));

            const tableCells = document.querySelectorAll('#blocksTable div div');

            let counter = 0;
            for (const yC of yCenters) {
                for (const xC of xCenters) {
                    const cell = tableCells[counter % tableCells.length];
                    const newX = x + xC;
                    const newY = can.height - (y + yC) + 1;
                    cell.setAttribute('data-coords', `${newX}, ${newY}`);
                    counter++;
                }
            }
        }
    }

    function generateSetupContent(text, img, buttonText, buttonAction) {
        const hg = document.createElement('h3');
        hg.textContent = text;

        const ig = document.createElement('img');
        ig.onload = () => { ig.style.opacity = 1; };
        ig.src = img;

        const bg = document.createElement('button');
        bg.textContent = buttonText;
        bg.onclick = buttonAction;
        return [hg, ig, bg];
    }

    // Default region change
    // clearHolo();
}

// MARK: settings
function toggleSettingsUI() {
    while (settingsBox.childNodes.length) settingsBox.lastChild.remove();
    settingsBox.classList.add('active');
    mainMenu.classList.remove('active');
    const settingsHeader = document.createElement('h2');
    settingsHeader.textContent = 'Settings';
    settingsBox.append(settingsHeader);

    // close button
    settingsBox.appendChild(generateCloseButton(dialogBox));

    // custom textures
    const customTexturesDiv = document.createElement('div');
    const customTexturesP = document.createElement('p');
    customTexturesP.textContent = 'Texture pack to insert when disabling Holo';
    const customTexturesLabel = document.createElement('p');
    customTexturesLabel.textContent = 'Current: None';
    chrome.storage.local.get('DA_txt', (res) => {
        if (res.DA_txt) customTexturesLabel.textContent = `Current: ${res.DA_txt}`;
    });
    const customTexturesInput = document.createElement('input');
    customTexturesInput.type = 'file';
    customTexturesInput.id = 'da-holoTXT';
    customTexturesInput.accept = 'application/x-zip-compressed';

    const customTexturesUpload = document.createElement('label');
    customTexturesUpload.classList.add('da-btn');
    customTexturesUpload.textContent = 'Insert zip';
    customTexturesUpload.setAttribute('for', 'da-holoTXT');
    const customTexturesRemove = document.createElement('button');
    customTexturesRemove.textContent = 'Remove current';

    customTexturesInput.onchange = function () {
        if (this.files[0].type !== 'application/x-zip-compressed') return info('That is not a zip file.', false);
        openDB().then((db) => {
            const zip = new File([this.files[0]], this.files[0].name, {
                type: this.files[0].type,
                lastModified: this.files[0].lastModified,
            });
            saveFile(db, zip).then(() => {
                info('Successfully changed your default texture!');
                customTexturesLabel.textContent = `Current: ${this.files[0].name}`;
                chrome.storage.local.set({ DA_txt: this.files[0].name });
            });
        });
    };

    customTexturesRemove.onclick = () => {
        chrome.storage.local.get('DA_txt', (res) => {
            if (!res.DA_txt) return info('You do not have any default texture.', false);
            openDB().then((db) => {
                clearFiles(db).then(() => {
                    info('Successfully removed your default texture!');
                    customTexturesLabel.textContent = 'Current: None';
                    chrome.storage.local.remove('DA_txt');
                });
            });
        });
    };

    customTexturesDiv.append(customTexturesP, customTexturesLabel, customTexturesInput, customTexturesUpload, customTexturesRemove);
    settingsBox.appendChild(customTexturesDiv);

    // region threshold
    const regionThresholdLabel = document.createElement('label');
    const regionThresholdInput = document.createElement('input');
    regionThresholdInput.type = 'number';
    regionThresholdInput.min = 5;
    regionThresholdInput.max = 100;
    regionThresholdInput.value = 30;
    regionThresholdInput.placeholder = 30;
    chrome.storage.sync.get('DA_threshold', (res) => {
        if (res.DA_threshold) regionThresholdInput.value = res.DA_threshold;
    });
    regionThresholdInput.oninput = () => { a = regionThresholdInput.value; };
    regionThresholdLabel.textContent = 'Maximum region size: ';
    regionThresholdLabel.append(regionThresholdInput);
    settingsBox.append(regionThresholdLabel);

    regionThresholdInput.onchange = () => {
        const value = parseInt(regionThresholdInput.value);
        if (value < 5 || value > 100) {
            regionThresholdInput.value = 30;
            return info('Threshold must be between 5 and 100', false);
        }
        chrome.storage.sync.set({ DA_threshold: value });
        info('Threshold changed. Changes will apply for next inserted painting.');
    };

    // const defaultHoloModeLabel = document.createElement('label');
    // const defaultHoloModeInput = document.createElement('input');
    // defaultHoloModeInput.type = 'checkbox';
    // defaultHoloModeInput.checked = false;
    // defaultHoloModeLabel.textContent = 'Default Holo Mode:';
    // defaultHoloModeLabel.append(defaultHoloModeInput);
    // settings.append(defaultHoloModeLabel);

    // TODO: HOLO ITEMS CHOICE

    // restore default
    const restoreDefault = document.createElement('button');
    restoreDefault.textContent = 'Restore default settings';
    restoreDefault.onclick = () => {
        chrome.storage.local.remove('DA_txt');
        chrome.storage.sync.remove('DA_threshold');
        chrome.storage.sync.remove('DA_holoMode');
        info('Settings restored to default.');
        toggleSettingsUI();
    };

    settingsBox.append(restoreDefault);
}

// MARK: guide
function toggleGuideUI() {
    while (dialogBox.childNodes.length) dialogBox.lastChild.remove();
    mainMenu.classList.remove('active');
    dialogBox.classList.add('active');
    const settingsHeader = document.createElement('h2');
    settingsHeader.textContent = 'DredArt Guide';
    dialogBox.append(settingsHeader);

    dialogBox.appendChild(generateCloseButton(dialogBox));

    // const pVideo = document.createElement('p');
    // pVideo.textContent = 'Video guide coming soon :D';
    // const videoLink = document.createElement('p');
    // videoLink.textContent = 'coming soon :D';

    const pText = document.createElement('p');
    pText.textContent = 'More comprehensive guide coming soon. Here are some tips to get you started:';
    dialogBox.append(settingsHeader, pText);

    const listArray = [
        'If you didnt already, generate image in Designer and save it',
        'Click Paint and insert image',
        'Choose holo mode: blueprint or legacy with block. BP is much more recommended',
        'Follow the instructions at setup',
        'Start painting!',
        'You can paint one region at time, you can change current one by clicking on region selector in the middle',
        'Show all colors to see all colors on Holo as text',
        'Find errors to see only correct tiles as one shade of grey. That way you can find mistakes easier',
        'For the most efficient painting, use single color at time',
        'IF SOMETHING IS NOT WORKING, USE REFRESH BUTTON IN RIGHT TOP CORNER!!!',
    ];

    const OL = document.createElement('OL');
    listArray.forEach((e) => {
        const li = document.createElement('li');
        li.textContent = e;
        OL.appendChild(li);
    });

    dialogBox.appendChild(OL);
}

function generateCloseButton(box) {
    const closeButton = document.createElement('i');
    closeButton.classList.add('fas', 'fa-times', 'close');
    closeButton.onclick = () => {
        box.classList.remove('active');
        mainMenu.classList.add('active');
    };
    return closeButton;
}

// Inserting blueprint into UI
function swapInventoryItem(item) {
    const itemsHeld = document.querySelectorAll('#item-ui-inv h3');
    if (!itemsHeld) return false;
    if (itemsHeld.length === 0) return false;
    const searched = [...itemsHeld].filter((n) => n.textContent === item);
    if (searched.length === 0) return false;
    searched[0].parentElement.parentElement.click();
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

function canToStr(canStr, dataCan) { // converts pixel art into base2048 string
    let imgStr = `${canStr.width},${canStr.height},`;
    const imgArray = [];
    for (let y = 0; y < canStr.height; y++) {
        for (let x = 0; x < canStr.width; x++) {
            const i = (x + y * canStr.width) * 4;
            const cID = findIndex([dataCan[i], dataCan[i + 1], dataCan[i + 2]]);
            imgArray.push(cID);
        }
    }
    const compressedImg = encodePix(imgArray);
    imgStr += compressedImg;
    return imgStr;
}

function strToCan(imgStr) {
    try {
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
            const colorID = rgb[imgArray[dataIndex]];
            ctx.fillStyle = `rgb(${colorID[0]}, ${colorID[1]}, ${colorID[2]})`;
            ctx.fillRect(x, y, 1, 1);
            dataIndex++;
            if (x >= width - 1) {
                x = 0;
                y++;
            } else x++;
        }
        if (x !== 0) throw new Error('Image Package not complete');
        return canStr;
    } catch (error) {
        info('Something went wrong when loading image data.', false);
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
    for (const yCoord of yC) {
        for (const xCoord of xC) {
            buildCommands.push(144, 0, ...generateTag(xCoord), ...generateTag(height - yCoord - 1), ...generateTag(holoItems[0][iCount % holoItems[0].length][0]), 145);
            iCount++;
        }
    }
    if (iCount > holoItems[0].length) info('Warning, too few items for too many regions. The same image parts will repeat. Keep track of selected region.', false);
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

// let db;
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
            const db = event.target.result;
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore('holoTXT', { keyPath: 'fileName' });
        };
    });
}

function saveFile(db, file) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['holoTXT'], 'readwrite');
        const store = transaction.objectStore('holoTXT');
        const request = store.put({ fileName: file.name, file });

        request.onerror = () => {
            reject(new Error('Error saving file to IndexedDB'));
        };

        request.onsuccess = () => {
            resolve('File saved successfully');
        };
    });
}

function clearFiles(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['holoTXT'], 'readwrite');
        const store = transaction.objectStore('holoTXT');
        const request = store.clear();

        request.onerror = () => {
            reject(new Error('Error removing files from IndexedDB'));
        };

        request.onsuccess = () => {
            resolve('Files removed successfully');
        };
    });
}

//  Message of the update
function displayMOTU() {
    if (document.getElementById('da-motu')) return;
    chrome.storage.sync.set({ DA_version: version });
    notificationBlob.classList.remove('new');
    const updateMessage = [
        'Welcome to DredArt 2.0!',
        'After long time of waiting, we are finally in new era of painting!',
        'Now you can paint even faster and more reliable than ever!',
        'This version finally works and brings a lot of new features and improvements like:',
        '- Blueprint Holo',
        '- Refreshed design',
        '- Better performance',
        '- Painting history... And more!',
        'Next usefull features are already in development!',
        '=',
        'I finally got enough free time to finish this project, at least the extension.',
        'The old "render" part is still in development, but I hope to finish it in few months.',
        'When it\'s all finished, DredArt will concist of these modules:',
        '- Painter - this extension',
        '- Designer - standalone pixelart convertor',
        '- Editor - pixelart editor build into Designer',
        '- BlueArt - clean blueprint art creator',
        '- Pocket - compact version of Painter',
        'I hope you will enjoy this release! Stay tuned for more updates!',
        'You can find out more and hang out with me on (my discord)[https://discord.gg/8Zv7zjJ]',
        'On that server we will also finally finish the MOSAIC project',
        'I am Shrek [kapixar], the creator of DredArt',
    ];
    const motu = document.createElement('div');
    motu.id = 'da-motu';
    const motuH = document.createElement('h2');
    [motuH.textContent] = updateMessage;
    motu.append(motuH);
    for (const line of updateMessage.slice(1).slice(0, -1)) {
        const motuLine = document.createElement(line[0] === '-' ? 'li' : line[0] === '=' ? 'hr' : 'p');
        // if has link, make it clickable
        if (line.includes('discord.gg')) {
            const [before] = line.split('(my discord)');
            motuLine.textContent = before;
            const link = document.createElement('a');
            link.href = 'https://discord.gg/8Zv7zjJ';
            link.textContent = 'my discord';
            motuLine.append(link);
        } else motuLine.textContent = line[0] === '-' ? line.substring(2) : line;
        motu.append(motuLine);
    }
    document.body.append(motu);

    const sign = document.createElement('i');
    sign.textContent = updateMessage[updateMessage.length - 1];
    motu.append(sign);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.onclick = () => { motu.remove(); };
    motu.append(closeButton);
}

const notificationBlob = document.createElement('i');
notificationBlob.classList.add('fas', 'fa-bell', 'notificationBlob');
chrome.storage.sync.get('DA_version', (data) => {
    if (!data.DA_version || data.DA_version !== version) notificationBlob.classList.add('new');
});
notificationBlob.onclick = () => { displayMOTU(); };
title.append(notificationBlob);
