import React, { useCallback } from "react";
import { BuyNowButton } from "../BuyNowButton";
import { FavouriteButton } from "../FavouriteButton";
import { NotifyMeButton } from "../NotifyMeButton";
import PropTypes from "prop-types";

export const ProductActions = ({
  isBuyNowEnabled,
  isNotifyEnabled,
  localFavourites,
  onBuyNow,
  onNotifyMe,
  onSetFavourites,
  product,
}) => {
  // FIXME this product needs to be sent along with any
  // buy/notify request
  //
  const productIndex = (localFavourites || []).indexOf(product.id);
  // NOTE: disabling of this generally useful linting rule
  // as there are some exceptions as to where it should be applied
  // eslint-disable-next-line no-magic-numbers
  const isFavourited = productIndex > -1;

  const handleManageFavourites = useCallback(() => {
    if (isFavourited) {
      // if the item is favourited, remove id
      localFavourites.splice(productIndex, 1);
    } else {
      // IF the item is not favourited, now do so.
      localFavourites.push(product.id);
    }

    onSetFavourites(localFavourites);
  }, [
    localFavourites,
    product.id,
    isFavourited,
    productIndex,
    onSetFavourites,
  ]);

  const handleBuyNow = useCallback(() => {
    onBuyNow(product);
  }, [onBuyNow, product]);

  const handleNotifyMe = useCallback(() => {
    onNotifyMe(product);
  }, [onNotifyMe, product]);

  return (
    <>
      <NotifyMeButton
        handleNotifyMe={handleNotifyMe}
        isEnabled={isNotifyEnabled}
      />
      <FavouriteButton
        handleManageFavourites={handleManageFavourites}
        isToggledOn={isFavourited}
      />
      <BuyNowButton handleBuyNow={handleBuyNow} isEnabled={isBuyNowEnabled} />
    </>
  );
};

ProductActions.propTypes = {
  isBuyNowEnabled: PropTypes.bool,
  isNotifyEnabled: PropTypes.bool,
  localFavourites: PropTypes.arrayOf(PropTypes.string),
  onBuyNow: PropTypes.func,
  onNotifyMe: PropTypes.func,
  onSetFavourites: PropTypes.func,
  product: PropTypes.object,
};
