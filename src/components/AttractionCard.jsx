import React from 'react';
import {BaseCard} from './BaseCard';

const AttractionCard = (props) => {
    const renderExtraInfo = () => {
        return (
            <span className="card-type">
                <i className="fas fa-map"></i>
                {props.type}
            </span>
        );
    };

    const renderModalContent = (attraction) => {
        return (
            <>
                <div>
                    <h4>Type</h4>
                    <p>{attraction.type}</p>
                </div>
                <div>
                    <h4>Best Time to Visit</h4>
                    <p>Morning to Evening (9:00 AM - 6:00 PM)</p>
                </div>
                <div>
                    <h4>Tips</h4>
                    <ul>
                        <li>Bring comfortable walking shoes</li>
                        <li>Carry water and sunscreen</li>
                        <li>Respect local customs and dress codes</li>
                    </ul>
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

export default AttractionCard; 