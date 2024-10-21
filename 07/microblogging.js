// Sample product data (could be from a JSON file or API)
const products = [
    { id: 1, name: 'Used Laptop', price: 300, description: 'A slightly used laptop.' },
    { id: 2, name: 'Old TV', price: 50, description: 'A CRT television, works fine.' }
];

// Function to display products on the page
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear the list

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-item';
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>${product.description}</p>
            <button onclick="viewProduct(${product.id})">View</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Function to view a product's details
function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    alert(`Product: ${product.name}\nPrice: $${product.price}\nDescription: ${product.description}`);
}

// Initialize the page by displaying products
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});
