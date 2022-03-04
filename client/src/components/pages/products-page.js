import React, {useState} from 'react'
import Modal from 'react-modal'
import { Spinner, Button } from 'reactstrap'
import { Grid } from '@mui/material'
import { gql, useQuery } from '@apollo/client'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import CartBasket from '../checkout-cart/cart-basket'
import ProductsList from '../products-list/products-list'

const GET_MERCHANTS = gql`
  {
    merchants {
      guid
      merchant
      products {
        belongsToBrand
        id
        name
        price
        description
        color
        size
        image
        quantity
      }
    }
  }
`

Modal.setAppElement('#root')

const ProductsPage = () => {
  const [isShowingCart, setIsShowingCart] = useState(false)
  const { loading: merchantsLoading, data: merchantsData } = useQuery(GET_MERCHANTS)

  return (
    <Grid container direction="column" alignItems="center">
      <Grid container direction="column" alignItems="end">
        <Grid item>
          <Button color="dark" onClick={() => setIsShowingCart(!isShowingCart)}>          
            <ShoppingCartIcon/>
            {isShowingCart ? ' Hide Cart' : ' Show Cart'}
          </Button>
        </Grid>
      </Grid>
      <Grid item>
      {isShowingCart && <CartBasket />}
      </Grid>
      <Grid item>
        {merchantsLoading ? (<Spinner style={{zIndex: 10000 }}>
          loading
        </Spinner> ):
        (<ProductsList 
          merchants={merchantsData && merchantsData.merchants} 
        />)}
      </Grid>
    </Grid>
  )
}

export default ProductsPage