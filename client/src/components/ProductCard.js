import React, { Component } from 'react';
import { CardTitle, Button, CardBody, Media } from 'reactstrap';
import Product from './ProductFull';
import Quantity from './Quantity';
import Popup from './Popup';

import './../styles/components/products/products-inner.css';	
import './../styles/components/products/popup.css';	

export default class ProductCard extends Component {
	constructor(props) {
		super(props)

		this.state = {
			displayProduct: false,
			cartPopup: false,
			qtyVal: 1
		}

		this.viewProduct = this.viewProduct.bind(this);
		this.addToCart = this.addToCart.bind(this);		
		this.getSelectedQty = this.getSelectedQty.bind(this);		
	}

	viewProduct() {
		this.setState({
			displayProduct: !this.state.displayProduct
		})
	}

	addToCart(product) {
		this.setState({
			cartPopup: true
		})

		setTimeout(() => {
			this.setState({
				cartPopup: false
			})
		}, 2000)
	}

	getSelectedQty(selectedQty) {
		this.setState({
			qtyVal: selectedQty
		})
	}

	render() {
		const { displayProduct, cartPopup } = this.state;
		const { product } = this.props;
		const { color, description, image, name, price, size, quantity, id, belongsToBrand } = product;

		if ( displayProduct === true ) {
			document.body.style = {
				'overflowX': 'hidden',
				'overflowY': 'hidden',
			}
		} else {document.body.style = {
				'overflowX': 'auto',
				'overflowY': 'auto',
			}
		}
		
		return (
			<React.Fragment>
				<Media key={product.id} className="products__card">
					<Media href="#">
						<Media object src={image} alt="Product image cap" onClick={ () => this.viewProduct() }/>
					</Media>
					<CardBody>
						<CardTitle className="product__title" onClick={ () => this.viewProduct() }>{name}</CardTitle>
						<CardTitle className="product__price">${price.toFixed(2)}</CardTitle>
						<Quantity quantity={quantity} getSelectedQty={this.getSelectedQty} />
						{
							quantity !== 0 
								? <Button color="primary" size="lg" block onClick={ () => this.addToCart(product) }>
									Add to Cart
									{
										cartPopup === true
											? <Popup product={product.name} selectedQty={this.state.selectedQty} qtyVal={this.state.qtyVal}/>
											: null
									}
									</Button>
								: null
						}
					</CardBody>
				</Media>
				{
					displayProduct === true 
						? <Product 
							product={product} 
							viewProduct={this.viewProduct} 
							addToCart={this.addToCart} 
							cartPopup={cartPopup}
							getSelectedQty={this.getSelectedQty}
							qtyVal={this.state.qtyVal}
						/> 
						: null
				}
			</React.Fragment>
		)
	}
}