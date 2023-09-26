// #Fill in the Product Listing Section in index.html
// Define prodect listing 
const products = [
    {
        name: "Product 1",
        description: "Description of Product 1",
        price: 19.99
    },
    {
        name: "Product 2",
        description: "Description of Product 2",
        price: 29.99
    }
];

// Function to add products to the products section
function addProductToSection(productName, productDescription, productPrice) {
    const productsSection = document.querySelector('.products');
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
        <h3>${productName}</h3>
        <p>${productDescription}</p>
        <p>Price: $${productPrice.toFixed(2)}</p>
        <button class="add-to-cart">Add to Cart</button>
    `;
    
    // Add an event listener to the "Add to Cart" button
    const addToCartButton = productDiv.querySelector('.add-to-cart');
    addToCartButton.addEventListener('click', () => {
        addToCart(productName, productPrice);
    });
    
    // Append the product to the products section
    productsSection.appendChild(productDiv);
}

// Function to add initial products to the products section
function addInitialProducts() {
    for (const product of products) {
        addProductToSection(product.name, product.description, product.price);
    }
}

// Initialize the product listing section
addInitialProducts();


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


// Define the cart object array
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
        
        total = total + (item.price * item.quantity);
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

// Initialize the cart display
updateCart();




// Function to remove an item from the cart==================================================
function removeFromCart(name) {
    const itemIndex = cart.findIndex(item => item.name === name);

    // Check the quantity of item in the cart and perform remove
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


// Function to display the cart details in an alert
function checkout() {
    let cartDetails = "Shopping Cart:\n";
    cart.forEach(item => {
        cartDetails = cartDetails + `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}\n`;
    });
    
    const cartTotal = document.querySelector('.cart-total').textContent;
    
    const thankYouMessage = "Thank you for shopping with us!";
    
    // Show the cart details in an alert
    alert(cartDetails + `\nTotal: ${cartTotal}\n\n${thankYouMessage}`);
    
    // Clear the cart
    cart.length = 0;
    
    // Update the cart display
    updateCart();
}

// Add event listener for the "Checkout" button
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.addEventListener('click', checkout);

