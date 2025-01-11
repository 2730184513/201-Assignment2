import React from 'react';
import './BaseCard.css';

const BaseCard = ({ 
    id,
    name, 
    description, 
    category, 
    type,
    location, 
    rating, 
    renderExtraInfo,
    renderModalContent 
}) => {
    const truncateDescription = (text, maxLength = 100) => {
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    const getImagePath = (itemId, itemType) => {
        const folderName = itemType === 'food' ? 'foods' : 
                          itemType === 'hotel' ? 'hotels' : 'attractions';
        return `/data/${folderName}/${itemId}.jpg`;
    };

    return (
        <div className="base-card">
            <div className="card-image" style={{ backgroundImage: `url(${getImagePath(id, type)})` }}>
                <div className="card-category">{category || type}</div>
            </div>
            <div className="card-content">
                <h3>{name}</h3>
                <p className="card-description">{truncateDescription(description)}</p>
                <div className="card-footer">
                    <span className="card-location">
                        <i className="fas fa-map-marker-alt"></i> {location}
                    </span>
                    <div className="card-info">
                        {renderExtraInfo && renderExtraInfo()}
                        <span className="card-rating">
                            <i className="fas fa-star"></i> {rating}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BaseModal = ({ item, onClose, renderModalContent }) => {
    const getImagePath = (itemId, itemType) => {
        const folderName = itemType === 'food' ? 'foods' : 
                          itemType === 'hotel' ? 'hotels' : 'attractions';
        return `/data/${folderName}/${itemId}.jpg`;
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>
                <img 
                    src={getImagePath(item.id, item.type)} 
                    alt={item.name}
                    className="modal-image"
                />
                <div className="modal-details">
                    <h2>{item.name}</h2>
                    <p className="modal-description">{item.description}</p>
                    <div>
                        <h4>Location</h4>
                        <p><i className="fas fa-map-marker-alt"></i> {item.location}</p>
                    </div>
                    <div>
                        <h4>Category</h4>
                        <p>{item.category || item.type}</p>
                    </div>
                    <div>
                        <h4>Rating</h4>
                        <p><i className="fas fa-star"></i> {item.rating}</p>
                    </div>
                    {renderModalContent && renderModalContent(item)}
                </div>
            </div>
        </div>
    );
};

export { BaseCard, BaseModal }; 