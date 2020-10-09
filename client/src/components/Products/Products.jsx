import React from 'react';
import {
  CardTitle, CardSubtitle, CardText, Button, CardBody, Media,
} from 'reactstrap';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { CartContext } from '../../CartContextProvider';
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

const withProducts = (ChildComponent) => (props) => (
  <Query query={GET_PRODUCTS}>
    {({ loading, data }) => (
      <ChildComponent merchantsLoading={loading} merchants={data && data.merchants} {...props} />
    )}
  </Query>
);

const ProductsList = ({ merchants, merchantsLoading }) => {
  const [cartState, setCartState] = React.useContext(CartContext);
  const addToCart = (product) => {
    const prevCartState = cartState;
    if (prevCartState.ids.some((id) => id === product.id)) return;
    const nextCartIds = [...prevCartState.ids, product.id];
    setCartState({ ids: nextCartIds });
  };
  const showProducts = () => {
    if (!merchantsLoading && merchants && merchants.length > 0) {
      return merchants.map(
        ({ products }) => products && products.length > 0 && products.map((product) => {
          const {
            color, description, image, name, price, size,
          } = product;
          return (
            <Media key={product.id} className="product-card">
              <Media left href="#">
                <Media object src={image} alt="Product image cap" />
              </Media>
              <CardBody>
                <CardTitle style={{ fontWeight: 600 }}>{name}</CardTitle>
                <CardTitle>
                  Price:
                  {price}
                </CardTitle>
                <CardSubtitle>
                  Color:
                  {color}
                </CardSubtitle>
                <CardSubtitle>
                  Size:
                  {size}
                </CardSubtitle>
                <CardText>
                  Details:
                  {description}
                </CardText>
                <Button color="primary" size="lg" block onClick={() => addToCart(product)}>
                  Add To Cart
                </Button>
              </CardBody>
            </Media>
          );
        }),
      );
    }
    return (
      <div>
        <h3>No products available</h3>
      </div>
    );
  };

  return (
    <div className="products">
      {showProducts()}
    </div>
  );
};
export default withProducts(ProductsList);
