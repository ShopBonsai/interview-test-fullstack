import { Button } from "reactstrap";
import PropTypes from "prop-types";
import React from "react";

export const BuyNowButton = ({ handleBuyNow, isEnabled }) => {
  return (
    <Button
      block
      color="primary"
      disabled={!isEnabled}
      size="lg"
      onClick={handleBuyNow}
    >
      Buy
    </Button>
  );
};

BuyNowButton.propTypes = {
  handleBuyNow: PropTypes.func,
  isEnabled: PropTypes.bool,
};
