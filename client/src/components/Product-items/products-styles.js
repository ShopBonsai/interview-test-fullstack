import styled from "styled-components";
import CustomButton from "../custom-button/custom-button";

export const ProductContainer = styled.div`
  padding: 80px 10px;
`;

export const ProductCard = styled.div`
  width: 22vw;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;

  @media screen and (max-width: 700px) {
    width: 100%;
    display: flex;
    align-item: center;
  }
`;

export const MediaImage = styled.div`
  width: 100%;
  height: 85%;
  background-size: cover;
  background-position: center;
  margin-bottom: 5px;
  background-image: ${({ image }) => `url(${image})`};
`;

export const ProductFooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;
export const ProductInfoContainer = styled.span`
  width: 90%;
  text-align: left;
`;

export const AddButton = styled(CustomButton)`
  display: flex;
  align-items: flex-end;
`;

export const LoadingProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 700px;
`;
