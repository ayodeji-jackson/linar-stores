const notificationBar = document.querySelector('.notification');
const cartButton = document.querySelector('.cart-button > .btn');
const cart = document.querySelector('.cart');
const cartTotalPrice = document.querySelector('.cart-footer .price');
const progressBarContainers = document.querySelectorAll('.progressbar-container');
const progressBars = document.querySelectorAll('.progressbar');
const products = document.querySelectorAll('.product');
const navCategoryMenu = document.querySelector('.nav-category-menu');
const quantityBoxes = document.querySelectorAll('.cart-control-qty-text-box');
const allProductsButton = document.querySelector('.button-all-products');
const toggle = document.querySelector('.toggle');
const loadingScreen = document.querySelector('.loading-screen');
let itemsAlreadyInCart = JSON.parse(localStorage.getItem('cart')) || [];

document.querySelector('.product-section.carousel').style.height = products[0].offsetHeight + 70 + 'px';

document.body.onload = () => {
    loadingScreen.remove();
    document.body.classList.remove('loading');
}

toggle.onclick = slideDown;
function slideDown(event) {
    event.preventDefault();
    navCategoryMenu.classList.toggle('shut');
    if (navCategoryMenu.classList.contains('shut')) navCategoryMenu.style.setProperty('height', '0');
    else navCategoryMenu.style.setProperty('height', navCategoryMenu.scrollHeight + 'px');
}

for (let item of navCategoryMenu.children) {
    item.onclick = (event) => {
        let arrow = "<i class='fa fa-angle-down'></i>"
        let temp = allProductsButton.children[0].textContent;
        allProductsButton.parentElement.setAttribute('action', item.textContent.toLowerCase().replace(/\s+/g, "-")); //set form action
        allProductsButton.children[0].innerHTML = item.textContent + arrow;
        item.textContent = temp;
        slideDown(event);
    }
}

allProductsButton.parentElement.setAttribute('action', allProductsButton.textContent.toLowerCase().replace(/\s+/g, "-")); //set form action

let tempPrice = 0;
for (let i = 0; i < itemsAlreadyInCart.length; i++) { // create cart items from items in local storage
    DOMCreateCartElement(itemsAlreadyInCart[i]);
    tempPrice += backToInt(itemsAlreadyInCart[i]['productPrice']) * itemsAlreadyInCart[i]['productQty'];
    document.querySelectorAll('.cart-control-qty-text-box')[i].value = itemsAlreadyInCart[i]['productQty'];
}
cartTotalPrice.textContent = readablePrice(tempPrice);

if (!itemsAlreadyInCart.length) cart.querySelector('.cart-message').classList.remove('closed');


function replaceSubstrAt(string, index, replacement) {
    return string.slice(0, index) + replacement + string.slice(index);
}

sessionStorage.getItem("notification-hidden") ? notificationBar.classList.add('notification-hidden') : console.log();

document.querySelector('.close').onclick = () => {
    notificationBar.classList.add('notification-hidden');
    notificationBar.setAttribute('aria-hidden', 'true');
    sessionStorage.setItem("notification-hidden", true);
};

function readablePrice(price) {
    return '₦' + Number(price).toLocaleString();
}
function backToInt(price) {
    return typeof price == 'string' ? Number(price.slice(1).split(',').join('')) : price; // remove currency comma characters from price
}

for (let price of document.querySelectorAll('main .price')) {
    price.textContent = readablePrice(price.textContent);
}

cart.style.setProperty('top', `${(cartButton.getBoundingClientRect().bottom + 10) - notificationBar.offsetHeight}px`);
cart.style.setProperty('right', `${window.innerWidth - cartButton.getBoundingClientRect().right - 5}px`); //position the cart under the toggle button
navCategoryMenu.style.setProperty('left', `${allProductsButton.offsetLeft}px`);
navCategoryMenu.style.setProperty('top', `${allProductsButton.offsetHeight}px`); //position the dropdown under the toggle button

cartButton.onclick = () => {
    cart.classList.toggle('closed');
};

function closePopUp(event, toggle, el, className, func) {
    if (!el.classList.contains(className) && event.target != el && event.target != toggle && !Array.from(toggle.querySelectorAll('*')).includes(event.target) && !Array.from(el.querySelectorAll('*')).includes(event.target)) {
        if (!func) el.classList.add(className);
        else func(event);
    }
}

