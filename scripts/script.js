const $ = function (selector) {
    return document.querySelector(selector);
}

const notificationBar = $('.notification');
const cartButton = $('.cart-button');
const cart = $('.cart');
const progressBarContainers = document.querySelectorAll('.progressbar-container');
const progressBars = document.querySelectorAll('.progressbar');
const products = document.querySelectorAll('.product');
let itemsAlreadyInCart = JSON.parse(localStorage.getItem('cart')) || [];

for (let i = 0; i < itemsAlreadyInCart.length; i++) {
    DOMCreateCartElement(itemsAlreadyInCart[i]);
}

function replaceSubstrAt(string, index, replacement) {
    return string.slice(0, index) + replacement + string.slice(index);
}

sessionStorage.getItem("notification-hidden") ? notificationBar.classList.add('notification-hidden') : console.log();

$('.close').onclick = () => {
    notificationBar.classList.add('notification-hidden');
    notificationBar.setAttribute('aria-hidden', 'true');
    sessionStorage.setItem("notification-hidden", true);
};

function readablePrice(...prices) {
    for (let price of prices) {
        price.textContent = '₦' + Number(price.textContent).toLocaleString();
    }
}
readablePrice(...document.querySelectorAll('.price'));

cart.style.setProperty('top', `${(cartButton.getBoundingClientRect().bottom + 10) - notificationBar.offsetHeight}px`);
cart.style.setProperty('right', `${window.innerWidth - cartButton.getBoundingClientRect().right - 5}px`);

cartButton.onclick = (event) => {
    cart.classList.toggle('closed');
    event.stopPropagation();
};
$('body').onclick = (event) => {
    if (!(event.target == cart || Array.from(cart.querySelectorAll('*')).includes(event.target))) cart.classList.add('closed');
};

for (let i = 0; i < progressBars.length; i++) {
    let progressBarVal = progressBars[i].getAttribute('aria-valuenow');
    progressBarContainers[i].style.setProperty('--width', `${(progressBarVal / 100) * progressBars[i].clientWidth}px`);
    if (progressBarVal >= 60) progressBarContainers[i].style.setProperty('--backgroundColor', 'green');
    else if (progressBarVal <= 20) progressBarContainers[i].style.setProperty('--backgroundColor', 'red');
    else progressBarContainers[i].style.setProperty('--backgroundColor', 'orange');
}

for (let product of products) {
    if (Boolean(localStorage.getItem('cart')) && JSON.parse(localStorage.getItem('cart')).some((obj) => { 
        return obj.productId == product.getAttribute('data-product-id');
    })) {
        product.lastElementChild.textContent = "Added to cart";
        product.lastElementChild.classList.add('disabled');
    }
}


function addToCart(addToCartButton) {
    if (!addToCartButton.classList.contains('disabled')) {
        addToCartButton.textContent = "Added to cart";
        addToCartButton.classList.add('disabled');
        let product = 
        { 'productId' : addToCartButton.parentElement.getAttribute('data-product-id'),
            'productName' : addToCartButton.parentElement.querySelector('.product-name').textContent,
            'productImgSrc' : addToCartButton.parentElement.querySelector('.product-image').getAttribute('src'),
            'productPrice' : addToCartButton.parentElement.querySelector('.product-discount-price').textContent,
            'productQty' : 1 
        }
        let currentItemsInCart = localStorage.getItem('cart') ? localStorage.getItem('cart') : '[]';
        JSON.parse(currentItemsInCart).length ?
            localStorage.setItem('cart', replaceSubstrAt(currentItemsInCart, currentItemsInCart.length - 1, ', ' + JSON.stringify(product))) :
            localStorage.setItem('cart', JSON.stringify([product]));

        DOMCreateCartElement(product);
    }
}

