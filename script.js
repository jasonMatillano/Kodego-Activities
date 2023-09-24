// Define the cart object 
const cart = [];

// Function to update the cart's HTML content
function updateCart() {
    const cartItemsList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    
    // Clear the current cart content
    cartItemsList.innerHTML = '';
    
    let total = 0;
    
    // Loop through each item in the cart and update the HTML
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)} x ${item.quantity} 
            <button class="remove-from-cart" data-name="${item.name}">Remove</button>
        `;
        cartItemsList.appendChild(cartItem);
        
        total += item.price * item.quantity;
    });
    
    // Update the total price
    cartTotal.textContent = `$${total.toFixed(2)}`;
    
    // Add event listeners for the remove buttons
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const itemName = e.target.getAttribute('data-name');
            removeFromCart(itemName);
        });
    });
}

// Function to add an item to the cart
function addToCart(name, price) {
    // Check if the item is already in the cart
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    
    // Update the cart display
    updateCart();
}

// Function to remove an item from the cart
function removeFromCart(name) {
    const itemIndex = cart.findIndex(item => item.name === name);
    
    if (itemIndex !== -1) {
        const item = cart[itemIndex];
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            cart.splice(itemIndex, 1);
        }
    }
    
    // Update the cart display
    updateCart();
}

// Add event listeners for the "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productDiv = button.closest('.product');
        const productName = productDiv.querySelector('h2').textContent;
        const productPrice = parseFloat(productDiv.querySelector('.price').textContent.replace('$', ''));
        addToCart(productName, productPrice);
    });
});


// Function to display the cart details in an alert
function checkout() {
    let cartDetails = "Shopping Cart:\n";
    cart.forEach(item => {
        cartDetails += `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}\n`;
    });
    
    const cartTotal = parseFloat(document.querySelector('.cart-total').textContent.replace('$', ''));
    
    const thankYouMessage = "Thank you for shopping with us!";
    
    // Show the cart details in an alert
    alert(cartDetails + `\nTotal: $${cartTotal.toFixed(2)}\n\n${thankYouMessage}`);
    
    // Clear the cart
    cart.length = 0;
    
    // Update the cart display
    updateCart();
}

// Add event listener for the "Checkout" button
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.addEventListener('click', checkout);

// Initialize the cart display
updateCart();