document.body.onclick = (event) => {
    closePopUp(event, cartButton, cart, "closed");
    closePopUp(event, allProductsButton, navCategoryMenu, 'shut', slideDown);
};

for (let i = 0; i < progressBars.length; i++) {
    let progressBarVal = progressBars[i].getAttribute('aria-valuenow');
    progressBarContainers[i].style.setProperty('--width', `${(progressBarVal / 100) * progressBars[i].clientWidth}px`);
    if (progressBarVal >= 60) progressBarContainers[i].style.setProperty('--backgroundColor', 'green');
    else if (progressBarVal <= 20) progressBarContainers[i].style.setProperty('--backgroundColor', 'red');
    else progressBarContainers[i].style.setProperty('--backgroundColor', 'orange');
}

for (let product of products) { //disable the add to cart buttons of products already in cart
    if (Boolean(localStorage.getItem('cart')) && JSON.parse(localStorage.getItem('cart')).some((obj) => {
        return obj.productId == product.getAttribute('data-product-id');
    })) {
        product.lastElementChild.textContent = "Added to cart";
        product.lastElementChild.setAttribute('disabled', 'true');
        product.lastElementChild.classList.add('disabled');
    }
}

function addObjectToLocalStorage(item, obj) {
    let itemInLocalStorage = localStorage.getItem(item) ? localStorage.getItem(item) : '[]';
    JSON.parse(itemInLocalStorage).length ?
        localStorage.setItem('cart', replaceSubstrAt(itemInLocalStorage, itemInLocalStorage.length - 1, ', ' + JSON.stringify(obj))) :
        localStorage.setItem('cart', JSON.stringify([obj]));
}
function saveQtyToLocalStorage(id, item) {
    let cart = JSON.parse(localStorage.getItem('cart'))
    cart.forEach((prod) => {
        if (prod.productId == id) prod.productQty = item;
    });
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(addToCartButton) {
    if (!addToCartButton.classList.contains('disabled')) {
        addToCartButton.textContent = "Added to cart";
        addToCartButton.classList.add('disabled');
        addToCartButton.setAttribute('disabled', 'true');
        let product =
        {
            'productId': addToCartButton.parentElement.getAttribute('data-product-id'),
            'productName': addToCartButton.parentElement.querySelector('.product-name').textContent,
            'productImgSrc': addToCartButton.parentElement.querySelector('.product-image').getAttribute('src'),
            'productPrice': addToCartButton.parentElement.querySelector('.product-discount-price').textContent,
            'productQtyAvailable': addToCartButton.parentElement.querySelector('.num-qty-available') ? addToCartButton.parentElement.querySelector('.num-qty-available').textContent : '1',
            'productQty': 1
        }
        addObjectToLocalStorage('cart', product);
        DOMCreateCartElement(product);
        cartTotalPrice.textContent = readablePrice(backToInt(cartTotalPrice.textContent) + backToInt(product['productPrice']));
    }
}

function removeFromCart(DOMCartItem) {
    setTimeout(() => {
        let productId = DOMCartItem.getAttribute('data-product-id'),
            currentItemsInCart = JSON.parse(localStorage.getItem('cart'));
        localStorage.setItem('cart', JSON.stringify(currentItemsInCart.filter((obj) => { return obj.productId != productId; })));
        DOMCartItem.remove();

        if (document.querySelector(`.product[data-product-id='${productId}']`)) {
            let addToCartButton = document.querySelector(`.product[data-product-id='${productId}']`).querySelector('.add-to-cart-button');
            addToCartButton.classList.remove('disabled');
            addToCartButton.disabled = false;
            addToCartButton.textContent = null;
            addToCartButton.appendChild(document.createElement('span')).setAttribute('class', 'button-text');
            addToCartButton.querySelector('.button-text').textContent = "Add to cart ";
            addToCartButton.querySelector('.button-text').appendChild(document.createElement('i')).setAttribute('class', 'fa fa-shopping-cart');
        }


        if (currentItemsInCart.length <= 1) cart.querySelector('.cart-message').classList.remove('closed');
        document.querySelector('.cart-items-num').textContent = cart.querySelectorAll('.cart-item').length;
    }, 1);
}

function DOMCreateCartElement(productObject) {
    cart.querySelector('.cart-message').classList.add('closed');
    cart.appendChild(document.createElement('div')).setAttribute('class', 'cart-item');
    cart.lastChild.setAttribute('data-product-id', productObject['productId']);
    cart.lastChild.setAttribute('data-product-price', productObject['productPrice']);
    cart.lastChild.setAttribute('data-product-qty-available', productObject['productQtyAvailable']);
    cart.lastChild.appendChild(document.createElement('img')).setAttribute('class', 'cart-item-image');
    cart.lastChild.querySelector('.cart-item-image').setAttribute('src', productObject['productImgSrc']);
    cart.lastChild.appendChild(document.createElement('div')).setAttribute('class', 'cart-item-text');
    cart.lastChild.querySelector('.cart-item-text').appendChild(document.createElement('p')).setAttribute('class', 'cart-item-name');
    cart.lastChild.querySelector('.cart-item-text').appendChild(document.createElement('p')).setAttribute('class', 'cart-item-price');
    cart.lastChild.querySelector('.cart-item-name').textContent = productObject['productName'];
    cart.lastChild.querySelector('.cart-item-price').textContent = readablePrice(backToInt(productObject['productPrice']) * productObject['productQty']);
    cart.lastChild.appendChild(document.createElement('div')).setAttribute('class', 'cart-control-qty');
    cart.lastChild.querySelector('.cart-control-qty').appendChild(document.createElement('button')).setAttribute('class', 'minus-button btn btn-transparent');
    cart.lastChild.querySelector('.minus-button').appendChild(document.createElement('span')).setAttribute('class', 'button-text');
    cart.lastChild.querySelector('.minus-button').querySelector('.button-text').textContent = '-';
    cart.lastChild.querySelector('.cart-control-qty').appendChild(document.createElement('input')).setAttribute('class', 'cart-control-qty-text-box');
    cart.lastChild.querySelector('.cart-control-qty-text-box').setAttribute('type', 'number');
    cart.lastChild.querySelector('.cart-control-qty-text-box').setAttribute('value', 1);
    cart.lastChild.querySelector('.cart-control-qty-text-box').setAttribute('onKeyPress', "if (this.value.length == 2) return false;");
    cart.lastChild.querySelector('.cart-control-qty').appendChild(document.createElement('button')).setAttribute('class', 'plus-button btn btn-transparent');
    cart.lastChild.querySelector('.plus-button').appendChild(document.createElement('span')).setAttribute('class', 'button-text');
    cart.lastChild.querySelector('.plus-button').querySelector('.button-text').textContent = '+';

    cart.lastChild.querySelector('.plus-button').onclick = (event) => {
        let textBox = event.currentTarget.previousSibling;
        if (Number(textBox.value) < Number(textBox.parentElement.parentElement.getAttribute('data-product-qty-available'))) {
            textBox.value = Number(textBox.value) + 1;
            textBox.dispatchEvent(new Event('change'));
        }
    };
    cart.lastChild.querySelector('.minus-button').onclick = (event) => {
        let textBox = event.currentTarget.nextSibling;
        if (Number(textBox.value) > 0) {
            textBox.value = Number(textBox.value) - 1;
            textBox.dispatchEvent(new Event('change'));
        }
    };

    cart.lastChild.querySelector('.cart-control-qty-text-box').onchange = (event) => {
        let cartItem = event.target.parentElement.parentElement;
        if (Number(event.target.value) == 0 || event.target.value == '') removeFromCart(cartItem);
        else if (Number(event.target.value) > Number(cartItem.getAttribute('data-product-qty-available'))) event.target.value = cartItem.getAttribute('data-product-qty-available');
        cartItem.querySelector('.cart-item-price').textContent = readablePrice(backToInt(cartItem.getAttribute('data-product-price')) * Number(event.target.value));
        cartTotalPrice.textContent = readablePrice(Array.from(document.querySelectorAll('.cart-item-price')).map((a) => { return a.textContent; }).reduce((a, b) => { return backToInt(a) + backToInt(b); }, '₦0'));
        saveQtyToLocalStorage(cartItem.getAttribute('data-product-id'), event.target.value);
    };

    document.querySelector('.cart-items-num').textContent = cart.querySelectorAll('.cart-item').length;

}

let menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', showMenu, false);
let flyoutMenu = document.querySelector('.flyoutMenu');
flyoutMenu.addEventListener('click', hideMenu, false);

function showMenu(e) {
    flyoutMenu.classList.add("show");
    document.body.style.overflow = "hidden";
}
function hideMenu(e) {
    flyoutMenu.classList.remove("show");
    e.stopPropagation();
    document.body.style.overflow = "auto";
}
