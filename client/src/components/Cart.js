import React from 'react'
import { Button } from 'reactstrap'

const Cart = props => {
  return (
    <div className="cart">
      <p>Cart</p>
      <ul>
        {props.items && props.items.map((item, i) => (
          <li key={i}>{item.name} <Button color="danger" onClick={() => props.removeItem(item.id)}>X</Button></li>
        ))}
      </ul>
    </div>
  )
}

export default Cart