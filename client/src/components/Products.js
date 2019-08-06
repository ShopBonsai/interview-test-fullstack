import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import Filters from './Filters';
import ProductCard from './ProductCard';

import './../styles/components/products/products-feed.css';
import './../styles/components/products/products-card.css';

const GET_PRODUCTS = gql`
	{
		merchants {
			guid
			merchant
			brands
			publishedState
			products {
				id
				name
				price
				description
				color
				size
				image
				quantity
				belongsToBrand
			}
		}
	}
`;

const withProducts = Component => props => {
	return (
		<Query query={GET_PRODUCTS}>
			{({ loading, data }) => {
				return (
					<Component merchantsLoading={loading} merchants={data && data.merchants} {...props} />
				);
			}}
		</Query>
	);
};

class ProductsList extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			activeFilters: {
				brands: ['All Brands']
			},
			displayProduct: false
		}

		this.updateByFilters = this.updateByFilters.bind(this);
	}

	updateByFilters(e) {
		this.setState({
			activeFilters: { 
				// Filter the selected options from the rest and place their base value in an array.
				brands: [...e.target.options].filter(o => o.selected).map(o => o.value) 
			}
		});
	}

	showProducts() {
		const { merchants, merchantsLoading } = this.props;
		const { activeFilters, displayProduct } = this.state;
		let merchantsFiltered = [];

		// Once merchants are loaded and if there's actually merchants to do stuff 
		// with, do stuff.
		if (!merchantsLoading && merchants && merchants.length > 0) {

			// Remove any non-active brands from the merchants.
			if ( activeFilters.brands.length > 0 ) {
				merchantsFiltered = merchants.filter( merchant => {
					return merchant.brands.some(r => activeFilters.brands.indexOf(r) >= 0);
				})
			} else {
				// If there aren't any active brands, use all merchants.
				merchantsFiltered = merchants;
			}
			
			// If a filter list has "All Brands" within it, override any previous 
			// filtering and include all brands.
			if (activeFilters.brands[0] === "All Brands") {
				merchantsFiltered = merchants;
			}

			return merchantsFiltered.map(merchant => {
				const { products } = merchant;

				// Only display public merchants. Maybe disabled product display 
				// for non-active merchants? Not 100% sure on what this field is 
				// for.
				if ( merchant.publishedState ) {
					return products && products.length > 0 && products.map(product => {
						const { color, description, image, name, price, size, quantity, id, belongsToBrand } = product;

						// Display a product card for products who match the 
						// active filtered brands. If "All Brands" is selected, display everything.
						if (activeFilters.brands.length > 0 && activeFilters.brands.includes(merchant.brands[belongsToBrand]) || activeFilters.brands[0] === "All Brands") {
							return (
								<ProductCard product={product} key={id} />
							);
						// If "All Brands" is selected, display everything.
						} 
					})
				} 
			});
		} else {
			return (
				<div>
					<h3>No products available</h3>
				</div>
			);
		}
	}

	render() {
		return (
			<div className="products__feed">
				<Filters updateByFilters={this.updateByFilters} />
				{this.showProducts()}
			</div>
		);
	}
}
export default withProducts(ProductsList)
