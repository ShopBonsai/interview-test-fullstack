import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Button } from 'reactstrap'
import { GET_CART, REMOVE_FROM_CART } from '../gql'

const Cart = props => {
  const { loading, data } = useQuery(GET_CART, { fetchPolicy: 'network-only' })

  const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
    update(cache, { data: { removeFromCart } }) {
      cache.writeQuery({
        query: GET_CART,
        data: { cart: removeFromCart }
      })
    }
  })

  if (loading) {
    return (
      <div>
        Loading cart...
      </div>
    )
  }

  return (
    <div className="cart">
      <p>Cart</p>
      <ul>
        {!loading && data && data.cart.map((item, i) => (
          <li key={i}>{item.name} <Button color="danger" onClick={() => removeFromCart({ variables: { productId: item.id }})}>X</Button></li>
        ))}
      </ul>
    </div>
  )
}

export default Cart