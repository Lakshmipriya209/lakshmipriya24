// Function to get products from Local Storage
function getProducts() {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
}

// Function to save products to Local Storage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Function to display products on the home page
function displayProducts() {
    const productList = document.getElementById('product-list');
    const products = getProducts();  // Get products from Local Storage
    productList.innerHTML = '';  // Clear previous content

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-item';
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>${product.description}</p>
        `;
        productList.appendChild(productDiv);
    });
}

// Function to handle product form submission
document.getElementById('add-product-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;

    const newProduct = {
        id: Date.now(),  // Unique ID using timestamp
        name,
        price,
        description
    };

    const products = getProducts();  // Get current products from Local Storage
    products.push(newProduct);  // Add new product
    saveProducts(products);  // Save updated products back to Local Storage

    alert('Product added successfully!');
    window.location.href = 'index.html';  // Redirect to home page
});

// Load products when page loads
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();  // Display products on home page load
});