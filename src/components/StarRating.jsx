import React, { useState } from 'react';

// StarRating Component
const StarRating = ({ rating, onChange }) => {
    const [hovered, setHovered] = useState(0); // State to manage the hover effect

    // Array of star ratings
    const stars = [1, 2, 3, 4, 5];

    // Handle star click
    const handleClick = (value) => {
        onChange(value);
    };

    // Handle star hover
    const handleMouseEnter = (value) => {
        setHovered(value);
    };

    // Handle mouse leave
    const handleMouseLeave = () => {
        setHovered(0);
    };

    return (
        <div className="flex space-x-1">
            {stars.map((value) => (
                <Star
                    key={value}
                    filled={value <= (hovered || rating)}
                    onClick={() => handleClick(value)}
                    onMouseEnter={() => handleMouseEnter(value)}
                    onMouseLeave={handleMouseLeave}
                />
            ))}
        </div>
    );
};

// Star Component
const Star = ({ filled, onClick, onMouseEnter, onMouseLeave }) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={filled ? "gold" : "gray"}
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="cursor-pointer"
    >
        <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
    </svg>
);

export default StarRating;
