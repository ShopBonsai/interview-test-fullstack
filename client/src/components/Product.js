import React, {Component} from 'react';
import { connect } from "react-redux";
import { addToCart } from '../redux/actions'
import {CardTitle, CardSubtitle, CardText, Button, CardBody, Media,  InputGroup, InputGroupAddon, Input} from 'reactstrap';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1
        };
        this.setQuantity = this.setQuantity.bind(this);
    }
    setQuantity(quantity) {
        this.setState({ quantity: quantity });
    }
    handleProduct(product, quantity) {
        this.props.addToCart({
            quantity,
            product
        });
        this.setState({ quantity: 1 })
    }
    render() {
        return (
            <div>
                <Media className="product-card">
                    <Media left href="#">
                        <Media object src={this.props.product.image} alt="Product image cap"/>
                    </Media>
                    <CardBody>
                        <CardTitle style={{fontWeight: 600}}>{this.props.product.name}</CardTitle>
                        <CardTitle>Price: ${this.props.product.price}</CardTitle>
                        <CardSubtitle>Color: {this.props.product.color}</CardSubtitle>
                        <CardSubtitle>Size: {this.props.product.size}</CardSubtitle>
                        <CardText>Details: {this.props.product.description}</CardText>
                        <InputGroup style={{marginBottom: '4px'}}>
                            <InputGroupAddon addonType="prepend">
                                Quantity
                            </InputGroupAddon>
                            <Input type='number'
                                   value={this.state.quantity}
                                   onChange={event => this.setQuantity(event.target.value)} />
                        </InputGroup>
                        <Button color="primary" size="lg" block onClick={() => this.handleProduct(this.props.product, Number(this.state.quantity))}>Buy</Button>
                    </CardBody>
                </Media>
            </div>
        );
    }
}
const mapStateToProps = (state) =>({
    byIds: state.cart.byIds,
});
const mapDispatchToProps = {
    addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
