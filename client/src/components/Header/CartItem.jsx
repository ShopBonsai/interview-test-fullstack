import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import {
  Spinner, Media, DropdownItem,
} from 'reactstrap';

const GET_ITEM = gql`
  query CartItem($id: String!) {
    product(id:$id) 
      {
        id
        name
        price
        image
    }
  }
`;

const withItems = (ChildComponent) => ({ itemId, ...rest }) => (
  <Query query={GET_ITEM} variables={{ id: itemId }}>
    {({ loading, data }) => (
      <ChildComponent itemLoading={loading} itemData={data && data.product} {...rest} />
    )}
  </Query>
);

const CartItem = ({
  itemLoading, itemData, adjustCartTotal, onRemoveClick,
}) => {
  if (itemLoading || !itemData) return (<Spinner type="grow" color="primary" />);
  const {
    image, name, price, id,
  } = itemData;
  React.useEffect(() => {
    adjustCartTotal(price, 'add');
    return () => adjustCartTotal(price, 'subtract');
  }, [id]);
  return (
    <>
      <DropdownItem className="cartItem" onClick={onRemoveClick}>
        <Media>
          <Media left>
            <Media className="cart-image" object src={image} alt="product image" />
          </Media>
          <Media body>
            <Media heading>
              {name}
            </Media>
            {`$${price.toFixed(2)}`}
          </Media>
          <span className="cartItem__removeIcon" role="img" aria-label="remove from cart">🗑</span>
        </Media>
      </DropdownItem>
      <DropdownItem divider />
    </>
  );
};

export default withItems(CartItem);
