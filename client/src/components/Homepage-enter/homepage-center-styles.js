import styled from "styled-components";
import { Link } from "react-router-dom";
import img from "../../assets/Emily.jpg";

export const MainMenuContainer = styled(Link)`
  min-width: 40%;
  height: 700px;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 60px 7.5px 15px;
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
    & .content {
      opacity: 0.9;
    }
  }


  @media screen and (max-width: 700px) {
    height: 500px;
    min-width: 100%;
  }
`;

export const BackgroundImageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: url(${img});
`;

export const ContentContainer = styled.div`
  height: 90px;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: white;
  opacity: 0.7;
  position: absolute;

  @media screen and (max-width: 700px) {
    padding: 0;
  }
`;

export const ContentTitle = styled.span`
  font-weight: bold;
  margin-bottom: 6px;
  font-size: 22px;
  color: #4a4a4a;

  @media screen and (max-width: 700px) {
    font-size: 18px;
  }
`;
