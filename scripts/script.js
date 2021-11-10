const notificationBar = document.querySelector('.notification');

if (localStorage.getItem("notification") == "hidden") {
    notificationBar.classList.add('hidden');
}

document.querySelector('.close').addEventListener('mousedown', () => {
    notificationBar.classList.add('hidden');
    notificationBar.setAttribute('aria-hidden', 'true');
    localStorage.setItem("notification", "hidden");
});

const prices = document.querySelectorAll('.price');
for (let price of prices) {
    price.textContent = '₦' + Number(price.textContent).toLocaleString();
}

document.querySelector('.cart').style.setProperty('top', `calc(${notificationBar.scrollHeight}px + 3em)`);