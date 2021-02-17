import { Button } from "reactstrap";
import PropTypes from "prop-types";
import React from "react";

export const ProductActions = ({ isBuyEnabled, isNotifyEnabled, product }) => {
  // FIXME this product needs to be sent along with any
  // buy/notify request
  console.log("product", product);
  return (
    <>
      {isBuyEnabled ? (
        <Button block color="primary" size="lg">
          Buy
        </Button>
      ) : null}
      {isNotifyEnabled ? (
        <Button block color="primary" size="lg">
          Notify
        </Button>
      ) : null}
    </>
  );
};

ProductActions.propTypes = {
  isBuyEnabled: PropTypes.bool,
  isNotifyEnabled: PropTypes.bool,
  product: PropTypes.object,
};
