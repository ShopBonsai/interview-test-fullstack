import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

export default class Quantity extends Component {
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

			this.props.getSelectedQty(e.currentTarget.value);
		}
	}

	render(){
		const { value, qty, inStock } = this.state;

		return(
			<FormGroup className="product__qty">
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
						: <span>Out of stock!</span>
				}
			</FormGroup>
		)
	}
}