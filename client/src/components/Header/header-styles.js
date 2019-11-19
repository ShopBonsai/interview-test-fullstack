import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 85px;
  padding: 25px;
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  color: black;
  cursor: pointer;
  :hover {
    color: grey;
  }
`;
