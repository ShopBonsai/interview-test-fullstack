import React from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'
import { CardTitle, CardSubtitle, CardText, Button, CardBody, Media } from 'reactstrap'

import {
  GET_CART,
  ADD_TO_CART
} from '../gql'

const Product = props => {
  const { id, image, name, price, color, size, description } = props.product

  const [addToCart] = useMutation(ADD_TO_CART, {
    update(cache, { data: { addToCart } }) {
      cache.writeQuery({
        query: GET_CART,
        data: { cart: addToCart }
      })
    }
  })

  return (
    <Media key={id} className="product-card">
      <Media left href="#">
        <Media object src={image} alt="Product image cap" />
      </Media>
      <CardBody>
        <CardTitle style={{fontWeight: 600}}>{name}</CardTitle>
        <CardTitle>Price: {price}</CardTitle>
        <CardSubtitle>Color: {color}</CardSubtitle>
        <CardSubtitle>Size: {size}</CardSubtitle>
        <CardText>Details: {description}</CardText>
        <Button color="primary" size="lg" block onClick={() => addToCart({ variables: { productId: id }})}>Add to Cart</Button>
      </CardBody>
    </Media>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProductToCart: PropTypes.func
}

export default Product