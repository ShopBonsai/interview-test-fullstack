import React, { Component } from 'react';
import { CardTitle, CardSubtitle, CardText, Button, CardBody, Media } from 'reactstrap';
import Popup from './Popup';
import Quantity from './Quantity';

export default class Product extends Component {
	constructor(props) {
		super(props) 
	}

	closeProduct() {
		this.props.viewProduct();
	}

	addToCartParent() {
		this.props.addToCart();
	}

	randomColor() {
		return '#' + (0x1000000 + Math.random() * 0xFFFFFF).toString(16).substr(1,6);
	}
	
	render () {
		const { product, cartPopup } = this.props;
		const { color, description, image, name, price, size, quantity, id } = product;
		
		return (
			<div className="products__inner-wrapper">
				<div className="products__inner" style={{
					width: document.querySelector(".site-wrapper").clientWidth, 
					height: document.querySelector(".site-wrapper").clientHeight, 
				}}>
					<div className="close-product" onClick={() => this.closeProduct()}></div>
					<Media object src={image} alt="Product image cap" />
					<CardBody>
						<CardTitle className="product__title">{name}</CardTitle>
						<div className="product__store">
							<CardSubtitle className="product__price">${price.toFixed(2)}</CardSubtitle>
							<Quantity quantity={quantity} getSelectedQty={this.props.getSelectedQty}/>
						</div>
						<div className="product__vanity">
							<CardSubtitle className="product__color"><i style={{backgroundColor: this.randomColor()}}></i><span>Comes in {color}</span></CardSubtitle>
							<CardSubtitle className="product__size"><strong>Size:</strong> {size}</CardSubtitle>
							<br/>
							<CardText className="product__description">{description}</CardText>
						</div>
						{
							quantity !== 0 
								? <Button color="primary" size="lg" block onClick={ () => this.addToCartParent(product) }>
									Add to Cart
									{
										cartPopup === true
											? <Popup product={product.name} selectedQty={this.props.selectedQty} qtyVal={this.props.qtyVal} /> 
											: null
									}
									</Button>
								: null
						}
					</CardBody>
				</div>
			</div>
		)
	}
}