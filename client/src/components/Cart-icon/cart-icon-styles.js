import styled from 'styled-components';
import CartLogo from "./cart-icon-logo"

export const CartContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const ShoppingIcon = styled(CartLogo)`
  width: 24px;
  height: 24px;
`;

// export const ItemCountContainer = styled.span`
