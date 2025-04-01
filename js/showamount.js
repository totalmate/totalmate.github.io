// A kosár összegének kulcsa a localStorage-ben
const cartTotalKey = 'cartTotal';

// Betöltjük a kosár összegét a localStorage-ből, ha van
let cartTotal = localStorage.getItem(cartTotalKey);
if (cartTotal === null) {
    cartTotal = 0; // Ha nincs mentett érték, az alapérték 0 lesz
} else {
    cartTotal = parseInt(cartTotal); // Ha van mentett érték, konvertáljuk számmá
}

// Eseménykezelő hozzáadás az "Add to Cart" gombokhoz
const addToCartButtons = document.querySelectorAll('.btn-food');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        // A termék ára a következő testvérelem (<li class="price">) szövege
        const priceElement = button.parentElement.parentElement.querySelector('.price');
        const price = parseInt(priceElement.textContent);

        // Az összeget növeljük a termék árával
        cartTotal += price;

        // Frissítjük a localStorage-ban tárolt értéket
        localStorage.setItem(cartTotalKey, cartTotal);

        // Frissítjük a "show-amount" elem tartalmát az új összeggel
        updateCartTotal();
    });
});

// Eseménykezelő hozzáadása a plusz gombhoz
const plusButtons = document.querySelectorAll('.plus-btn');
plusButtons.forEach(button => {
    button.addEventListener('click', () => {
        const qtyElement = button.parentElement.querySelector('.qty-incart');
        const qty = parseInt(qtyElement.textContent);
        const priceElement = button.parentElement.parentElement.querySelector('.price');
        const price = parseInt(priceElement.textContent);

        // Növeljük a mennyiséget és az összeget
        qtyElement.textContent = qty + 1;
        cartTotal += price;

        // Frissítjük a localStorage-ban tárolt értéket
        localStorage.setItem(cartTotalKey, cartTotal);

        // Frissítjük a "show-amount" elem tartalmát az új összeggel
        updateCartTotal();
    });
});

// Eseménykezelő hozzáadása a mínusz gombhoz
const minusButtons = document.querySelectorAll('.minus-btn');
minusButtons.forEach(button => {
    button.addEventListener('click', () => {
        const qtyElement = button.parentElement.querySelector('.qty-incart');
        const qty = parseInt(qtyElement.textContent);
        const priceElement = button.parentElement.parentElement.querySelector('.price');
        const price = parseInt(priceElement.textContent);

        // Csökkentjük a mennyiséget és az összeget
        if (qty > 1) {
            qtyElement.textContent = qty - 1;
            cartTotal -= price;
        }

        // Frissítjük a localStorage-ban tárolt értéket
        localStorage.setItem(cartTotalKey, cartTotal);

        // Frissítjük a "show-amount" elem tartalmát az új összeggel
        updateCartTotal();
    });
});

// Eseménykezelő hozzáadása a törlés gombhoz
const removeButtons = document.querySelectorAll('.remove-btn');
removeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const qtyElement = button.parentElement.parentElement.querySelector('.qty-incart');
        const qty = parseInt(qtyElement.textContent);
        const priceElement = button.parentElement.parentElement.querySelector('.price');
        const price = parseInt(priceElement.textContent);

        // Kivonjuk a törlendő termék árát a kosár összegéből
        cartTotal -= price * qty;

        // Frissítjük a localStorage-ban tárolt értéket
        localStorage.setItem(cartTotalKey, cartTotal);

        // Frissítjük a "show-amount" elem tartalmát az új összeggel
        updateCartTotal();

        // Töröljük a terméket a kosárból
        button.parentElement.parentElement.remove();
    });
});

// Kosár összegének frissítése
function updateCartTotal() {
    const showAmountElement = document.querySelector('.show-amount');
    const showAmountElementMobile = document.querySelector('.btn-cost .show-amount');
    if (cartTotal >= 0) {
        showAmountElement.textContent = `${cartTotal}`;
        showAmountElementMobile.textContent = `${cartTotal}`;
    } else {
        cartTotal = 0;
        showAmountElement.textContent = `${cartTotal}`;
        showAmountElementMobile.textContent = `${cartTotal}`;
    }
}
// Frissítsük az összeget az oldal betöltődésekor
updateCartTotal();