import React, { Component } from 'react';
import { CardTitle, CardSubtitle, CardText, Button, CardBody, Media } from 'reactstrap';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
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

const withProducts = Component => props => {
  return (
    <Query query={GET_PRODUCTS}>
      {({ loading, data }) => {
        return (
          <Component merchantsLoading={loading} merchants={data && data.merchants} {...props} />
        );
      }}
    </Query>
  );
};

class ProductsList extends Component {
  
    showProducts() {
      const { merchants, merchantsLoading } = this.props;
      if (merchantsLoading) return <div><h3>No products available</h3></div>
      if (merchants?.length > 0) {
        return merchants.map(({ products }) => {
          return products?.map(product => {
            const { color, description, image, name, price, size } = product
            return (
              <Media key={product.id} className="product-card">
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
            );
          })
        });
      }
    }
  
    render() {
      return (
        <div className="container">
          {this.showProducts()}
        </div>
      );
    }
  }
  export default withProducts(ProductsList)