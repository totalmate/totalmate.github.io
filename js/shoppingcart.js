let carts = document.querySelectorAll(".btn-food");

let products = [
    {
        name: 'Libamáj Mousse Fügével Hagymalekvárral Kaláccsal',
        tag: 'goose',
        price: 1000,
        inCart: 0
    },
    {
        name: 'Tatár Beefsteak Zöldségekkel Pirítóssal',
        tag: 'tatar',
        price: 1000,
        inCart: 0
    },
    {
        name: 'Tigrisrák Gambas Pil Pil Házi Bagettel',
        tag: 'gambas',
        price: 1000,
        inCart: 0
    },
    {
        name: 'Édesburgonya Krémleves Bacon Chipsszel',
        tag: 'sweetsoup',
        price: 1000,
        inCart: 0
    },
    {
        name: 'Ázsiai Halászlé Harcsával Garnélával',
        tag: 'fishsoup',
        price: 1000,
        inCart: 0
    },
    {
        name: 'Original Tokio Ramen',
        tag: 'ramen',
        price: 1000,
        inCart: 0
    }
];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalAmount(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.nav-qty span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.nav-qty span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.nav-qty span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalAmount(product) {
    let cartAmount = localStorage.getItem('totalAmount');

    if (cartAmount != null) {
        cartAmount = parseInt(cartAmount);
        localStorage.setItem('totalAmount', cartAmount + product.price);
    } else {
        localStorage.setItem('totalAmount', product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productBox = document.querySelector('.products');
    let totalBox = document.querySelector('.total');
    let cartAmount = localStorage.getItem('totalAmount');

    if (cartItems && productBox) {
        productBox.innerHTML = '';
        Object.values(cartItems).map(item => {
            productBox.innerHTML += `
            <div class="product">
            <span class="name">${item.name}</span>
            </div>
            <div class="price">${item.price}.-</div>
            <div class="quantity">
            <i class="fa-solid fa-circle-minus minus-btn"></i>
            <span class="qty-incart">${item.inCart}</span>
            <i class="fa-solid fa-circle-plus plus-btn"></i>
            </div>
            <div class="amount">
            ${item.inCart * item.price}.-
            </div>
            <div class="x">
            <i class="fa-solid fa-circle-xmark remove-btn"></i>
            </div>
            `;
        });

        totalBox.innerHTML += `
        <h5 class="col total-cost">${cartAmount} FT</h5>
        `;
    }
}

displayCart();
onLoadCartNumbers();

// Mennyiség növelése
document.querySelector('.products').addEventListener('click', (event) => {
    if (event.target.classList.contains('plus-btn')) {
        let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
        let productName = event.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        cartItems[productName].inCart += 1;
        localStorage.setItem('productsInCart', JSON.stringify(cartItems));
        let cartAmount = parseInt(localStorage.getItem('totalAmount')) + cartItems[productName].price;
        localStorage.setItem('totalAmount', cartAmount);
        displayCart();
        onLoadCartNumbers();
    }
});

// Mennyiség csökkentése
document.querySelector('.products').addEventListener('click', (event) => {
    if (event.target.classList.contains('minus-btn')) {
        let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
        let productName = event.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        if (cartItems[productName].inCart > 1) {
            cartItems[productName].inCart -= 1;
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            let cartAmount = parseInt(localStorage.getItem('totalAmount')) - cartItems[productName].price;
            localStorage.setItem('totalAmount', cartAmount);
            displayCart();
            onLoadCartNumbers();
        }
    }
});

// Termék törlése a kosárból
document.querySelector('.products').addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-btn')) {
        let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
        let productName = event.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        let productPrice = cartItems[productName].price * cartItems[productName].inCart;
        delete cartItems[productName];
        localStorage.setItem('productsInCart', JSON.stringify(cartItems));
        let cartAmount = parseInt(localStorage.getItem('totalAmount')) - productPrice;
        localStorage.setItem('totalAmount', cartAmount);
        let productNumbers = parseInt(localStorage.getItem('cartNumbers'));
        localStorage.setItem('cartNumbers', productNumbers - 1);
        displayCart();
        onLoadCartNumbers();
    }
});