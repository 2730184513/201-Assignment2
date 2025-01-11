import React from 'react';
import { BaseList } from './BaseList';
import AttractionCard from './AttractionCard';

class Attractions extends BaseList {
    getDataUrl() {
        return '/data/attractions.csv';
    }

    getComponentName() {
        return 'Attractions';
    }

    parseRow(row) {
        const values = row.split(',');
        return {
            id: values[0],
            name: values[1],
            description: values[2],
            type: values[3],
            image_url: values[4],
            location: values[5],
            rating: values[6]
        };
    }

    getFilterOptions() {
        return [
            { value: 'religious', label: 'Religious' },
            { value: 'historical', label: 'Historical' },
            { value: 'nature', label: 'Nature' },
            { value: 'beach', label: 'Beach' },
            { value: 'museum', label: 'Museum' }
        ];
    }

    filterCondition(item) {
        return this.state.filter === 'all' || item.type === this.state.filter;
    }

    getFilterTitle() {
        return 'Attraction Type';
    }

    updateAvailableFilters() {
        const { items } = this.state;
        const availableFilters = new Set();

        items.forEach(item => {
            availableFilters.add(item.type);
        });

        this.setState({ availableFilters });
    }
}

export default () => <Attractions itemComponent={AttractionCard} />; 