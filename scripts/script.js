const $ = function (selector) {
    return document.querySelector(selector);
}

const notificationBar = $('.notification');
const cartButton = $('.cart-button');
const cart = $('.cart');
const progressBarContainers = document.querySelectorAll('.progressbar-container');
const progressBars = document.querySelectorAll('.progressbar');
const products = document.querySelectorAll('.product');
let itemsAlreadyInCart = localStorage.getItem('cart');
itemsAlreadyInCart = itemsAlreadyInCart ? itemsAlreadyInCart.split(',') : [];
for (let i = 0; i < itemsAlreadyInCart.length; i++) {
    DOMCreateCartElement(i);
}

sessionStorage.getItem("notification-hidden") ? notificationBar.classList.add('notification-hidden') : console.log();

$('.close').onclick = () => {
    notificationBar.classList.add('notification-hidden');
    notificationBar.setAttribute('aria-hidden', 'true');
    sessionStorage.setItem("notification-hidden", true);
};

for (let price of document.querySelectorAll('.price')) {
    price.textContent = '₦' + Number(price.textContent).toLocaleString();
}

cart.style.setProperty('top', `${(cartButton.getBoundingClientRect().bottom + 10) - notificationBar.offsetHeight}px`);
cart.style.setProperty('right', `${window.innerWidth - cartButton.getBoundingClientRect().right - 5}px`);

cartButton.onclick = (event) => {
    cart.classList.toggle('closed');
    event.stopPropagation();
};
$('body:not(.cart)').onclick = (event) => {
    if (!(event.target == cart)) cart.classList.add('closed');
};

for (let i = 0; i < progressBars.length; i++) {
    let progressBarVal = progressBars[i].getAttribute('aria-valuenow');
    progressBarContainers[i].style.setProperty('--width', `${(progressBarVal / 100) * progressBars[i].clientWidth}px`);
    if (progressBarVal >= 60) progressBarContainers[i].style.setProperty('--backgroundColor', 'green');
    else if (progressBarVal <= 20) progressBarContainers[i].style.setProperty('--backgroundColor', 'red');
    else progressBarContainers[i].style.setProperty('--backgroundColor', 'orange');
}

for (let product of products) {
    if (localStorage.getItem('cart') && localStorage.getItem('cart').includes(product.getAttribute('data-product-id'))) {
        product.lastElementChild.textContent = "Added to cart";
        product.lastElementChild.classList.add('disabled');
    }
}

function addToCart(addToCartButton) {
    if (!addToCartButton.classList.contains('disabled')) {
        addToCartButton.textContent = "Added to cart";
        addToCartButton.classList.add('disabled');
        let addedProduct = addToCartButton.parentElement.getAttribute('data-product-id');
        'cart' in localStorage ?
            localStorage.setItem('cart', `${localStorage.getItem('cart')},${addedProduct}`) :
            localStorage.setItem('cart', addedProduct);

        itemsAlreadyInCart = localStorage.getItem('cart').split(',');
        DOMCreateCartElement(itemsAlreadyInCart.length - 1);
    }
}

function DOMCreateCartElement(pos) {
    cart.appendChild(document.createElement('div')).setAttribute('class', 'cart-item');
    for (let product of products) {
        if (product.getAttribute('data-product-id') == itemsAlreadyInCart[pos]) {
            cart.children[pos].setAttribute('data-product-imgsrc', product.querySelector('.product-image').getAttribute('src'));
            cart.children[pos].setAttribute('data-product-name', product.querySelector('.product-name').textContent);
            cart.children[pos].setAttribute('data-product-price', product.querySelector('.product-discount-price').textContent);
        }
    }
    cart.children[pos].appendChild(document.createElement('img')).setAttribute('class', 'cart-item-image');
    cart.children[pos].querySelector('.cart-item-image').setAttribute('src', cart.children[pos].getAttribute('data-product-imgsrc'));
    cart.children[pos].appendChild(document.createElement('div')).setAttribute('class', 'cart-item-text');
    cart.children[pos].querySelector('.cart-item-text').appendChild(document.createElement('p')).setAttribute('class', 'cart-item-name');
    cart.children[pos].querySelector('.cart-item-text').appendChild(document.createElement('p')).setAttribute('class', 'cart-item-price');
    cart.children[pos].querySelector('.cart-item-name').textContent = cart.children[pos].getAttribute('data-product-name');
    cart.children[pos].querySelector('.cart-item-price').textContent = cart.children[pos].getAttribute('data-product-price');
    cart.children[pos].appendChild(document.createElement('div')).setAttribute('class', 'cart-control-price');
    cart.children[pos].querySelector('.cart-control-price').appendChild(document.createElement('button')).setAttribute('class', 'minus-button');
    cart.children[pos].querySelector('.minus-button').appendChild(document.createElement('span')).setAttribute('class', 'button-text');
    cart.children[pos].querySelector('.minus-button').querySelector('.button-text').textContent = '-';
    cart.children[pos].querySelector('.cart-control-price').appendChild(document.createElement('input')).setAttribute('class', 'cart-control-price-text-box');
    cart.children[pos].querySelector('.cart-control-price-text-box').setAttribute('value', 1);
    cart.children[pos].querySelector('.cart-control-price').appendChild(document.createElement('button')).setAttribute('class', 'plus-button');
    cart.children[pos].querySelector('.plus-button').appendChild(document.createElement('span')).setAttribute('class', 'button-text');
    cart.children[pos].querySelector('.plus-button').querySelector('.button-text').textContent = '+';

    $('.cart-items-num').textContent = itemsAlreadyInCart.length;
}