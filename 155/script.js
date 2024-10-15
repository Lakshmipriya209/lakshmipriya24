document.getElementById('itemForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get values from the form
    const itemName = document.getElementById('itemName').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const itemDescription = document.getElementById('itemDescription').value;
    const itemCategory = document.getElementById('itemCategory').value;
    const sellerName = document.getElementById('sellerName').value;
    const contactInfo = document.getElementById('contactInfo').value;

    // Create a new item div
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    itemDiv.setAttribute('data-category', itemCategory); // Store the category

    itemDiv.innerHTML = `
        <h3>${itemName}</h3>
        <p>Price: $${itemPrice}</p>
        <p>${itemDescription}</p>
        <p>Category: ${itemCategory.charAt(0).toUpperCase() + itemCategory.slice(1)}</p>
        <p>Seller: ${sellerName}</p>
        <p>Contact: ${contactInfo}</p>
        <button class="inquiryButton">Inquire</button>
    `;

    // Append the new item to the item list
    document.getElementById('itemList').appendChild(itemDiv);

    // Clear the form fields
    document.getElementById('itemForm').reset();

    // Filter items based on the selected category
    filterItems();

    // Add inquiry button event
    itemDiv.querySelector('.inquiryButton').addEventListener('click', function() {
        openInquiryModal(sellerName, contactInfo);
    });
});

// Filter items by category
document.getElementById('filter').addEventListener('change', filterItems);

function filterItems() {
    const filterValue = document.getElementById('filter').value;
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        if (filterValue === '' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block'; // Show item
        } else {
            item.style.display = 'none'; // Hide item
        }
    });
}

// Modal for inquiries
const modal = document.getElementById('inquiryModal');
const closeModal = document.getElementsByClassName('close')[0];

function openInquiryModal(sellerName, contactInfo) {
    modal.style.display = 'block';
    document.getElementById('sendInquiry').onclick = function() {
        const inquiryMessage = document.getElementById('inquiryMessage').value;
        alert(`Inquiry sent to ${sellerName} at ${contactInfo}:\n"${inquiryMessage}"`);
        modal.style.display = 'none'; // Close modal
        document.getElementById('inquiryMessage').value = ''; // Clear message
    };
}

closeModal.onclick = function() {
    modal.style.display = 'none'; // Close modal
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none'; // Close modal if clicked outside
    }
}
