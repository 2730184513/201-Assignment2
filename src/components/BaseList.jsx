import React from 'react';
import { BaseModal } from './BaseCard';
import '../styles/BaseList.css';

export class BaseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            filter: 'all',
            selectedItem: null,
            availableFilters: new Set(),
            availablePriceFilters: new Set(),
            canScrollLeft: false,
            canScrollRight: true
        };
        this.listRef = React.createRef();
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        fetch(this.getDataUrl())
            .then(response => response.text())
            .then(data => {
                const [headers, ...rows] = data.split('\n');
                const parsedData = rows.filter(row => row.trim()).map(row => this.parseRow(row));
                this.setState({ items: parsedData }, () => {
                    this.updateAvailableFilters();
                });
            })
            .catch(error => console.error(`Error loading ${this.getComponentName()}:`, error));
    }

    handleScroll = () => {
        if (this.listRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = this.listRef.current;
            this.setState({
                canScrollLeft: scrollLeft > 0,
                canScrollRight: scrollLeft < scrollWidth - clientWidth - 10
            });
        }
    };

    scrollLeft = () => {
        if (this.listRef.current) {
            this.listRef.current.scrollBy({
                left: -340,
                behavior: 'smooth'
            });
        }
    };

    scrollRight = () => {
        if (this.listRef.current) {
            this.listRef.current.scrollBy({
                left: 340,
                behavior: 'smooth'
            });
        }
    };

    updateAvailableFilters() {
        const { items } = this.state;
        const availableFilters = new Set();
        const availablePriceFilters = new Set();

        items.forEach(item => {
            if (this.state.priceFilter === 'all' || !this.state.priceFilter) {
                availableFilters.add(item.category || item.type);
            } else if (this.getPriceFilterValue?.(item) === this.state.priceFilter) {
                availableFilters.add(item.category || item.type);
            }

            if (this.state.filter === 'all') {
                if (this.getPriceFilterValue) {
                    availablePriceFilters.add(this.getPriceFilterValue(item));
                }
            } else if ((item.category || item.type) === this.state.filter) {
                if (this.getPriceFilterValue) {
                    availablePriceFilters.add(this.getPriceFilterValue(item));
                }
            }
        });

        this.setState({ availableFilters, availablePriceFilters });
    }

    getDataUrl() {
        throw new Error('getDataUrl must be implemented');
    }

    getComponentName() {
        throw new Error('getComponentName must be implemented');
    }

    parseRow(row) {
        throw new Error('parseRow must be implemented');
    }

    getFilterOptions() {
        throw new Error('getFilterOptions must be implemented');
    }

    filterItems(items) {
        return items.filter(item => this.filterCondition(item));
    }

    filterCondition(item) {
        throw new Error('filterCondition must be implemented');
    }

    handleItemClick = (item) => {
        this.setState({ selectedItem: item });
    };

    closeModal = () => {
        this.setState({ selectedItem: null });
    };

    handleFilterChange = (filter) => {
        this.setState({ filter }, () => {
            this.updateAvailableFilters();
        });
    };

    handlePriceFilterChange = (priceFilter) => {
        this.setState({ priceFilter }, () => {
            this.updateAvailableFilters();
        });
    };

    renderFilterButtons() {
        const filterOptions = this.getFilterOptions();
        return (
            <div className="filter-group">
                <h4>{this.getFilterTitle()}</h4>
                <div className="filter-buttons">
                    <button
                        className={`filter-button ${this.state.filter === 'all' ? 'active' : ''}`}
                        onClick={() => this.handleFilterChange('all')}
                    >
                        All
                    </button>
                    {filterOptions.map(option => {
                        const isDisabled = this.state.priceFilter && 
                            this.state.priceFilter !== 'all' && 
                            !this.state.availableFilters.has(option.value);
                        return (
                            <button
                                key={option.value}
                                className={`filter-button ${this.state.filter === option.value ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
                                onClick={() => !isDisabled && this.handleFilterChange(option.value)}
                                disabled={isDisabled}
                            >
                                {option.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    getFilterTitle() {
        return 'Filter By';
    }

    render() {
        const { items, selectedItem, filter, canScrollLeft, canScrollRight } = this.state;
        const filteredItems = this.filterItems(items, filter);
        const ItemComponent = this.props.itemComponent;

        return (
            <div className="list-container">
                <div className="list-filters">
                    {this.renderFilterButtons()}
                    {this.renderAdditionalFilters?.()}
                </div>
                <button 
                    className={`scroll-button left ${!canScrollLeft ? 'hidden' : ''}`}
                    onClick={this.scrollLeft}
                    aria-label="Scroll left"
                >
                    <i className="fas fa-chevron-left"></i>
                </button>
                <button 
                    className={`scroll-button right ${!canScrollRight ? 'hidden' : ''}`}
                    onClick={this.scrollRight}
                    aria-label="Scroll right"
                >
                    <i className="fas fa-chevron-right"></i>
                </button>
                <div 
                    className="list-grid" 
                    ref={this.listRef}
                    onScroll={this.handleScroll}
                >
                    {filteredItems.map(item => (
                        <div key={item.id} onClick={() => this.handleItemClick(item)}>
                            <ItemComponent {...item} />
                        </div>
                    ))}
                </div>

                {selectedItem && (
                    <BaseModal
                        item={selectedItem}
                        onClose={this.closeModal}
                        renderModalContent={this.props.renderModalContent}
                    />
                )}
            </div>
        );
    }
} 