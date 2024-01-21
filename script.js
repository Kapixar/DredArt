// Top bar buttons
const start = document.createElement('a');
const topBar = document.querySelector('#top-bar span');
// const game = document.getElementById('big-ui-container');
start.onclick = () => {
    const t = document.getElementById('paint-tool');
    if (t) t.classList.toggle('hidden');
    else renderTool();
};
start.innerHTML = '<i class=\'fas big-icon fa-palette\'></i><div class=\'tooltip tooltip-low dark\'>DredArt</div>';

const holoOff = document.createElement('a');
holoOff.onclick = () => { removeHolo(); };
holoOff.innerHTML = '<i class=\'fas big-icon fa-times-circle\'></i><div class=\'tooltip tooltip-low dark\'>Disable Holo</div>';

const refresh = document.createElement('a');
refresh.onclick = () => { refreshTXT(); };
refresh.innerHTML = '<i class=\'fas big-icon fa-redo\'></i><div class=\'tooltip tooltip-low dark\'>Refresh</div>';

topBar.append(start, holoOff, refresh);

function renderTool() {
    const rgb = [[222, 165, 164], [214, 145, 136], [173, 111, 105], [128, 64, 64], [77, 0, 0], [77, 25, 0], [128, 0, 0], [144, 30, 30], [186, 1, 1], [179, 54, 54], [179, 95, 54], [255, 0, 0], [216, 124, 99], [255, 64, 64], [255, 128, 128], [255, 195, 192], [195, 153, 83], [128, 85, 64], [128, 106, 64], [77, 51, 38], [77, 51, 0], [128, 42, 0], [155, 71, 3], [153, 101, 21], [213, 70, 0], [218, 99, 4], [255, 85, 0], [237, 145, 33], [255, 179, 31], [255, 128, 64], [255, 170, 128], [255, 212, 128], [181, 179, 92], [77, 64, 38], [77, 77, 0], [128, 85, 0], [179, 128, 7], [183, 162, 20], [179, 137, 54], [238, 230, 0], [255, 170, 0], [255, 204, 0], [255, 255, 0], [255, 191, 64], [255, 255, 64], [223, 190, 111], [255, 255, 128], [234, 218, 184], [199, 205, 144], [128, 128, 64], [77, 77, 38], [64, 77, 38], [128, 128, 0], [101, 114, 32], [141, 182, 0], [165, 203, 12], [179, 179, 54], [191, 201, 33], [206, 255, 0], [170, 255, 0], [191, 255, 64], [213, 255, 128], [248, 249, 156], [253, 254, 184], [135, 169, 107], [106, 128, 64], [85, 128, 64], [51, 77, 38], [51, 77, 0], [67, 106, 13], [85, 128, 0], [42, 128, 0], [103, 167, 18], [132, 222, 2], [137, 179, 54], [95, 179, 54], [85, 255, 0], [128, 255, 64], [170, 255, 128], [210, 248, 176], [143, 188, 143], [103, 146, 103], [64, 128, 64], [38, 77, 38], [25, 77, 0], [0, 77, 0], [0, 128, 0], [34, 139, 34], [3, 192, 60], [70, 203, 24], [54, 179, 54], [54, 179, 95], [0, 255, 0], [64, 255, 64], [119, 221, 119], [128, 255, 128], [64, 128, 85], [64, 128, 106], [38, 77, 51], [0, 77, 26], [0, 77, 51], [0, 128, 43], [23, 114, 69], [0, 171, 102], [28, 172, 120], [11, 218, 81], [0, 255, 85], [80, 200, 120], [64, 255, 128], [128, 255, 170], [128, 255, 212], [168, 227, 189], [110, 174, 161], [64, 128, 128], [38, 77, 64], [38, 77, 77], [0, 77, 77], [0, 128, 85], [0, 166, 147], [0, 204, 153], [0, 204, 204], [54, 179, 137], [54, 179, 179], [0, 255, 170], [0, 255, 255], [64, 255, 191], [64, 255, 255], [128, 255, 255], [133, 196, 204], [93, 138, 168], [64, 106, 128], [38, 64, 77], [0, 51, 77], [0, 128, 128], [0, 85, 128], [0, 114, 187], [8, 146, 208], [54, 137, 179], [33, 171, 205], [0, 170, 255], [100, 204, 219], [64, 191, 255], [128, 212, 255], [175, 238, 238], [64, 85, 128], [38, 51, 77], [0, 26, 77], [0, 43, 128], [0, 47, 167], [54, 95, 179], [40, 106, 205], [0, 127, 255], [0, 85, 255], [49, 140, 231], [73, 151, 208], [64, 128, 255], [113, 166, 210], [100, 149, 237], [128, 170, 255], [182, 209, 234], [146, 161, 207], [64, 64, 128], [38, 38, 77], [0, 0, 77], [25, 0, 77], [0, 0, 128], [42, 0, 128], [0, 0, 205], [54, 54, 179], [95, 54, 179], [0, 0, 255], [28, 28, 240], [106, 90, 205], [64, 64, 255], [133, 129, 217], [128, 128, 255], [177, 156, 217], [150, 123, 182], [120, 81, 169], [85, 64, 128], [106, 64, 128], [51, 38, 77], [51, 0, 77], [85, 0, 128], [137, 54, 179], [85, 0, 255], [138, 43, 226], [167, 107, 207], [127, 64, 255], [191, 64, 255], [148, 87, 235], [170, 128, 255], [153, 85, 187], [140, 100, 149], [128, 64, 128], [64, 38, 77], [77, 38, 77], [77, 0, 77], [128, 0, 128], [159, 0, 197], [179, 54, 179], [184, 12, 227], [170, 0, 255], [255, 0, 255], [255, 64, 255], [213, 128, 255], [255, 128, 255], [241, 167, 254], [128, 64, 106], [105, 45, 84], [77, 38, 64], [77, 0, 51], [128, 0, 85], [162, 0, 109], [179, 54, 137], [202, 31, 123], [255, 0, 170], [255, 29, 206], [233, 54, 167], [207, 107, 169], [255, 64, 191], [218, 112, 214], [255, 128, 213], [230, 168, 215], [145, 95, 109], [128, 64, 85], [77, 38, 51], [77, 0, 25], [128, 0, 42], [215, 0, 64], [179, 54, 95], [255, 0, 127], [255, 0, 85], [255, 0, 40], [222, 49, 99], [208, 65, 126], [215, 59, 62], [255, 64, 127], [249, 90, 97], [255, 128, 170], [17, 17, 17], [34, 34, 34], [51, 51, 51], [68, 68, 68], [85, 85, 85], [102, 102, 102], [119, 119, 119], [136, 136, 136], [153, 153, 153], [170, 170, 170], [187, 187, 187], [204, 204, 204], [221, 221, 221], [238, 238, 238], [255, 255, 255]];
    const settings = { colorSpace: 'srgb' };
    const tool = document.createElement('div');
    tool.id = 'paint-tool';
    tool.classList.add('dark');
    tool.innerHTML = `
    <div id='tool-nav'>
        <button class='chosen'>Menu</button><button class='hidden'>Map</button><button class='hidden'>Holo</button><button class='hidden'>Settings</button><button id='help'>Help</button>
    </div>
    <div id='tool-content'>
        <div id='tool-menu'>
            <div><h3>DredArt | Creator</h3></div>
            <input type='file' accept='.png' id='pImg'><label for='pImg'>Use pixel art</label><div><span>Drag & Drop / Select Pixel Map from Render to paint it into the game.</span></div>
            <label id='nImg'>Create pixel art</label><div><span>Scale and convert pictures to game color pallete. <a target='_blank' href='https://kapixar.github.io/DredArt/'>Also online.</a></span></div>
            <label id='iMOSAIC'><a target='_blank' href='https://discord.gg/uNgD6vv67c'>Join MOSAIC</a></label><div><span>Contribute to the largest pixel art project! Join the Discord server and help us by sending image to paint!</span>
            </div>
            <div><p>DredArt v1.4 by I am Shrek</p></div>
        </div>
        <div id='tool-map'></div>
        <div id='tool-holo'></div>
        <div id='tool-settings'>
            <div>
                <button class='btn-green'>Apply Changes</button><button class='btn-red'>Restore Default</button>
            </div>
            <div id='textureSetting'>
                <p>Upload textures inserted with Disable Holo button</p>
                <p id='labelTexture'>Current: None</p>
                <label for="holoTXT" class='btn'>Insert zip</label>
                <input type="file" id="holoTXT" accept="application/x-zip-compressed">
                <button class='btn'>Remove current</button>
            </div>
            <div id='blockSetting'>
                <p>Choose which blocks you want to use for Holo</p>
                <div></div>
            </div>
            <div id='colorSetting'>
                <p>Choose color of Holo overlay</p>
                <label><input type='radio' name='settingColor' value='0' checked>Black</label>
                <label><input type='radio' name='settingColor' value='1'>White</label>
            </div>
            <div>
                <p><label><input type='checkbox' id='errorSetting'>Display Paint codes in Find errors?</label></p>
                <p><label><input type='checkbox' id='showSetting'>Add text outline in Show all?</label></p>
            </div>
            <div>
                <p><label><input type='checkbox' id='labelSetting'>Hide absent colors in chosen part?</label></p>
            </div>
            <div>
                <p>Set size threshold when Holo splits to parts (Holo doesn't split, unless dimensions went above threshold)</p>
                Width: <input type='number' id='thresholdX' value='32'>
                Height: <input type='number' id='thresholdY' value='32'>
                <p></p>
            </div>
        </div>
    </div>
    <div id='tool-message' class='hidden'>
        <button>Close</button><div></div>
    </div>`;

    document.body.appendChild(tool);
    document.body.style.display = '';

    const nav = document.getElementById('tool-nav');
    const navChildren = nav.children;
    const content = document.getElementById('tool-content');
    const messageBox = document.getElementById('tool-message');
    const message = document.querySelector('#tool-message div');
    const map = document.getElementById('tool-map');
    const holo = document.getElementById('tool-holo');

    showSection(0);
    for (let i = 0; i < navChildren.length; i++) {
        navChildren[i].onclick = function () {
            showSection(i);
        };
    }

    sendUpdateMessage('1.4');

    // Create pixel art
    document.getElementById('nImg').onclick = function () { window.open(chrome.runtime.getURL('../render/index.html')); };

    // Help page
    document.getElementById('help').onclick = function () { window.open(chrome.runtime.getURL('../help.html')); };

    // Button input
    document.getElementById('pImg').onchange = function () {
        if (this.files[0] == null) return info('Error. Chose file again.');
        validateImage(this.files[0]);
        this.value = null;
    };

    // Drop input
    tool.ondrop = function (e) {
        e.preventDefault();
        tool.classList.remove('highlight');

        if (e.dataTransfer.files) {
            if (e.dataTransfer.files.length === 1 && e.dataTransfer.files[0].type.includes('image')) validateImage(e.dataTransfer.files[0]);
        }
    };
    tool.ondragleave = (e) => {
        e.preventDefault();
        tool.classList.remove('highlight');
    };
    tool.ondragover = (e) => {
        e.preventDefault();
        tool.classList.add('highlight');
    };

    function validateImage(file) {
        localStorage.removeItem('tool-holo');

        if (file.length === null) return info('Error. Probably file is empty.');

        if (file.type !== 'image/png') return info('Error. File is not PNG. (Use DredArt | Render for pixel arts)');

        const img = new Image();
        const imgurl = URL.createObjectURL(file);
        img.src = imgurl;
        img.onload = function () {
            URL.revokeObjectURL(imgurl);
            if (this.width > 1600 || this.height > 1625) {
                return info('Too big image! It\'s not created with DredArt | Render!');
            }
            if (this.width < 20 || this.height < 45) {
                return info('Too small image! It\'s not created with DredArt | Render!');
            }
            const source = document.createElement('canvas');
            source.width = this.width / 20;
            source.height = (this.height - 25) / 20;
            const sourceCtx = source.getContext('2d', settings);
            sourceCtx.fillRect(0, 0, source.width, source.height);
            const sourceData = sourceCtx.getImageData(0, 0, source.width, source.height);
            const sData = sourceData.data;

            const scanner = document.createElement('canvas');
            scanner.width = this.width;
            scanner.height = this.height - 25;
            const scanCtx = scanner.getContext('2d', settings);
            scanCtx.drawImage(this, 0, 0);
            const sD = scanCtx.getImageData(0, 0, scanner.width, scanner.height).data;
            for (let y = 0; y < scanner.height; y += 20) {
                for (let x = 0; x < scanner.width; x += 20) {
                    const i = pxIndex(x, y, scanner.width);
                    if (findIndex([sD[i], sD[i + 1], sD[i + 2]]) === 256) return info('Image contains colors that don\'t exist in Dredark color pallete. Use DredArt|Render for pixel arts. (Or you dragged directly from the discord preview)');
                    if (sD[i + 3] !== 255) return info('Image contains transparency. No transparency is allowed. Use DredArt | Render for pixel arts.');
                    const j = pxIndex(x / 20, y / 20, source.width);
                    sData[j] = sD[i];
                    sData[j + 1] = sD[i + 1];
                    sData[j + 2] = sD[i + 2];
                }
            }
            sourceCtx.putImageData(sourceData, 0, 0);

            function pxIndex(x, y, w) {
                return (x + y * w) * 4;
            }

            // displaying info
            info();
            const desc = document.createElement('p');
            desc.classList.add('desc');
            desc.textContent = `${file.name.length > 15 ? `${file.name.substring(0, 14)}...` : file.name}, ${source.width} width x ${source.height} height`;

            const thumbnail = document.createElement('img');
            const thurl = source.toDataURL();
            thumbnail.src = thurl;
            thumbnail.onload = function () { URL.revokeObjectURL(thurl); };
            thumbnail.setAttribute('class', 'pixelart');

            const settingD = document.createElement('div');
            settingD.innerHTML = '<p>Coordinates for bottom-left corner of painting<br><input type=\'text\' placeholder=\'1\' id=\'cornerX\'> x <input type=\'text\' placeholder=\'1\' id=\'cornerY\'></p>';

            const rPix = document.createElement('button');
            rPix.textContent = 'Generate!';
            rPix.onclick = function () { renderPixelart(source, corner1.value, corner2.value); };

            message.append(desc, thumbnail, settingD, rPix);
            const corner1 = document.getElementById('cornerX');
            const corner2 = document.getElementById('cornerY');
            setInputFilter(corner1, corner2);
        };

        function renderPixelart(source, c1, c2) {
            nav.classList.remove('hidden');
            content.classList.remove('hidden');
            messageBox.classList.add('hidden');
            for (let i = 0; i < navChildren.length; i++) navChildren[i].classList.remove('hidden');
            refresh.classList.add('expanded');

            // settings setup
            let settObj;
            try {
                settObj = JSON.parse(localStorage.getItem('holoInfo'));
                if (Object.keys(settObj).length !== 7) {
                    settObj = {
                        blocks: '0324',
                        holoColor: 0,
                        error: 0,
                        showAll: 0,
                        label: 1,
                        thrX: 32,
                        thrY: 32,
                    };
                }
            } catch {
                settObj = {
                    blocks: '0324',
                    holoColor: 0,
                    error: 0,
                    showAll: 0,
                    label: 1,
                    thrX: 32,
                    thrY: 32,
                };
            }

            const availableBlocksDesc = ['Cargo Hatch', 'Safety Anchor', 'Sign', 'Sign Hover', 'Sign Near'];
            const availableBlocksSrc = [chrome.runtime.getURL('img/hatch.png'), 'img/anchor.png', 'img/sign.png', 'img/sign_hover.png', 'img/sign_near.png'];
            const availableBlocksGame = ['item_hatch_bg.png', 'anchor.png', 'sign.png', 'sign_hover.png', 'sign_near.png'];
            const usedBlocksSrc = [];
            const usedBlocksGame = [];
            const sett = document.querySelector('#blockSetting > div');
            sett.textContent = '';
            const labelTexture = document.querySelector('#tool-settings #labelTexture');
            const settingColor = document.querySelectorAll('#tool-settings [name=\'settingColor\']');
            const errorSetting = document.querySelector('#tool-settings #errorSetting');
            const showSetting = document.querySelector('#tool-settings #showSetting');
            const labelSetting = document.querySelector('#tool-settings #labelSetting');
            const thresholdSettingX = document.querySelector('#tool-settings #thresholdX');
            const thresholdSettingY = document.querySelector('#tool-settings #thresholdY');

            openDB().then(() => {
                retrieveFile('tool_txt.zip').then((TxtFile) => {
                    if (!TxtFile) labelTexture.textContent = 'Current: None';
                    else labelTexture.textContent = `Current: ${TxtFile.name}`;
                });
            });

            for (let i = 0; i < 4; i += 1) {
                const blockSelect = document.createElement('select');
                const defaultBlock = parseInt(settObj.blocks.slice(i, i + 1));
                for (let o = 0; o < availableBlocksDesc.length; o += 1) {
                    const blockOption = document.createElement('option');
                    blockOption.textContent = availableBlocksDesc[o];
                    blockOption.value = o;
                    if (defaultBlock === o) {
                        blockOption.selected = true;
                        blockSelect.setAttribute('last', o);
                        usedBlocksSrc.push(availableBlocksSrc[o]);
                        usedBlocksGame.push(availableBlocksGame[o]);
                    }
                    blockSelect.appendChild(blockOption);
                }
                blockSelect.addEventListener('change', () => {
                    const real = document.querySelectorAll('#blockSetting select');
                    for (const e of real) {
                        if (e === blockSelect || e.value !== blockSelect.value) continue;
                        e.value = blockSelect.getAttribute('last');
                        e.setAttribute('last', blockSelect.getAttribute('last'));
                    }
                    blockSelect.setAttribute('last', blockSelect.value);
                });
                sett.appendChild(blockSelect);
            }

            settingColor[settObj.holoColor].checked = true;
            errorSetting.checked = settObj.error;
            showSetting.checked = settObj.showAll;
            labelSetting.checked = settObj.label;
            thresholdSettingX.value = settObj.thrX;
            thresholdSettingY.value = settObj.thrY;

            if (labelSetting.checked) holo.classList.add('hideLabels');
            else holo.classList.remove('hideLabels');

            document.querySelector('#tool-settings button:first-of-type').onclick = function () {
                let cornerSetting = '';
                for (const e of document.querySelectorAll('#tool-settings select')) cornerSetting += e.value;
                const actualObj = {
                    blocks: cornerSetting,
                    holoColor: parseInt(document.querySelector('input[name="settingColor"]:checked').value),
                    error: errorSetting.checked ? 1 : 0,
                    showAll: showSetting.checked ? 1 : 0,
                    label: labelSetting.checked ? 1 : 0,
                    thrX: thresholdSettingX.value ? thresholdSettingX.value : 32,
                    thrY: thresholdSettingY.value ? thresholdSettingY.value : 32,
                };
                localStorage.setItem('holoInfo', JSON.stringify(actualObj));
                renderPixelart(source, c1, c2);
            };
            document.querySelector('#tool-settings button:nth-of-type(2)').onclick = function () {
                localStorage.setItem('holoInfo', 'true');
                renderPixelart(source, c1, c2);
            };

            document.querySelector('#tool-settings #holoTXT').onchange = function () {
                if (this.files[0].type !== 'application/x-zip-compressed') return info('That is not an zip file.');
                openDB().then(() => {
                    const zip = new File([this.files[0]], 'tool_txt.zip', {
                        type: this.files[0].type,
                        lastModified: this.files[0].lastModified,
                    });
                    saveFile(zip).then(() => {
                        info('Successfully changed your default assets!');
                        labelTexture.textContent = `Current: ${this.files[0].name}`;
                        localStorage.setItem('tool-txt', 'true');
                    });
                });
            };

            document.querySelector('#tool-settings #holoTXT + button').onclick = function () {
                openDB().then(() => {
                    clearFiles().then(() => {
                        info('Successfully removed your default assets!');
                        labelTexture.textContent = 'Current: None';
                        localStorage.removeItem('tool-txt');
                    });
                });
            };

            // image in 1:1 scale
            const can = document.createElement('canvas');
            can.width = source.width;
            can.height = source.height;
            const ctx = can.getContext('2d', { willReadFrequently: true, colorSpace: 'srgb' });
            ctx.fillStyle = 'rgb(187,187,187)';
            ctx.drawImage(source, 0, 0);
            const { data } = ctx.getImageData(0, 0, can.width, can.height);

            // current color mode selected
            const currentCan = document.createElement('canvas');
            currentCan.width = source.width * 40;
            currentCan.height = source.height * 40;
            const currentCtx = currentCan.getContext('2d', { willReadFrequently: true });
            currentCtx.imageSmoothingEnabled = false;

            // map creation

            showSection(2);
            const corner = [1, 0];

            if (c1 !== '' && c1 !== '-') corner[0] = parseInt(c1);
            if (c2 !== '' && c2 !== '-') corner[1] = parseInt(c2) - 1;
            document.querySelector('div button').click();

            map.textContent = '';
            holo.textContent = '';

            const mapHelp = document.createElement('div');
            mapHelp.classList.add('toolHelp', 'rolled');
            mapHelp.onclick = function () { this.classList.toggle('rolled'); };
            mapHelp.textContent = 'Scroll to move. Double click to hide other colors. To quickly scroll horizontaly use SHIFT + SCROLL';

            const table = document.createElement('table');
            const tbox = document.createElement('div');
            tbox.id = 'tbox';

            const borderX = settObj.thrX < can.width ? Math.ceil(can.width / 2) : can.width;
            const borderY = settObj.thrY < can.height ? Math.ceil(can.height / 2) : can.height;

            const imgColors = {};
            for (let i = 0; i < 255; i++) {
                const gc = i.toString(16).padStart(2, '0').toUpperCase();
                imgColors[gc] = {
                    0: 0, 1: 0, 2: 0, 3: 0, sum: 0,
                };
            }
            for (let i = 0; i < can.height; i++) {
                const row = document.createElement('tr');
                for (let o = 0; o < can.width; o++) {
                    const c = ctx.getImageData(o, i, 1, 1).data;
                    const td = document.createElement('td');
                    td.style['background-color'] = `rgb(${c[0]},${c[1]},${c[2]})`;
                    td.setAttribute('data-xy', `${(corner[0] + o)},${(can.height - i + corner[1])}`);
                    const gc = findIndex([c[0], c[1], c[2]]).toString(16).padStart(2, '0').toUpperCase();
                    td.textContent = gc;

                    const radarPart = (o < borderX ? 0 : 1) + (i < borderY ? 0 : 2);

                    imgColors[gc][radarPart]++;
                    imgColors[gc].sum++;

                    td.ondblclick = function () { showOnly(gc); };
                    row.appendChild(td);
                }
                table.appendChild(row);
            }
            tbox.appendChild(table);
            map.append(mapHelp, tbox);

            // creating holo

            if (can.width < 7 || can.height < 7) {
                return info('Holo available only for images bigger than 7x7. Use map tab.');
            }

            if (localStorage.getItem('holoInfo') === null) {
                info();
                const warnheader = document.createElement('h3');
                warnheader.textContent = 'Warning!';
                warnheader.style['background-color'] = 'red';
                const parag1 = document.createElement('h3');
                parag1.textContent = 'Hologram overwrites these textures: signs, item_hatch_bg, item_hatch, bg_ship, tiles_subworld, tiles_overworld, bg_gradient.';
                const parag2 = document.createElement('h3');
                parag2.textContent = 'To remove Hologram click X in top bar.';
                parag2.style.color = 'red';
                const parag3 = document.createElement('h3');
                parag3.style['background-color'] = 'red';
                parag3.textContent = 'Note that after rendering colors around 80 times screen may become grey. This is due to broswers limitations. Refreshing page solves problem.';

                const dontShow = document.createElement('input');
                dontShow.type = 'checkbox';
                dontShow.id = 'dontShow';
                dontShow.onclick = function () {
                    localStorage.setItem('holoInfo', this.checked);
                };
                const dontShowL = document.createElement('label');
                dontShowL.setAttribute('for', 'dontShow');
                dontShowL.textContent = 'Don\'t show again';

                message.append(warnheader, parag1, parag2, parag3, dontShow, dontShowL);
            }

            // white and empty canvas for bg ship and not used items
            const wcan = document.createElement('canvas');
            wcan.width = 64;
            wcan.height = 64;
            wcan.getContext('2d').fillStyle = 'white';
            wcan.getContext('2d').fillRect(0, 0, 64, 64);
            const ecan = document.createElement('canvas');
            ecan.width = 10;
            ecan.height = 10;

            // dividing ship
            corner[0]--;
            const blocksX = can.width > settObj.thrX;
            const blocksY = can.height > settObj.thrY;

            let width1 = blocksX ? Math.ceil(can.width / 2) : can.width;
            let height1 = blocksY ? Math.ceil(can.height / 2) : can.height;

            let width2 = can.width - width1;
            let height2 = can.height - height1;
            const x1 = Math.ceil(Math.floor(width1 / 2) + 0.5) + corner[0];
            const y1 = can.height - Math.ceil(Math.floor(height1 / 2) + 0.5) + corner[1] + 1;
            const y2 = can.height - height1 - Math.ceil(Math.floor(height2 / 2) + 0.5) + corner[1] + 1;
            const x2 = width1 + Math.ceil(Math.floor(width2 / 2) + 0.5) + corner[0];

            // description help
            const descr = document.createElement('div');
            descr.classList.add('long');
            descr.innerHTML = '<p>Visit the Help tab to learn how to use Holo.</p><p>In case Holo doesn\'t load: Fly directly over the selected part block, zoom in and click Refresh. More problems? Visit Help.</p>';
            holo.appendChild(descr);

            // help number 1
            const help1 = document.createElement('div');
            help1.classList.add('long', 'coords');
            const coordsHelp = document.createElement('p');
            coordsHelp.textContent = 'Place these blocks on given coordinates.';

            const helpBlocks = document.createElement('div');

            const blocks = [usedBlocksSrc[0], blocksX ? usedBlocksSrc[1] : '', blocksY ? usedBlocksSrc[2] : '', blocksX && blocksY ? usedBlocksSrc[3] : ''];
            const blocksXY = [`${x1},${y1}`, `${x2},${y1}`, `${x1},${y2}`, `${x2},${y2}`];
            let blocksSum = 0;
            for (let i = 0; i < 4; i += 1) {
                if (blocks[i] === '') continue;
                blocksSum += i;
                const block = document.createElement('div');
                const blockI = document.createElement('img');
                blockI.src = blocks[i];
                blockI.setAttribute('alt', blocks[i]);
                blockI.setAttribute('draggable', false);
                const blockS = document.createElement('span');
                blockS.textContent = blocksXY[i];
                block.append(blockI);
                block.append(blockS);
                helpBlocks.append(block);
            }
            if (blocksSum === 2) helpBlocks.classList.add('tower');
            help1.append(coordsHelp, helpBlocks);
            holo.appendChild(help1);

            // rendering blending holo
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

            // rendering errors holo
            const errorCan = document.createElement('canvas');
            const errorCtx = errorCan.getContext('2d');
            errorCan.width = can.width * 40;
            errorCan.height = can.height * 40;
            errorCtx.imageSmoothingEnabled = false;
            errorCtx.drawImage(blendCan, 0, 0, errorCan.width, errorCan.height);
            if (settObj.error) {
                errorCtx.fillStyle = 'black';
                errorCtx.font = '13px monospace';
                for (let y = 0; y < can.height; y++) {
                    for (let x = 0; x < can.width; x++) {
                        const i = (x + y * can.width) * 4;
                        const t = findIndex([data[i], data[i + 1], data[i + 2]]).toString(16).padStart(2, '0').toUpperCase();
                        errorCtx.fillText(t, x * 40 + 2, y * 40 + 13);
                    }
                }
            }

            // rendering show all holo
            const allCan = document.createElement('canvas');
            const allCtx = allCan.getContext('2d');
            allCan.width = can.width * 40;
            allCan.height = can.height * 40;
            allCtx.imageSmoothingEnabled = false;
            allCtx.drawImage(blendCan, 0, 0, allCtx.width, allCtx.height);
            allCtx.fillStyle = 'rgb(153,153,153)';
            allCtx.font = 'bold 25px monospace';
            allCtx.shadowColor = 'black';
            if (settObj.showAll) allCtx.shadowBlur = 2;
            for (let y = 0; y < can.height; y++) {
                for (let x = 0; x < can.width; x++) {
                    const i = (x + y * can.width) * 4;
                    const t = findIndex([data[i], data[i + 1], data[i + 2]]).toString(16).padStart(2, '0').toUpperCase();
                    allCtx.fillStyle = `rgb(${data[i]},${data[i + 1]},${data[i + 2]})`;
                    allCtx.fillText(t, x * 40 + 5, y * 40 + 27);
                }
            }

            // creating subsitute Image
            const subCan = document.createElement('canvas');
            subCan.width = 40;
            subCan.height = 40;
            const subCtx = subCan.getContext('2d');
            subCtx.fillStyle = 'black';
            subCtx.fillRect(0, 0, 40, 40);
            subCtx.fillStyle = 'white';
            subCtx.font = '21px Sans';
            subCtx.fillText('Holo', 2, 17, 36);
            subCtx.fillText('Block', 2, 35, 36);

            // sticky box
            const stickyBox = document.createElement('div');
            stickyBox.classList.add('sticky', 'long');
            const stickyButtons = document.createElement('div');

            // help number 2
            const helpBubble = document.createElement('div');
            helpBubble.classList.add('toolHelp', 'rolled');
            helpBubble.onclick = function () { this.classList.toggle('rolled'); };
            const allHelp = document.createElement('p');
            const checkHelp = document.createElement('p');
            const coordHelp = document.createElement('p');
            const cornerHelp = document.createElement('p');
            const colorsHelp = document.createElement('p');
            allHelp.textContent = 'Show all - display unplaced paint as text AKA display map as Holo';
            checkHelp.textContent = 'Find errors - spot mistakes easier. Correct tiles turns grey';
            coordHelp.textContent = 'Get color - returns which color is on entered coordinates';
            cornerHelp.textContent = 'Corner Selector - select in which part of ship display Holo';
            colorsHelp.textContent = 'Particular color box - display Holo of it. Fill transparent holes with paint. Number in corners means its amount in chosen part.';
            helpBubble.append(allHelp, checkHelp, coordHelp, cornerHelp, colorsHelp);
            stickyBox.appendChild(helpBubble);

            // all colors button
            const allColors = document.createElement('div');
            allColors.textContent = 'Show all';
            allColors.id = 'allButton';
            allColors.setAttribute('title', 'Display every color on Holo as text');
            allColors.onclick = function () {
                if (!this.classList.contains('selected')) refreshCurrent(allCan);
                document.querySelectorAll('#tool-holo>div, #checkButton').forEach((e) => {
                    e.classList.remove('selected');
                });
                this.classList.add('selected');
            };
            stickyButtons.appendChild(allColors);

            // check button
            const check = document.createElement('div');
            check.textContent = 'Find errors';
            check.id = 'checkButton';
            check.setAttribute('title', 'Find mistakes easier. Only correct tiles turn grey.');
            check.onclick = function () {
                if (!this.classList.contains('selected')) refreshCurrent(errorCan);
                document.querySelectorAll('#tool-holo>div, #allButton').forEach((e) => {
                    e.classList.remove('selected');
                });
                this.classList.add('selected');
            };
            stickyButtons.appendChild(check);

            stickyBox.appendChild(stickyButtons);

            // color search
            const searchBox = document.createElement('div');
            searchBox.classList.add('search');
            const searchResult = document.createElement('div');
            const search1 = document.createElement('input');
            search1.setAttribute('placeholder', '1');
            search1.onkeyup = function () { searchForColor(); };
            const serachComma = document.createElement('span');
            serachComma.textContent = ',';
            const search2 = document.createElement('input');
            search2.setAttribute('placeholder', '1');
            search2.onkeyup = function () { searchForColor(); };

            function searchForColor() {
                if (search1.value.length < 1 || search2.value.length < 1) {
                    searchBox.style.background = '';
                    searchResult.textContent = '--';
                    return;
                }
                let c = document.querySelector(`#tbox td[data-xy='${search1.value},${search2.value}']`);
                if (c == null) {
                    searchBox.style.background = '';
                    searchResult.textContent = '--';
                    return;
                }
                c = c.textContent;
                searchResult.textContent = c;
                c = rgb[parseInt(c, 16)];
                searchBox.style.background = `rgb(${c[0]},${c[1]},${c[2]})`;
            }
            searchResult.textContent = 'Get color';
            searchBox.append(search1, serachComma, search2, searchResult);
            stickyBox.appendChild(searchBox);

            setInputFilter(search1, search2);

            // corner selector
            const cornerBox = document.createElement('div');
            cornerBox.classList.add('cornerBox');

            blocksSum = 0;
            for (let i = 0; i < 4; i += 1) {
                if (blocks[i] === '') continue;
                blocksSum += i;
                const cornerLabel = document.createElement('label');
                cornerLabel.setAttribute('for', `corner${i}`);
                const cornerInput = document.createElement('input');
                if (i === 0) cornerInput.checked = true;
                cornerInput.onchange = () => { selectPart(); };
                cornerInput.type = 'radio';
                cornerInput.name = 'corners';
                cornerInput.id = `corner${i}`;
                cornerInput.value = i;
                cornerBox.append(cornerInput, cornerLabel);
            }
            if (blocksSum === 2) cornerBox.classList.add('tower');
            if (blocksSum === 0) stickyBox.classList.add('simple');
            else stickyBox.appendChild(cornerBox);
            holo.appendChild(stickyBox);

            // make stickyBox float
            const stickyObserver = new IntersectionObserver(
                ([e]) => e.target.classList.toggle('pinned', e.intersectionRatio < 1),
                { threshold: [1] },
            );
            stickyObserver.observe(stickyBox);

            const sortBox = document.createElement('div');
            sortBox.classList.add('long', 'sort');
            const sortLabel = document.createElement('span');
            sortLabel.textContent = 'Sort by: ';

            const sortNameInput = document.createElement('input');
            sortNameInput.type = 'radio';
            sortNameInput.value = '0';
            sortNameInput.name = 'sortby';
            sortNameInput.id = 'sortbyname';
            sortNameInput.checked = true;
            sortNameInput.onclick = function () { sortBy(); };
            const sortNameLabel = document.createElement('label');
            sortNameLabel.textContent = 'Name';
            sortNameLabel.setAttribute('for', 'sortbyname');

            const sortAmountInput = document.createElement('input');
            sortAmountInput.type = 'radio';
            sortAmountInput.value = '1';
            sortAmountInput.name = 'sortby';
            sortAmountInput.id = 'sortbyamount';
            sortAmountInput.onclick = function () { sortBy(); };
            const sortAmountLabel = document.createElement('label');
            sortAmountLabel.textContent = 'Amount';
            sortAmountLabel.setAttribute('for', 'sortbyamount');

            sortBox.append(sortLabel, sortNameInput, sortNameLabel, sortAmountInput, sortAmountLabel);
            holo.appendChild(sortBox);

            // rendering button for each color
            for (const c in imgColors) {
                if (imgColors[c].sum === 0) continue;
                const col = document.createElement('div');
                col.classList.add('colorLabel');

                col.textContent = c;
                col.setAttribute('amount', imgColors[c][0]);

                const cRGB = rgb[parseInt(c, 16)];
                col.onclick = function () {
                    if (!this.classList.contains('selected')) {
                        refreshCurrent(renderShadow(cRGB));
                    }
                    document.querySelectorAll('#tool-holo>div, #allButton, #checkButton').forEach((e) => {
                        e.classList.remove('selected');
                    });
                    this.classList.add('selected');
                };
                col.style['background-color'] = `rgb(${cRGB[0]},${cRGB[1]},${cRGB[2]})`;
                col.style['accent-color'] = `rgb(${cRGB[0]},${cRGB[1]},${cRGB[2]})`;
                holo.appendChild(col);
            }

            // rendering holo for each color (dynamically)
            const holoColor = settObj.holoColor ? 'white' : 'black';
            function renderShadow(c) {
                const shadowCan = document.createElement('canvas');
                shadowCan.width = can.width;
                shadowCan.height = can.height;
                const shadowCtx = shadowCan.getContext('2d');
                shadowCtx.fillStyle = holoColor;
                shadowCtx.fillRect(0, 0, shadowCan.width, shadowCan.height);
                const holoData = shadowCtx.getImageData(0, 0, shadowCan.width, shadowCan.height);
                const hData = holoData.data;
                for (let i = 0; i < data.length; i += 4) {
                    if (data[i] === c[0] && data[i + 1] === c[1] && data[i + 2] === c[2]) hData[i + 3] = 0;
                }
                shadowCtx.putImageData(holoData, 0, 0);
                return shadowCan;
            }

            // draw on canvas and display it
            function refreshCurrent(canvas) {
                currentCtx.clearRect(0, 0, currentCan.width, currentCan.height);
                currentCtx.drawImage(canvas, 0, 0, currentCan.width, currentCan.height);
                displayPart();
            }

            const colorLabels = document.querySelectorAll('.colorLabel');
            let oldPart = 4;
            let currentPart = 4;
            function selectPart() {
                const cornerSelector = document.querySelector('input[type=radio][name=corners]:checked');
                currentPart = cornerSelector ? parseInt(cornerSelector.value) : 0;
                if (currentPart === oldPart) return;

                oldPart = currentPart;
                for (let i = 0; i < 4; i += 1) if (currentPart !== i) uploadHolo(subCan, usedBlocksGame[i]);
                displayPart();
                for (const colorLabel of colorLabels) colorLabel.setAttribute('amount', imgColors[colorLabel.textContent][currentPart]);
                sortBy();
            }

            // display the part of Holo
            async function displayPart() {
                if (localStorage.getItem('tool-holo') !== 't') {
                    uploadHolo(wcan, 'bg_ship.png');
                    uploadHolo(ecan, 'tiles_subworld.png');
                    uploadHolo(ecan, 'tiles_overworld.png');
                    uploadHolo(ecan, 'bg_gradient.png');
                    uploadHolo(ecan, 'item_hatch.png');
                    uploadHolo(ecan, 'item_hatch_starter.png');
                    localStorage.setItem('tool-holo', 't');
                }

                uploadHolo(divideShadow(currentPart === 1 || currentPart === 3, currentPart === 2 || currentPart === 3), usedBlocksGame[currentPart]).then(() => {
                    refreshTXT();
                });
            }

            const holoWidth1 = Math.floor(width1 / 2) * 80 + 40;
            const holoWidth2 = Math.floor(width2 / 2) * 80 + 40;
            const holoHeight1 = Math.floor(height1 / 2) * 80 + 40;
            const holoHeight2 = Math.floor(height2 / 2) * 80 + 40;
            width1 *= 40;
            width2 *= 40;
            height1 *= 40;
            height2 *= 40;
            // divide current color texture
            function divideShadow(x = false, y = false) {
                const sizeCan = document.createElement('canvas');
                const sizeCtx = sizeCan.getContext('2d');
                sizeCtx.lineWidth = 4;
                sizeCan.width = x ? holoWidth2 : holoWidth1;
                sizeCan.height = y ? holoHeight2 : holoHeight1;
                sizeCtx.imageSmoothingEnabled = false;
                sizeCtx.drawImage(currentCan, x * width1, y * height1, x ? width2 : width1, y ? height2 : height1, 0, 0, x ? width2 : width1, y ? height2 : height1);
                sizeCtx.strokeRect(1, 1, (x ? width2 : width1) - 1, (y ? height2 : height1) - 1);
                return sizeCan;
            }

            // upload one texture
            function uploadHolo(canvas, name) {
                return new Promise((resolve) => {
                    canvas.toBlob((blob) => {
                        document.evaluate('//button[text()=" Settings"]', teamMenu, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
                        document.evaluate('//button[text()="Modify Assets"]', teamMenu, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
                        const dataTransfer = new DataTransfer();
                        dataTransfer.items.add(new File([blob], name));
                        document.querySelector('.file-pane').dispatchEvent(new DragEvent('drop', { dataTransfer }));
                        document.querySelector('#new-ui-left button').click();
                        resolve(true);
                    });
                });
            }

            // sorting color Labels
            function sortBy() {
                const sortMode = document.querySelector('[name=sortby]:checked').value;
                if (sortMode === '1') {
                    [...colorLabels]
                        .sort((a, b) => (parseInt(a.getAttribute('amount')) > parseInt(b.getAttribute('amount')) ? -1 : 1))
                        .forEach((n) => holo.appendChild(n));
                } else {
                    [...colorLabels]
                        .sort((a, b) => (a.textContent > b.textContent ? 1 : -1))
                        .forEach((n) => holo.appendChild(n));
                }
            }

            // initial selection
            selectPart();

            let showedColor = '';
            function showOnly(color) {
                const tds = document.querySelectorAll('td');
                if (color === showedColor) {
                    tds.forEach((t) => {
                        t.classList.remove('transparent');
                    });
                    showedColor = '';
                    return;
                }
                tds.forEach((t) => {
                    if (t.textContent === color) t.classList.remove('transparent');
                    else t.classList.add('transparent');
                });
                showedColor = color;
            }
        }
        function findIndex(a) {
            for (let s = 0; s < 255; s++) if (Math.abs(a[0] - rgb[s][0]) <= 1 && Math.abs(a[1] - rgb[s][1]) <= 1 && Math.abs(a[2] - rgb[s][2]) <= 1) return s;
            return 256;
        }

        function setInputFilter(i1, i2) {
            [i1, i2].forEach((tbox) => {
                // eslint-disable-next-line no-param-reassign
                tbox.oldValue = '';
                tbox.addEventListener('input', function () {
                    if (/^-?(?!0)\d{0,2}$|^0$/.test(this.value)) {
                        this.oldValue = this.value;
                        this.oldSelectionStart = this.selectionStart;
                        this.oldSelectionEnd = this.selectionEnd;
                        if (this === i1 && this.value.length >= (this.value.indexOf('-') === -1 ? 2 : 3)) i2.focus();
                        else if (this === i2 && this.value.length === 0) i1.focus();
                    } else {
                        this.value = this.oldValue;
                        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                    }
                });
            });
        }
    }

    document.querySelector('#tool-message button').onclick = () => {
        nav.classList.remove('hidden');
        content.classList.remove('hidden');
        messageBox.classList.add('hidden');
    };
    function info(text = null) {
        nav.classList.add('hidden');
        content.classList.add('hidden');
        messageBox.classList.remove('hidden');
        while (message.firstChild) message.firstChild.remove();
        if (text) {
            const p = document.createElement('p');
            p.textContent = text;
            p.classList.add('error');
            message.appendChild(p);
        }
    }

    function showSection(s) {
        for (let i = 0; i < content.children.length; i++) {
            content.children[i].classList.add('hidden');
        }
        content.children[s].classList.remove('hidden');
        for (let o = 0; o < navChildren.length; o++) {
            navChildren[o].classList.remove('chosen');
        }
        navChildren[s].classList.add('chosen');
    }

    function sendUpdateMessage(version) {
        if (localStorage.getItem('tool-version') === version) return;
        const popup = document.querySelector('#disconnect-popup');
        tool.classList.add('disabled');
        popup.style.display = 'block';
        popup.innerHTML = `
        <div>
            <h2>DredArt Update!</h2>
            <p>It's really pleasing to know that people uses your creation!</p>
            Major changes in 1.4:
            <ul>
            <li>You can restore your textures when removing Holo (set it up in settings tab)</li>
            <li>Holo is more reliable</li>
            <li>Visual changes</li>
            </ul>
            <hr>
            <p>Please give me 1 minute to introduce you to project that is very close to my heart:</p>
            <h3>MOSAIC Project</h3>
            <img src='' alt='Mosaic canvas'/>
            <p>Picture this: the largest pixel art ever, 100 stunning ships arranged in a 10x10 grid, all coming together to create a breathtaking masterpiece.</p>
            <p>We are already running, but we need your help to make it happen!</p>
            <p><b>YOU can be a part of this incredible project in as little as 2 minutes!</b></p>
            <ul>
                <li>We need something to paint! We take everything as long it's appropriate. Upload images which will fill the canvas to our discord server. <a target='_blank' href='https://mosaic.kapixar.repl.co/'>Here you can check current canvas!</a></li>
                <li>You can help paint ready ships!</li>
                <li>If you happen to have any unused metal lying around, consider donating it to our cause!</li>
            </ul>
            <p><b>What do YOU get?</b></p>
            <ul>
                <li>Eternal glory of participation</li>
                <li>Secret giveaway tickets</li>
                <li>Flux for painting</li>
            </ul>
            <p>Join our discord server now for details of this amazing event!</p>
            <a target='_blank' href='https://discord.gg/uNgD6vv67c'><button class='btn-meme'>Join our server</button></a>

            <p>Close button opens after <span>60</span> seconds</p>
            <p>Consider joining, it's <b>just</b> about uploading any image you want!</p> 
            <button disabled class='btn-red'>Close</button>
            <img alt='puss' src='https://i2-prod.mirror.co.uk/incoming/article25609261.ece/ALTERNATES/s615b/0_PUSS-IN-BOOTS.jpg'>
        </div>
        `;
        const mosaic = document.querySelector('#disconnect-popup img');
        mosaic.src = chrome.runtime.getURL('img/mosaic.png');

        let count = 60;
        const interval = setInterval(() => {
            count--;
            document.querySelector('#disconnect-popup span:last-of-type').textContent = count;
            if (count <= 0) {
                document.querySelector('#disconnect-popup button.btn-red').removeAttribute('disabled');
                document.querySelector('#disconnect-popup button.btn-red').onclick = () => {
                    popup.style.display = 'none';
                    tool.classList.remove('disabled');
                    localStorage.setItem('tool-version', version);
                };
                clearInterval(interval);
            }
        }, 1000);
    }
}

const teamMenu = document.getElementById('team_menu');
const holoItems = ['anchor', 'sign', 'sign_hover', 'sign_near', 'item_hatch_bg', 'item_hatch', 'item_hatch_starter', 'bg_ship', 'tiles_subworld', 'tiles_overworld', 'bg_gradient'];

function refreshTXT() {
    document.evaluate('//button[text()=" Settings"]', teamMenu, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
    document.evaluate('//button[text()="Modify Assets"]', teamMenu, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
    document.evaluate('//button[text()="Refresh ↻"]', teamMenu, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
    document.querySelector('#new-ui-left button').click();
}

function removeHolo() {
    document.evaluate('//button[text()=" Settings"]', teamMenu, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
    document.evaluate('//button[text()="Modify Assets"]', teamMenu, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
    holoItems.forEach((i) => {
        if (document.evaluate(`//td[text()="${i}.png"]`, teamMenu, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue != null) document.evaluate(`//td[text()="${i}.png"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.parentElement.querySelector('td:nth-of-type(3) button').click();
    });
    localStorage.removeItem('tool-holo');
    document.querySelector('#new-ui-left button').click();
    document.querySelectorAll('#tool-holo div, #allButton, #checkButton').forEach((e) => { e.classList.remove('selected'); });
    if (localStorage.getItem('tool-txt') === 'true') {
        openDB().then(() => {
            retrieveFile('tool_txt.zip').then((file) => {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                const drr = new DragEvent('drop', { dataTransfer });
                window.dispatchEvent(drr);
                document.evaluate('//button[text()="Okay"]', document.querySelector('.modal-container'), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
            });
        });
    }
}

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

        request.onupgradeneeded = (event) => {
            db = event.target.result;
            db.createObjectStore('holoTXT', { keyPath: 'fileName' });
        };
    });
}

function saveFile(file) {
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

function retrieveFile(fileName) {
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

function clearFiles() {
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
