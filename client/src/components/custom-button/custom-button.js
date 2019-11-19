import React from 'react';

import { CustomButtonContainer } from './custom-button-styles';

/*custom button was created so it can be used in different components.
  if we need to create submit button as well buttons with different functionalities
  we can pull the children off props that get passed into custom botton.  
*/
const CustomButton = ({ children, ...props }) => (
  <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);

export default CustomButton;