document.querySelectorAll('body div > section h2').forEach((section) => {
    section.onclick = () => {
        section.parentElement.classList.toggle('show');
    };
});

chrome.runtime.sendMessage({message: 'hello'}, (res) => {
    console.log(res);
})
