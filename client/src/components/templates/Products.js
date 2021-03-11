import React, { Component } from 'react';
import { CardTitle, CardSubtitle, CardText, Button, CardBody, Media } from 'reactstrap';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import './Products.css';

const GET_PRODUCTS = gql`
  query GetProducts {
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

const GET_PRODUCTS_BY_MERCHANT = gql`
  query GetProductsByMerchant($guid: String!) {
    merchant(guid: $guid) {
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
  const { merchantGuid } = props;
  return (
    <Query query={merchantGuid ? GET_PRODUCTS_BY_MERCHANT : GET_PRODUCTS} variables={{
      guid: merchantGuid,
    }}>
      {({ loading, data }) => {
        const merchants = data && (data.merchants || [data.merchant]);
        return (
          <div>
            <Component merchantsLoading={loading} merchants={merchants} {...props} />
          </div>
        );
      }}
    </Query>
  );
};

class ProductsList extends Component {
  
    showProducts(merchants) {
      return merchants.map(({products}) => {
        return products && products.length > 0 && products.map(product => {
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
                <Button color="primary" size="lg" block>Buy</Button>
              </CardBody>
            </Media>
          );
        })
      }); 
    } 

    render() {
      const { merchants, merchantsLoading } = this.props;
  
      if (merchantsLoading) {
        return (
          <div>Loading...</div>
        );
      } else if (merchants && merchants.length > 0) {
        return this.showProducts(merchants);
      } else {
        return (
          <div>
            <strong>No products available</strong>
          </div>
        );
      }
    }
  }
  export default withProducts(ProductsList)