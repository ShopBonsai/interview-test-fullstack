import React from 'react'
import PropTypes from 'prop-types'
import { CardTitle, CardSubtitle, CardText, Button, CardBody, Media } from 'reactstrap'

const Product = props => {
  const { id, image, name, price, color, size, description } = props.product

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
        <Button color="primary" size="lg" block>Add to Cart</Button>
      </CardBody>
    </Media>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
}

export default Product