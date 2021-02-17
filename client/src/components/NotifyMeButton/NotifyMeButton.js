import { Button } from "reactstrap";
import { PropTypes } from "prop-types";
import React from "react";

export const NotifyMeButton = ({ handleNotifyMe, isEnabled }) => {
  const color = isEnabled ? "primary" : "secondary";

  return (
    <Button
      block
      color={color}
      disabled={!isEnabled}
      size="lg"
      onClick={handleNotifyMe}
    >
      Notify
    </Button>
  );
};

NotifyMeButton.propTypes = {
  handleNotifyMe: PropTypes.func,
  isEnabled: PropTypes.bool,
};
