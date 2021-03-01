import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

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

const withProducts = Component => props => {
  const [name, setName] = useState('')
  const [size, setSize] = useState('')

  return (
    <Query query={GET_PRODUCTS} variables={{ name, size }}>
      {({ loading, data }) => {
        return (
          <div className="wrapper">
            <Sidebar setName={setName} setSize={setSize} />

            <div className="products">
              <Component productsLoading={loading} products={data && data.products} {...props} />
            </div>
          </div>
        )
      }}
    </Query>
  )
}

withProducts.propTypes = {
  name: PropTypes.string,
  size: PropTypes.oneOf(['S', 'M', 'L'])
}

const ProductsList = props => {
  const { products, productsLoading } = props

  if (!productsLoading && products && products.length > 0) {
    return products.map(product => {
      return (
        <Product key={product.id} product={product} />
      )
    })
  } else {
    return (
      <div>
        <h3>No products available</h3>
      </div>
    )
  }
}

export default withProducts(ProductsList)