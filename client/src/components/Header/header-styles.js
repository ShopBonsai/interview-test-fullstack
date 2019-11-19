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

  @media screen and (max-width: 700px) {
    padding: 10px;
    height: 40px;
    margin-bottom: 20px;
  }
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 85px;
  padding: 25px;

  @media screen and (max-width: 700px) {
    padding: 0;
    width: 55px;
  }
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;


  @media screen and (max-width: 700px) {
    width: 80%;
  }
`;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  color: black;
  cursor: pointer;
  :hover {
    color: grey;
  }
`;
