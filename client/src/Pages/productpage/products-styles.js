import styled from "styled-components";
import { CardTitle, CardSubtitle, CardText, CardBody, Media } from "reactstrap";
import CustomButton from "../../components/custom-button/custom-button";

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductCard = styled.div`
  display: flex;
  width: 40%;
  margin: 40px auto;
  padding: 2% 0;
  color: grey;

  @media screen and (max-width: 700px) {
    display: flex;
    width: 20%;
    margin: 10px auto;
    padding: 0;
  }
`;
export const AddButton = styled(CustomButton)`
  position: center;
`;

export const LoadingProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 700px;
`;