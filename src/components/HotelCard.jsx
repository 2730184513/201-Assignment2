import React from 'react';
import { BaseCard } from './BaseCard';

const HotelCard = (props) => {
    const renderExtraInfo = () => {
        return (
            <span className="card-price">
                {props.price_range.split('').map((_, index) => (
                    <i key={index} className="fas fa-dollar-sign"></i>
                ))}
            </span>
        );
    };

    const renderModalContent = (hotel) => {
        const getAmenityIcon = (amenity) => {
            const icons = {
                'pool': 'swimming-pool',
                'spa': 'spa',
                'restaurant': 'utensils',
                'wifi': 'wifi',
                'beach': 'umbrella-beach',
                'gym': 'dumbbell',
                'garden': 'leaf',
                'heritage': 'landmark'
            };
            return icons[amenity] || 'check';
        };

        return (
            <>
                <div>
                    <h4>Price Range</h4>
                    <p>{hotel.price_range}</p>
                </div>
                <div>
                    <h4>Amenities</h4>
                    <div className="modal-amenities">
                        {hotel.amenities.split(',').map((amenity, index) => (
                            <span key={index} className="tag">
                                <i className={`fas fa-${getAmenityIcon(amenity)}`}></i>
                                {amenity}
                            </span>
                        ))}
                    </div>
                </div>
            </>
        );
    };

    return (
        <BaseCard
            {...props}
            renderExtraInfo={renderExtraInfo}
            renderModalContent={renderModalContent}
        />
    );
};

export default HotelCard; 