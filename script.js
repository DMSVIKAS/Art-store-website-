// Load Cart from Local Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to Add Items to Cart
function addToCart(item, price) {
    cart.push({ item, price });
    localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage
    alert(item + " added to cart for $" + price);
    updateCartUI();
}

// Function to Update Cart Display
function updateCartUI() {
    let cartSection = document.getElementById("cart");
    if (!cartSection) {
        cartSection = document.createElement("section");
        cartSection.id = "cart";
        cartSection.innerHTML = `
            <h2>Shopping Cart</h2>
            <div class='cart-items'></div>
            <p id='total'></p>
            <button onclick='checkout()'>Checkout</button>
        `;
        document.body.appendChild(cartSection);
    }

    let cartItemsDiv = cartSection.querySelector(".cart-items");
    cartItemsDiv.innerHTML = "";

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        cartItemsDiv.innerHTML += `
            <p>${item.item} - $${item.price} 
                <button onclick="removeFromCart(${index})">Remove</button>
            </p>
        `;
    });

    // Apply Discount if 2 or More Items are in the Cart
    let discount = 0;
    if (cart.length >= 2) {
        discount = total * 0.1; // 10% Discount
        total -= discount;
    }

    document.getElementById("total").innerHTML = `
        <strong>Total: $${total.toFixed(2)}</strong> 
        ${discount > 0 ? `<br> <span style="color: white;">(10% Discount Applied!)</span>` : ""}
    `;
}

// Function to Remove Items from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
    updateCartUI();
}

// Function to Checkout (Redirect to Checkout Page in Same Window)
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Save cart data to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Redirect to checkout.html in the same window
    window.location.href = 'checkout.html';
}

// Update UI on Page Load
document.addEventListener("DOMContentLoaded", updateCartUI);
