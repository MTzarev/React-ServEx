function AddPrice(e) {
    let newPrice = e.target.value.trim();
    if (newPrice && !isNaN(newPrice)) {
        const updatedPrices = [...customPrices, parseFloat(newPrice)];
        setCustomPrices(updatedPrices);

        // Send the new price to the server
        const API_URL = 'http://localhost:3000';
        fetch(`${API_URL}/customPrices`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ price: parseFloat(newPrice) }),
        }).catch(err => console.error('Error:', err));
    }
    e.target.value = ''; 
}