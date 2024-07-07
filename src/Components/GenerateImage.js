import React, { useState } from 'react';

function GenerateImage() {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ inputValue }),
            });

            if (response.ok) {
                // Handle successful response
            } else {
                // Handle error response
            }
        } catch (error) {
            // Handle network error
        }
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={inputValue} onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    );
}

export default GenerateImage;