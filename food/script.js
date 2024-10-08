let cart = {};
let totalPrice = 0;

function addToCart(dishName, price) {
    if (cart[dishName]) {
        cart[dishName].quantity++;
    } else {
        cart[dishName] = { price, quantity: 1 };
    }
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    totalPrice = 0;

    for (let dishName in cart) {
        const item = cart[dishName];
        const li = document.createElement('li');
        li.textContent = `${dishName} - ${item.quantity} x $${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
        totalPrice += item.price * item.quantity;
    }

    document.getElementById('totalPrice').textContent = `$${totalPrice.toFixed(2)}`;
}

function checkout() {
    if (Object.keys(cart).length > 0) {
        document.getElementById('cart').style.display = 'none';
        document.getElementById('orderConfirmation').style.display = 'block';
    } else {
        alert('Your cart is empty!');
    }
}

function confirmOrder() {
    alert('Your order has been confirmed!');
    cart = {};
    updateCart();
    document.getElementById('cart').style.display = 'block';
    document.getElementById('orderConfirmation').style.display = 'none';
}

// Set restaurant name dynamically
function setRestaurantName() {
    const params = new URLSearchParams(window.location.search);
    const restaurantId = params.get('restaurant');
    const restaurantNames = {
        1: 'Restaurant 1',
        2: 'Restaurant 2'
    };
    
    document.getElementById('restaurantName').textContent = restaurantNames[restaurantId] || 'Restaurant Menu';
}

// Call this function when the restaurant page loads
window.onload = setRestaurantName;
