import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { CardTitle, CardSubtitle, CardText, Button, CardBody, Media } from 'reactstrap';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import './styles.css';

export const GET_PRODUCTS = gql`
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

export const SEARCH_PRODUCTS = gql`
  query($type: SearchType!, $text: String!) {
    search(type: $type, text: $text) {
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
  }`

const withProducts = Component => props => {
  if (props.isSearching) {
    return (
        <Query query={SEARCH_PRODUCTS} variables={{ text: props.searchText, type: props.searchType }}>
          {({ loading, data }) => {
            return (
                <Component merchantsLoading={loading} merchants={data && data.search} {...props} />
            );
          }}
        </Query>
    )
  }


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

      if (!merchantsLoading && merchants && merchants.length > 0) {
        return (
            <>
              {merchants.map(({products}) => {
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
                })}
            </>
        )
      } else {
        return (
          <div>
            <h3>No products available</h3>
          </div>
        );
      }
    }

    render() {
      return (
        <div>
          {this.showProducts()}
        </div>
      );
    }
}

ProductsList.propTypes = {
  isSearching: PropTypes.bool,
  searchText: PropTypes.string,
  searchType: PropTypes.string,
}

export default withProducts(ProductsList)
