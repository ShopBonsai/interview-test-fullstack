import React, { Component } from 'react';
import { CardTitle, CardSubtitle, CardText, Button, CardBody, Media, FormGroup, Label, Input, Alert } from 'reactstrap';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import Filters from './Filters';

import './../styles/components/products/products-feed.css';
import './../styles/components/products/products-card.css';


// import { Quantity } from './Product/Quantity';
// import './styles.css';

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

class Quantity extends Component {
	constructor(props) {
		super(props)
		const qty = this.props.quantity;
		const stock = qty > 0 ? true : false 

		this.state = {
			value: 1,
			quantity: qty,
			inStock: stock
		}

		this.qtyCounter = this.qtyCounter.bind(this);
	}

	qtyCounter(e){
		const qty = this.state.quantity;

		if ( !isNaN(Number(e.currentTarget.value)) && (e.currentTarget.value <= qty) && e.currentTarget.value >= 1) {
			this.setState({
				value: e.currentTarget.value
			})
		}
	}

	render(){
		const { value, qty, inStock } = this.state;

		return(
			<FormGroup>
				<Label for="quantity">Quantity</Label>
				{
					inStock === true 
						? <Input
							type="number"
							name="quantity"
							id="quantity"
							value={value}
							max={qty}
							onChange={this.qtyCounter}
						/>
						: <Alert color="warning">Out of stock!</Alert>
				}
			</FormGroup>
		)
	}
}

class ProductsList extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			activeFilters: {
				brands: []
			}
		}

		this.updateByFilters = this.updateByFilters.bind(this);
	}

	updateByFilters(e) {
		this.setState({
			activeFilters: { 
				brands: [...e.target.options].filter(o => o.selected).map(o => o.value) 
			}
		});
	}

	showProducts() {
		const { merchants, merchantsLoading } = this.props;
		const { activeFilters } = this.state;
		let merchantsFiltered = [];

		if (!merchantsLoading && merchants && merchants.length > 0) {

			if ( activeFilters.brands.length > 0 ) {
				merchantsFiltered = merchants.filter( merchant => {
					return merchant.brands.some(r => activeFilters.brands.indexOf(r) >= 0);
				})
			} else {
				merchantsFiltered = merchants;
			}

			if (activeFilters.brands[0] === "All Brands") {
				merchantsFiltered = merchants;
			}

			return merchantsFiltered.map(merchant => {
				const { products } = merchant;

				if ( merchant.publishedState ) {
					return products && products.length > 0 && products.map(product => {
						const { color, description, image, name, price, size, quantity, id, belongsToBrand } = product;

						if (activeFilters.brands.length > 0 && activeFilters.brands.includes(merchant.brands[belongsToBrand])) {
							return (
								<Media key={product.id} className="products__card" data-brand={id}>
								<Media left href="#">
									<Media object src={image} alt="Product image cap" /></Media>
									<CardBody>
										<CardTitle style={{fontWeight: 600}}>{name}</CardTitle>
										<CardTitle>Price: ${price.toFixed(2)}</CardTitle>
										<CardSubtitle>Color: {color}</CardSubtitle>
										<CardSubtitle>Size: {size}</CardSubtitle>
										<Quantity quantity={quantity} />
										<CardText>Details: {description}</CardText>
										<Button color="primary" size="lg" block onClick={ () => this.buyProduct(id) }>Buy</Button>
									</CardBody>
								</Media>
							);
						} else if (activeFilters.brands[0] === "All Brands") {
							return (
								<Media key={product.id} className="products__card" data-brand={id}>
								<Media left href="#">
									<Media object src={image} alt="Product image cap" /></Media>
									<CardBody>
										<CardTitle style={{fontWeight: 600}}>{name}</CardTitle>
										<CardTitle>Price: ${price.toFixed(2)}</CardTitle>
										<CardSubtitle>Color: {color}</CardSubtitle>
										<CardSubtitle>Size: {size}</CardSubtitle>
										<Quantity quantity={quantity} />
										<CardText>Details: {description}</CardText>
										<Button color="primary" size="lg" block onClick={ () => this.buyProduct(id) }>Buy</Button>
									</CardBody>
								</Media>
							);
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
