import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';

class CartItem extends Component {
  render() {
    const { name, quantity, price } = this.props;
    
    return (
      <ListGroupItem>
        {name} {quantity > 1 && (`(${quantity})`)}
      </ListGroupItem>
    );
  }
}
export default CartItem;
