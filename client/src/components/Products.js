import React from 'react';
import { CardTitle, CardSubtitle, CardText, Button, CardBody, Media } from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import './styles.css';

const GET_PRODUCTS = gql`
  {
    merchants {
      guid
      merchant
      products {
        id
        name
        price
        description
        color
        size
        image
      }
    }
  }
`;

const ProductsList = () => {
  const { loading, data } = useQuery(GET_PRODUCTS);
  let merchants
  if (loading) return <div><h4>Hold your horses mate, we are loading awesome stuff here.</h4></div>
  if (data) merchants = data.merchants;
  return (
    <div className="container">
      {data ? (
        merchants.map(({ products }) => (
          products.map(({ id, color, description, image, name, price, size }) => (
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
                <Button className="buy" color="primary" size="lg" block>Buy</Button>
              </CardBody>
            </Media>
          ))
        ))
      ) : (
        <p>something isn't quite right</p>
      )}
    </div>
  )
}

export default ProductsList;