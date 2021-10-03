import { gql } from '@apollo/client';

export const GET_ORDERS = gql`
  query orders {
    orders {
      guid
      products {
        id
        name
      }
      total
      created
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation createOrder($order: OrderInput!) {
    createOrder(order: $order) {
      products {
        id
        name
        price
        image
        quantity
      }
    }
  }
`;
