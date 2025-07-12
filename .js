document.addEventListener('DOMContentLoaded', function() { const cartIcon = document.getElementById('cart-icon'); const cartModal = document.getElementById('cart-modal'); const closeCart = document.getElementById('close-cart'); const overlay = document.getElementById('overlay'); const cartItemsContainer = document.getElementById('cart-items'); const cartTotalElement = document.getElementById('cart-total'); const checkoutBtn = document.getElementById('checkout-btn'); const addToCartButtons = document.querySelectorAll('.add-to-cart'); const cartCount = document.querySelector('.cart-count');

let cartItems = [];
let total = 0;

cartIcon.addEventListener('click', () => {
    cartModal.classList.add('active');
    overlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    cartModal.classList.remove('active');
    overlay.classList.remove('active');
});

function initCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCart();
    }
}

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = parseInt(button.dataset.price);

        const existingItem = cartItems.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ id, name, price, quantity: 1 });
        }

        saveCart();
        updateCart();
        alert(`${name} telah ditambahkan ke keranjang!`);
    });
});

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

function updateCart() {
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Keranjang belanja anda kosong.</p>';
    } else {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cartItems.forEach(item => {
            totalPrice += item.price * item.quantity;
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/50370460-8c37-4de6-be25-c4eb7e4e4419.png" class="cart-item-image" alt="Gambar produk ${item.name}">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')} x ${item.quantity}</p>
                    <button class="remove-item" data-id="${item.id}">Hapus</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });

        cartTotalElement.textContent = `Rp ${totalPrice.toLocaleString('id-ID')}`;
        total = totalPrice;

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.dataset.id;
                cartItems = cartItems.filter(item => item.id !== id);
                saveCart();
                updateCart();
            });
        });
    }

    const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
    cartCount.textContent = itemCount;
    cartCount.style.display = itemCount > 0 ? 'flex' : 'none';
}

checkoutBtn.addEventListener('click', () => {
    if (cartItems.length === 0) {
        alert('Keranjang belanja anda kosong.');
    } else {
        alert(`Terima kasih telah berbelanja! Total pembelian: Rp ${total.toLocaleString('id-ID')}`);
        cartItems = [];
        saveCart();
        updateCart();
        cartModal.classList.remove('active');
        overlay.classList.remove('active');
    }
});

initCart();

});

