import { useEffect, useState } from 'react';

function ParkingPrice() {
    const [price, setPrice] = useState(null); // Tracks the total price
    const [customPrices, setCustomPrices] = useState(() => {
        // Load custom prices from localStorage on initialization
        const savedPrices = localStorage.getItem('customPrices');
        return savedPrices ? JSON.parse(savedPrices) : [];
    });

    // Add a new custom price
    function AddPrice(e) {
        let newPrice = e.target.value.trim();
        if (newPrice && !isNaN(newPrice)) {
            const updatedPrices = [...customPrices, parseFloat(newPrice)];
            setCustomPrices(updatedPrices);
            localStorage.setItem('customPrices', JSON.stringify(updatedPrices)); // Save to localStorage
        }
        e.target.value = ''; 
    }

    useEffect(() => {
        const API_URL = 'http://localhost:3000';
    
        
        fetch(`${API_URL}/ParkingPrice`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ totalPrice: 6 }), 
        })
            .then(res => res.json())
            .then(data => setPrice(data.totalPrice))
            .catch(err => console.error('Error:', err));
    
        // Fetch custom prices
        fetch(`${API_URL}/customPrices`)
            .then(res => res.json())
            .then(data => setCustomPrices(data.customPrices || [])) // Server should return `{ customPrices: [...] }`
            .catch(err => console.error('Error:', err));
    }, []);
    return (
        <div>
            {/* Display the fetched price */}
            {price !== null ? (
                <p>The total parking price is: ${price}</p>
            ) : (
                <p>Loading...</p>
            )}

            {/* Input for adding custom prices */}
            <input
                type="text"
                placeholder="Add custom price"
                onBlur={AddPrice}
            />
            
            {/* Display custom prices */}
            <ul>
                {customPrices.map((customPrice, index) => (
                    <li key={index}>Custom price: ${customPrice}</li>
                ))}
            </ul>
        </div>
    );
}

export default ParkingPrice;