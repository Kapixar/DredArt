document.querySelectorAll('body div > section h2').forEach((section) => {
    section.onclick = () => {
        section.parentElement.classList.toggle('show');
    };
});
