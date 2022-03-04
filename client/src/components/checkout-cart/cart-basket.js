import React, { useContext } from 'react'
import { Grid, Typography, CardMedia } from '@mui/material'
import { Button } from 'reactstrap'
import { CartContext } from '../../context/cart.context'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import ClearIcon from '@mui/icons-material/Clear'

const CartBasket = () => {
    const {cartItems, clearCart, total, addToCart, removeFromCart} = useContext(CartContext)

    // Clicking (+) button will add 1 of that item to cart
    const addItemFromCart = (cartItem) => {
        addToCart(cartItem, 1)
    }

    // Clicking (-) button will subtract 1 of that item to cart if quantity is greater than 1
    // If quantity is 1, the item is completely removed from cart
    const subtractItemFromCart = (cartItem) => {
        if(cartItem.quantityInCart === 1) {
            removeFromCart(cartItem)
        } else {
            addToCart(cartItem, -1)
        }
    }

    // Monitors each item to see if the quantity in cart exceed the items available quantity
    // If so, the (+) button will be disabled
    const checkIfDisabled = (cartItem) => {
        if(cartItem.quantityInCart < cartItem.quantity) {
            return false
        }
        return true
    }

    return (
        <Grid container minWidth="500px" direction="column" justifyContent="center" alignItems="center" style={{background: "#ebebeb"}} paddingBottom={2}>
            <Typography variant="h4">
                Your Cart
            </Typography>
            {cartItems.map(cartItem => {
                return (
                    <Grid container maxWidth="400px" direction="column" justifyContent="center" alignItems="center" key={Math.floor(Math.random() * 999999)} style={{background: '#d9ecfa'}}>
                        <Grid item>
                            <Typography variant="h6"> {cartItem.name}</Typography>
                        </Grid>
                        <Grid item>
                            <CardMedia
                                component="img"
                                height="150"
                                image={cartItem.image}
                                alt="Product image cap"
                            >
                            </CardMedia>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">${cartItem.price.toFixed(2)}</Typography>
                        </Grid>
                        <Grid container direction="row" justifyContent="center" alignItems="center">
                            <Grid item>
                                <Button color="primary" onClick={() => subtractItemFromCart(cartItem)}><RemoveIcon/></Button>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">&nbsp;&nbsp;Quantity: {cartItem.quantityInCart}&nbsp;&nbsp;</Typography>
                            </Grid>
                            <Grid item>
                                <Button color="primary" disabled={checkIfDisabled(cartItem)} onClick={() => addItemFromCart(cartItem)}><AddIcon/></Button>
                            </Grid>
                        </Grid>
                        <br></br>
                    </Grid>
                )
            })}
            <br></br>
            <Typography variant="h5">
                {cartItems.length === 0 ? "Your cart is empty!" : `Checkout total is $${total.toFixed(2)}` }
            </Typography>
            <br></br>
            <Button color="danger" onClick={() => clearCart()}><ClearIcon/>&nbsp;&nbsp;Remove all cart items</Button>
        </Grid>
    )
}

export default CartBasket