function removeFromCart(DOMCartItem) {
    let productId = DOMCartItem.getAttribute('data-product-id'),
        addToCartButton = $(`.product[data-product-id='${productId}']`).querySelector('.add-to-cart-button'),
        currentItemsInCart = JSON.parse(localStorage.getItem('cart'));
    localStorage.setItem('cart', JSON.stringify(currentItemsInCart.filter((obj) => { return obj.productId != productId; })));
    DOMCartItem.remove();

    addToCartButton.classList.remove('disabled');
    addToCartButton.textContent = null;
    addToCartButton.appendChild(document.createElement('span')).setAttribute('class', 'button-text');
    addToCartButton.querySelector('.button-text').textContent = "Add to cart ";
    addToCartButton.querySelector('.button-text').appendChild(document.createElement('i')).setAttribute('class', 'fa fa-shopping-cart');
}

function DOMCreateCartElement(productObject) {
    cart.appendChild(document.createElement('div')).setAttribute('class', 'cart-item');
    cart.lastChild.setAttribute('data-product-id', productObject['productId']);
    cart.lastChild.appendChild(document.createElement('img')).setAttribute('class', 'cart-item-image');
    cart.lastChild.querySelector('.cart-item-image').setAttribute('src', productObject['productImgSrc']);
    cart.lastChild.appendChild(document.createElement('div')).setAttribute('class', 'cart-item-text');
    cart.lastChild.querySelector('.cart-item-text').appendChild(document.createElement('p')).setAttribute('class', 'cart-item-name');
    cart.lastChild.querySelector('.cart-item-text').appendChild(document.createElement('p')).setAttribute('class', 'cart-item-price');
    cart.lastChild.querySelector('.cart-item-name').textContent = productObject['productName'];
    cart.lastChild.querySelector('.cart-item-price').textContent = productObject['productPrice'];
    cart.lastChild.appendChild(document.createElement('div')).setAttribute('class', 'cart-control-qty');
    cart.lastChild.querySelector('.cart-control-qty').appendChild(document.createElement('button')).setAttribute('class', 'minus-button');
    cart.lastChild.querySelector('.minus-button').appendChild(document.createElement('span')).setAttribute('class', 'button-text');
    cart.lastChild.querySelector('.minus-button').querySelector('.button-text').textContent = '-';
    cart.lastChild.querySelector('.cart-control-qty').appendChild(document.createElement('input')).setAttribute('class', 'cart-control-qty-text-box');
    cart.lastChild.querySelector('.cart-control-qty-text-box').setAttribute('type', 'number');
    cart.lastChild.querySelector('.cart-control-qty-text-box').setAttribute('value', 1);
    cart.lastChild.querySelector('.cart-control-qty-text-box').setAttribute('max', 99);
    cart.lastChild.querySelector('.cart-control-qty-text-box').setAttribute('min', 0);
    cart.lastChild.querySelector('.cart-control-qty').appendChild(document.createElement('button')).setAttribute('class', 'plus-button');
    cart.lastChild.querySelector('.plus-button').appendChild(document.createElement('span')).setAttribute('class', 'button-text');
    cart.lastChild.querySelector('.plus-button').querySelector('.button-text').textContent = '+';

    cart.lastChild.querySelector('.plus-button').onclick = (event) => {
        event.currentTarget.previousSibling.setAttribute('value', Number(event.currentTarget.previousSibling.value) + 1);
    };
    cart.lastChild.querySelector('.minus-button').onclick = (event) => {
        event.currentTarget.nextSibling.setAttribute('value', Number(event.currentTarget.nextSibling.value) - 1);
    };

    cart.lastChild.querySelector('.cart-control-qty-text-box').addEventListener('change', (event) => {
        let cartItem = event.target.parentElement.parentElement;
        if (event.target.value == '0') removeFromCart(cartItem);

        $('.cart-items-num').textContent = cart.querySelectorAll('.cart-item').length;
    });

    $('.cart-items-num').textContent = cart.querySelectorAll('.cart-item').length;

}