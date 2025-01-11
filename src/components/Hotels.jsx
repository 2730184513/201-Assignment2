import React from 'react';
import { BaseList } from './BaseList';
import HotelCard from './HotelCard';

class Hotels extends BaseList {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            priceFilter: 'all'
        };
    }

    getDataUrl() {
        return '/data/hotels.csv';
    }

    getComponentName() {
        return 'Hotels';
    }

    parseRow(row) {
        const values = row.split(',');
        return {
            id: values[0],
            name: values[1],
            description: values[2],
            category: values[3],
            location: values[4],
            price_range: values[5],
            rating: values[6],
            amenities: values[7]?.replace(/"/g, '') || '',
            type: 'hotel'
        };
    }

    getFilterOptions() {
        return [
            { value: 'luxury', label: 'Luxury' },
            { value: 'resort', label: 'Resort' },
            { value: 'boutique', label: 'Boutique' },
            { value: 'business', label: 'Business' },
            { value: 'modern', label: 'Modern' },
            { value: 'budget', label: 'Budget' }
        ];
    }

    getPriceLevels() {
        return [
            { value: 'budget', label: 'Budget', symbol: '$$' },
            { value: 'mid', label: 'Mid-Range', symbol: '$$$' },
            { value: 'high', label: 'High-End', symbol: '$$$$' },
            { value: 'luxury', label: 'Ultra Luxury', symbol: '$$$$$' }
        ];
    }

    filterCondition(item) {
        const categoryMatch = this.state.filter === 'all' || item.category === this.state.filter;
        const priceMatch = this.state.priceFilter === 'all' || 
            item.price_range === this.getPriceLevels().find(level => level.value === this.state.priceFilter)?.symbol;
        return categoryMatch && priceMatch;
    }

    getPriceFilterValue(item) {
        const level = this.getPriceLevels().find(level => level.symbol === item.price_range);
        return level ? level.value : 'all';
    }

    getFilterTitle() {
        return 'Hotel Type';
    }

    updateAvailableFilters() {
        const { items } = this.state;
        const availableFilters = new Set();
        const availablePriceFilters = new Set();

        items.forEach(item => {
            const priceLevel = this.getPriceLevels().find(level => level.symbol === item.price_range);
            if (priceLevel) {
                if (this.state.priceFilter === 'all') {
                    availableFilters.add(item.category);
                } else if (item.price_range === this.getPriceLevels().find(level => level.value === this.state.priceFilter)?.symbol) {
                    availableFilters.add(item.category);
                }

                if (this.state.filter === 'all') {
                    availablePriceFilters.add(priceLevel.value);
                } else if (item.category === this.state.filter) {
                    availablePriceFilters.add(priceLevel.value);
                }
            }
        });

        this.setState({ availableFilters, availablePriceFilters });
    }

    renderAdditionalFilters() {
        return (
            <div className="filter-group">
                <h4>Price Range</h4>
                <div className="filter-buttons">
                    <button
                        className={`filter-button ${this.state.priceFilter === 'all' ? 'active' : ''}`}
                        onClick={() => this.handlePriceFilterChange('all')}
                    >
                        All
                    </button>
                    {this.getPriceLevels().map(level => {
                        const isDisabled = this.state.filter !== 'all' && 
                            !this.state.availablePriceFilters.has(level.value);
                        return (
                            <button
                                key={level.value}
                                className={`filter-button ${this.state.priceFilter === level.value ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
                                onClick={() => !isDisabled && this.handlePriceFilterChange(level.value)}
                                disabled={isDisabled}
                            >
                                {level.label} ({level.symbol})
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default () => <Hotels itemComponent={HotelCard} />; 