import React from 'react';
import { BaseCard } from './BaseCard';

const FoodCard = (props) => {
    const renderExtraInfo = () => {
        return (
            <span className="card-price">
                {props.price_range.split('').map((_, index) => (
                    <i key={index} className="fas fa-dollar-sign"></i>
                ))}
            </span>
        );
    };

    const renderModalContent = (food) => {
        return (
            <>
                <div>
                    <h4>Price Range</h4>
                    <p>{food.price_range}</p>
                </div>
                <div>
                    <h4>Cuisine Type</h4>
                    <p>{food.category}</p>
                </div>
                <div>
                    <h4>Best Time to Visit</h4>
                    <p>
                        {food.category === 'street_food' 
                            ? 'Evening (5:00 PM - 10:00 PM)'
                            : 'Lunch and Dinner (11:00 AM - 10:00 PM)'}
                    </p>
                </div>
                <div>
                    <h4>Specialties</h4>
                    <div className="modal-tags">
                        {['Spicy', 'Local Favorite', 'Must Try'].map((tag, index) => (
                            <span key={index} className="tag">
                                <i className="fas fa-utensils"></i>
                                {tag}
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

export default FoodCard; 