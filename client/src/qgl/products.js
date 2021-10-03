import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query merchants {
    merchants {
      guid
      merchant
      products {
        id
        name
        price
        description
        color
        size
        image
      }
    }
  }
`;
