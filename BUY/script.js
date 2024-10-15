document.getElementById('itemForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const itemName = document.getElementById('itemName').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const itemDescription = document.getElementById('itemDescription').value;

    const itemList = document.getElementById('itemList');

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    itemDiv.innerHTML = `
        <h3>${itemName}</h3>
        <p>Price: $${itemPrice}</p>
        <p>${itemDescription}</p>
    `;

    itemList.appendChild(itemDiv);

    // Clear form fields
    document.getElementById('itemForm').reset();
});
