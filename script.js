var notificationBar = document.querySelector('.notification');

document.querySelector('.close').addEventListener('click', () => {
    notificationBar.classList.add('hidden');
    notificationBar.setAttribute('aria-hidden', 'true');
});