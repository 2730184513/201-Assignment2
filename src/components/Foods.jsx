import React from 'react';
import { BaseList } from './BaseList';
import FoodCard from './FoodCard';

class Foods extends BaseList {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            priceFilter: 'all'
        };
    }

    getDataUrl() {
        return '/data/foods.csv';
    }

    getComponentName() {
        return 'Foods';
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
            type: 'food'
        };
    }

    getFilterOptions() {
        return [
            { value: 'street_food', label: 'Street Food' },
            { value: 'local', label: 'Local' },
            { value: 'chinese', label: 'Chinese' },
            { value: 'malay', label: 'Malay' }
        ];
    }

    getPriceLevels() {
        return [
            { value: 'budget', label: 'Budget', symbol: '$' },
            { value: 'mid', label: 'Mid-Range', symbol: '$$' },
            { value: 'high', label: 'High-End', symbol: '$$$' }
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
        return 'Cuisine Type';
    }

    updateAvailableFilters() {
        const { items } = this.state;
        const availableFilters = new Set();
        const availablePriceFilters = new Set();

        items.forEach(item => {
            const itemPriceValue = this.getPriceFilterValue(item);
            
            if (this.state.priceFilter === 'all') {
                availableFilters.add(item.category);
            } else if (itemPriceValue === this.state.priceFilter) {
                availableFilters.add(item.category);
            }

            if (this.state.filter === 'all') {
                availablePriceFilters.add(itemPriceValue);
            } else if (item.category === this.state.filter) {
                availablePriceFilters.add(itemPriceValue);
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

export default () => <Foods itemComponent={FoodCard} />; 