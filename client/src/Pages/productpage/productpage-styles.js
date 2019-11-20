import styled from "styled-components";

export const ProductPageContainer = styled.div`
  padding: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 5px;
  & > div {
    margin-bottom: 100px;
  }

  @media screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
  }
`;
