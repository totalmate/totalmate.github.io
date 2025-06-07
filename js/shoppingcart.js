document.addEventListener("DOMContentLoaded", () => {
    const cartTotalKey = 'totalAmount';
    const cartCountKey = 'cartNumbers';
    const cartItemsKey = 'productsInCart';

    let products = [
        { name: 'Libamáj Mousse Fügével Hagymalekvárral Kaláccsal', tag: 'goose', price: 1000, inCart: 0 },
        { name: 'Tatár Beefsteak Zöldségekkel Pirítóssal', tag: 'tatar', price: 1000, inCart: 0 },
        { name: 'Tigrisrák Gambas Pil Pil Házi Bagettel', tag: 'gambas', price: 1000, inCart: 0 },
        { name: 'Tokyo Ramen', tag: 'ramen', price: 1000, inCart: 0 },
        { name: 'Toszkán Halleves', tag: 'fishsoup', price: 1000, inCart: 0 },
        { name: 'Édesburgonya Krémleves', tag: 'sweetsoup', price: 1000, inCart: 0 },
        { name: 'SOUL Bélszín Steak Libamájjal', tag: 'steak', price: 1000, inCart: 0 },
        { name: 'SOUL Burger Házi Buciban', tag: 'burger', price: 1000, inCart: 0 },
        { name: 'SOUL Club Steak Sandwich', tag: 'sandwich', price: 1000, inCart: 0 },
        { name: 'Lilahagymával Sült Sajtos Csirke Ropogós Baconnel', tag: 'onionchicken', price: 1000, inCart: 0 },
        { name: 'Toszkán Sonkába Tekert Csirke Mozarella Salátával', tag: 'toscanchicken', price: 1000, inCart: 0 },
        { name: 'Csípős Csirkeszárny Édesburgonyával Mártogatóssal', tag: 'chilichicken', price: 1000, inCart: 0 },
        { name: 'BBQ Sertés Oldalas Sörben Sült Serpenyős Krumplival', tag: 'bbq', price: 1000, inCart: 0 },
        { name: 'Konfitált Sertéscsülök Hagymás Burgonyapürével', tag: 'csülök', price: 1000, inCart: 0 },
        { name: 'Mediterrán Lecsó Sertésszűzzel Házi Bagettel', tag: 'lecso', price: 1000, inCart: 0 },
        { name: 'Mézes Chilis Lazac Grillezett Zöldségekkel', tag: 'lazac', price: 1000, inCart: 0 },
        { name: 'Epres Nutellás Palacsinta Mascarponeval', tag: 'pancake', price: 1000, inCart: 0 },
        { name: 'Oreos Banános Cheesecake', tag: 'cheesecake', price: 1000, inCart: 0 },
        { name: 'Meggyes Tiramisu Pohárkrém', tag: 'tiramisu', price: 1000, inCart: 0 },
        { name: 'Bagett', tag: 'bagett', price: 1000, inCart: 0 },
        { name: 'Csónakburgonya', tag: 'frenchfries', price: 1000, inCart: 0 },
        { name: 'Steakburgonya', tag: 'steakpotato', price: 1000, inCart: 0 },
        { name: 'Édesburgonya', tag: 'sweetpotato', price: 1000, inCart: 0 },
        { name: 'Vegyes Grill Zöldség', tag: 'vegetables', price: 1000, inCart: 0 },
        { name: 'Friss Kevert Saláta', tag: 'salad', price: 1000, inCart: 0 },
        { name: 'Paradicsomsaláta', tag: 'tomatosalad', price: 1000, inCart: 0 },
        { name: 'Uborkasaláta', tag: 'cucumbersalad', price: 1000, inCart: 0 }
    ];

    const showAmountElems = document.querySelectorAll(".show-amount");
    const navQtyElem = document.querySelector(".nav-qty span");

    const updateDisplayAmounts = () => {
        const total = localStorage.getItem(cartTotalKey) || 0;
        showAmountElems.forEach(el => el.textContent = ` ${total}`);
        if (navQtyElem) navQtyElem.textContent = localStorage.getItem(cartCountKey) || 0;
    };

    const setItems = (product, decrease = false) => {
        let cartItems = JSON.parse(localStorage.getItem(cartItemsKey)) || {};

        if (!cartItems[product.tag]) {
            cartItems[product.tag] = { ...product, inCart: 0 };
        }

        cartItems[product.tag].inCart = decrease
            ? Math.max(cartItems[product.tag].inCart - 1, 0)
            : cartItems[product.tag].inCart + 1;

        if (cartItems[product.tag].inCart === 0) {
            delete cartItems[product.tag];
        }

        localStorage.setItem(cartItemsKey, JSON.stringify(cartItems));
    };

    const updateTotal = (product, decrease = false) => {
        let total = parseInt(localStorage.getItem(cartTotalKey)) || 0;
        total = decrease ? total - product.price : total + product.price;
        localStorage.setItem(cartTotalKey, total);
    };

    const updateCount = (product, decrease = false) => {
        let count = parseInt(localStorage.getItem(cartCountKey)) || 0;
        count = decrease ? count - 1 : count + 1;
        localStorage.setItem(cartCountKey, count);
    };

    const displayCart = () => {
        let cartItems = JSON.parse(localStorage.getItem(cartItemsKey)) || {};
        const productBox = document.querySelector(".products");
        const totalBox = document.querySelector(".total");

        if (productBox) {
            productBox.innerHTML = "";

            Object.values(cartItems).forEach(item => {
                productBox.innerHTML += `
                <div class="product"><span class="name">${item.name}</span></div>
                <div class="price">${item.price}.-</div>
                <div class="quantity">
                    <i class="fa-solid fa-circle-minus minus-btn" data-tag="${item.tag}"></i>
                    <span class="qty-incart">${item.inCart}</span>
                    <i class="fa-solid fa-circle-plus plus-btn" data-tag="${item.tag}"></i>
                </div>
                <div class="amount">${item.inCart * item.price}.-</div>
                <div class="x">
                    <i class="fa-solid fa-circle-xmark remove-btn" data-tag="${item.tag}"></i>
                </div>`;
            });

            const totalAmount = localStorage.getItem(cartTotalKey) || 0;
            totalBox.innerHTML = `
                <h5 class="col">Total Amount</h5>
                <h5 class="col total-cost">${totalAmount} FT</h5>
            `;
        }

        setupEventListeners();
        updateDisplayAmounts();
    };

    const setupEventListeners = () => {
        document.querySelectorAll(".plus-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const tag = btn.getAttribute("data-tag");
                const product = products.find(p => p.tag === tag);
                if (product) {
                    setItems(product);
                    updateTotal(product);
                    updateCount(product);
                    displayCart();
                }
            });
        });

        document.querySelectorAll(".minus-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const tag = btn.getAttribute("data-tag");
                const product = products.find(p => p.tag === tag);
                if (product) {
                    let cartItems = JSON.parse(localStorage.getItem(cartItemsKey)) || {};
                    if (cartItems[tag] && cartItems[tag].inCart > 0) {
                        setItems(product, true);
                        updateTotal(product, true);
                        updateCount(product, true);
                        displayCart();
                    }
                }
            });
        });

        document.querySelectorAll(".remove-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const tag = btn.getAttribute("data-tag");
                let cartItems = JSON.parse(localStorage.getItem(cartItemsKey)) || {};
                const product = products.find(p => p.tag === tag);
                if (cartItems[tag] && product) {
                    const qty = cartItems[tag].inCart;
                    const totalRemove = qty * product.price;
                    let cartNumbers = parseInt(localStorage.getItem(cartCountKey)) || 0;

                    localStorage.setItem(cartCountKey, cartNumbers - qty);
                    localStorage.setItem(cartTotalKey, parseInt(localStorage.getItem(cartTotalKey)) - totalRemove);
                    delete cartItems[tag];
                    localStorage.setItem(cartItemsKey, JSON.stringify(cartItems));

                    displayCart();
                }
            });
        });
    };

    // "Add to Cart" gombok kezelése
    document.querySelectorAll(".btn-food").forEach(btn => {
        btn.addEventListener("click", () => {
            const tag = btn.getAttribute("data-tag");
            const product = products.find(p => p.tag === tag);
            if (product) {
                setItems(product);
                updateTotal(product);
                updateCount(product);
                updateDisplayAmounts();
            }
        });
    });

    // Kezdő frissítés
    displayCart();
});