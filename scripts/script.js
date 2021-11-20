const prices = document.querySelectorAll('.price');
const notificationBar = document.querySelector('.notification');
const cartButton = document.querySelector('.cart-button');
const cart = document.querySelector('.cart');
const progressBarContainer = document.querySelector('.progressbar-container');
const progressBar = document.querySelector('.progressbar');

document.querySelector('.close').addEventListener('mousedown', () => {
    notificationBar.classList.add('notification-hidden');
    notificationBar.setAttribute('aria-hidden', 'true');
});

for (let price of prices) {
    price.textContent = '₦' + Number(price.textContent).toLocaleString();
}

cart.style.setProperty('top', `${(cartButton.getBoundingClientRect().bottom + 10) - notificationBar.offsetHeight}px`);
cart.style.setProperty('right', `${window.innerWidth - cartButton.getBoundingClientRect().right - 5}px`);

cartButton.addEventListener('click', (event) => {
    cart.classList.toggle('closed');
    event.stopPropagation();
});
document.querySelector('body:not(.cart)').addEventListener('click', (event) => {
    if (!(event.target == cart)) cart.classList.add('closed');
});

let progressBarVal = progressBar.getAttribute('aria-valuenow');

progressBarContainer.style.setProperty('--width', `${(progressBarVal / 100) * progressBar.clientWidth}px`);
if (progressBarVal >= 60) progressBarContainer.style.setProperty('--backgroundColor', 'green');
else if (progressBarVal <= 20) progressBarContainer.style.setProperty('--backgroundColor', 'red');
else progressBarContainer.style.setProperty('--backgroundColor', 'orange');