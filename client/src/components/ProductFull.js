import React, { Component } from "react";
import {
	CardTitle,
	CardSubtitle,
	CardText,
	Button,
	CardBody,
	Media
} from "reactstrap";
import Popup from "./Popup";
import Quantity from "./Quantity";

export default class Product extends Component {
	// Close the detailed view.
	closeProduct = () => {
		this.props.viewProduct();
	};

	// Add to cart button effect from the parent.
	addToCart = () => {
		this.props.addToCart();
	};

	// Just make a random colour to display for the product page.
	randomColor = () => {
		return (
			"#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
		);
	};

	render() {
		const { product, cartPopup } = this.props;
		const { color, description, image, name, price, size, quantity } = product;

		return (
			<div className="products__inner-wrapper">
				<div
					className="products__inner"
					style={{
						// Set product view to equal container size.
						width: document.querySelector(".site-wrapper").clientWidth,
						height: document.querySelector(".site-wrapper").clientHeight
					}}
				>
					<div className="close-product" onClick={() => this.closeProduct()} />
					<Media object src={image} alt="Product image cap" />
					<CardBody>
						<CardTitle className="product__title">{name}</CardTitle>
						<div className="product__store">
							<CardSubtitle className="product__price">
								${price.toFixed(2)}
							</CardSubtitle>
							<Quantity
								quantity={quantity}
								getSelectedQty={this.props.getSelectedQty}
							/>
						</div>
						<div className="product__vanity">
							<CardSubtitle className="product__color">
								<i style={{ backgroundColor: this.randomColor() }} />
								<span>Comes in {color}</span>
							</CardSubtitle>
							<CardSubtitle className="product__size">
								<strong>Size:</strong> {size}
							</CardSubtitle>
							<br />
							<CardText className="product__description">
								{description}
							</CardText>
						</div>
						{// Don't display the Add to Cart button if the quantity is 0.
						quantity !== 0 ? (
							<Button
								color="primary"
								size="lg"
								block
								onClick={() => this.addToCart()}
							>
								Add to Cart
								{// Show onClick response when user adds to cart.
								cartPopup === true ? (
									<Popup
										product={product.name}
										selectedQty={this.props.selectedQty}
										qtyVal={this.props.qtyVal}
									/>
								) : null}
							</Button>
						) : (
							<Button
								color="primary"
								size="lg"
								disabled
								block
								onClick={() => this.addToCart()}
							>
								Add to Cart
							</Button>
						)}
					</CardBody>
				</div>
			</div>
		);
	}
}
