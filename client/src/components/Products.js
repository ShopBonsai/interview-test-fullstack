import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { gql, useQuery, useMutation } from '@apollo/client'

import Cart from './Cart'
import Sidebar from './Sidebar'
import Product from './Product'

const GET_PRODUCTS = gql`
  query GetProducts($name: String, $size: String) {
    products(name: $name, size: $size) {
      id
      name
      price
      description
      color
      size
      image
    }
  }
`

const GET_CART = gql`
  query GetCart {
    cart {
      id
      name
    }
  }
`

const ADD_TO_CART = gql`
  mutation AddToCart($productId: String) {
    addToCart(productId: $productId) {
      products {
        id
        name
      }
    }
  }
`

const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($productId: String) {
    removeFromCart(productId: $productId) {
      products {
        id
        name
      }
    }
  }
`

const ProductsList = props => {
  const [name, setName] = useState('')
  const [size, setSize] = useState('')

  const { loading: productsLoading, data: productsData } = useQuery(GET_PRODUCTS, {
    variables: { name, size }
  })

  const { loading: cartLoading, data: cartData } = useQuery(GET_CART)

  const [addToCart] = useMutation(ADD_TO_CART, {
    update(cache, { data: { addToCart } }) {
      cache.writeQuery({
        query: GET_CART,
        data: { cart: addToCart }
      })
    }
  })
  const addProductToCart = (id) => {
    addToCart({ variables: { productId: id }})
  }

  const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
    update(cache, { data: { removeFromCart } }) {
      cache.writeQuery({
        query: GET_CART,
        data: { cart: removeFromCart }
      })
    }
  })
  const removeProductFromCart = id => {
    removeFromCart({ variables: { productId: id }})
  }
  
  const productsList = () => {
    if (!productsLoading && productsData.products) {
      if (productsData.products.length > 0) {
        return productsData.products.map(product => {
          return (
            <Product key={product.id} product={product} addProductToCart={() => addProductToCart(product.id)} />
          )
        })
      } else {
        return (
          <div>
            <h3>No products found.</h3>
          </div>
        )
      }
    } else {
      return (
        <div>
          <h3>Loading...</h3>
        </div>
      )
    }
  }

  return (
    <div className="wrapper">
      <div className="sidebar-wrapper">
        <Sidebar setName={setName} setSize={setSize} />
        {!cartLoading && <Cart items={cartData.cart} removeItem={id => removeProductFromCart(id)} />}
      </div>

      <div className="products">
        {productsList()}
      </div>
    </div>
  )
}

ProductsList.propTypes = {
  name: PropTypes.string,
  size: PropTypes.oneOf(['S', 'M', 'L'])
}

export default ProductsList