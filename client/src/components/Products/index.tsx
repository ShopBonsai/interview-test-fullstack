import * as React from "react";
import {
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  CardBody,
  Media,
} from "reactstrap";
import { gql, useApolloClient } from "@apollo/client";
import { Query } from "react-apollo";

import "./styles.css";

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

//@ts-ignore
const withProducts = (Component) => (props) => {
  const client = useApolloClient();

  return (
    //@ts-ignore
    <Query query={GET_PRODUCTS} client={client}>
      {/* //@ts-ignore */}
      {({ loading, data }) => {
        return (
          <Component
            merchantsLoading={loading}
            merchants={data && data.merchants}
            {...props}
          />
        );
      }}
    </Query>
  );
};

class ProductsList extends React.Component {
  showProducts() {
    //@ts-ignore
    const { merchants, merchantsLoading } = this.props;

    //@ts-ignore
    if (!merchantsLoading && merchants && merchants.length > 0) {
      //@ts-ignore
      return merchants.map(({ products }) => {
        return (
          products &&
          products.length > 0 &&
          //@ts-ignore
          products.map((product) => {
            const { color, description, image, name, price, size } = product;
            return (
              <Media key={product.id} className="product-card">
                <Media left href="#">
                  <Media object src={image} alt="Product image cap" />
                </Media>
                <CardBody>
                  <CardTitle style={{ fontWeight: 600 }}>{name}</CardTitle>
                  <CardTitle>Price: {price}</CardTitle>
                  <CardSubtitle>Color: {color}</CardSubtitle>
                  <CardSubtitle>Size: {size}</CardSubtitle>
                  <CardText>Details: {description}</CardText>
                  <Button color="primary" size="lg" block>
                    Buy
                  </Button>
                </CardBody>
              </Media>
            );
          })
        );
      });
    } else {
      return (
        <div>
          <h3>No products available</h3>
        </div>
      );
    }
  }

  render() {
    return <div>{this.showProducts()}</div>;
  }
}

export default withProducts(ProductsList);
