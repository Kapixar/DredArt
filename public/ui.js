/* eslint-disable no-unused-vars */
const messageContainer = document.getElementById('messageContainer');

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

function handlePaste(e, callback) {
    // if (!upload.classList.contains('active')) return;
    e.preventDefault();
    const { items } = e.clipboardData;
    if (items.length > 1) { info('You can only paste one image', true); return; }
    const blob = items[0].getAsFile();

    if (blob === undefined) { info('Image not found in pasted content', true); return; }
    const reader = new FileReader();
    reader.onload = (r) => {
        const img = new Image();
        img.onload = () => { callback(img); };
        img.src = r.target.result.toString();
        img.onerror = () => {
            info('Failed to load pasted data', true);
        };
    };
    reader.readAsDataURL(blob);
}

function handleInput(input, callback) {
    if (input.files[0] == null) { info('Choose file again', true); return; }

    if (input.files.length > 1) { info('You can select only one file.You can select only one file', true); return; }

    const file = input.files[0];
    input.value = null;

    if (file.length === null) { info('File is empty', true); return; }

    const img = new Image();
    img.onload = function () { callback(img); };
    img.onerror = function () {
        info('File denied. Only image files are allowed', true);
    };
    img.src = URL.createObjectURL(file);
}

function handleDrop(e, zone, callback) {
    e.preventDefault();
    zone.classList.remove('highlight');

    if (e.dataTransfer.files) {
        if (e.dataTransfer.files.length === 0 || !e.dataTransfer.files[0].type.includes('image')) { info('You can drop only images', true); return; }
        if (e.dataTransfer.files.length !== 1) { info('You can drop only one image', true); return; }
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new Image();
            img.onerror = function () {
                info('An error occured during loading image. Try again.', true);
            };
            img.onload = function () { callback(img); };
            img.src = event.target.result;
        };
        reader.readAsDataURL(ev.dataTransfer.files[0]);
    }
}

function handleDragOver(e, zone) {
    e.preventDefault();
    zone.classList.add('highlight');
}

function handleDragLeave(e, zone) {
    e.preventDefault();
    zone.classList.remove('highlight');
}

// const keyframes = [{
//     background: 'transparent',
// },
// {

// },
// {
//     background: 'transparent'
// }
// ];
// const slideIn = new Animation([{
//     background: 'rgba(25, 35, 45, 0.95)'
// }]);
const container = document.querySelector('body > main');
const sections = document.querySelectorAll('body > main > section');
function changeView(mode) {
    // container.animate([
    //     { background: 'transparent' },
    //     { background: 'rgb(25, 35, 45)' },
    //     { background: 'transparent' },
    // ], {
    //     duration: 2000,
    //     fill: 'both',
    // });
    // sections.forEach((s) => s.classList.add('ui-hidden'));
    // const current = document.querySelector('body > div > :not(.ui-hidden)');
    // current.animate([
    //     { opacity: 0 },
    // ], {
    //     duration: 1000,
    //     fill: 'forwards',
    //     delay: 500,
    // });
    // setTimeout(() => {
    //     current.classList.add('ui-hidden');
    //     document.querySelector(mode).classList.remove('ui-hidden');
    // }, 1500);
    // document.querySelector(mode).animate([
    //     { opacity: 0 },
    //     { opacity: 1 },
    // ], {
    //     duration: 1000,
    //     fill: 'forwards',
    //     delay: 1500,
    // });
    sections.forEach((s) => s.classList.remove('ui-shown'));
    document.querySelector(mode).classList.add('ui-shown');
    // setTimeout(() => {
    //     document.querySelector(mode).classList.add('ui-shown');
    // }, 1000);
}
