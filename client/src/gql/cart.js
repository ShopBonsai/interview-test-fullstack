import { gql } from '@apollo/client'

export const GET_CART = gql`
  query GetCart {
    cart {
      id
      name
    }
  }
`

export const ADD_TO_CART = gql`
  mutation AddToCart($productId: String) {
    addToCart(productId: $productId) {
      products {
        id
        name
      }
    }
  }
`

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($productId: String) {
    removeFromCart(productId: $productId) {
      products {
        id
        name
      }
    }
  }
`