import React, { useState, useContext, useEffect } from 'react'
import { Button, CardText } from 'reactstrap'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'

import AddToCartNotification from '../notifications/add-to-cart-notification'

import { CartContext } from '../../context/cart.context'

import {CardMedia, Typography, Card, CardContent, Grid} from '@mui/material'

const ProductCard = ({ product, merchant}) => {
    const { color, description, image, name, price, size, id, quantity } = product
    const [quantityToAdd, setQuantityToAdd] = useState(1)
    const [isDisabled, setIsDisabled] = useState(false)
    const { addToCart, cartItems } = useContext(CartContext)
    const [modalIsOpen, setIsOpen] = useState(false)

    function openModal() {
      setIsOpen(true)
    }
    function closeModal() {
      setIsOpen(false)
    }

    const decreaseQuantity = () => {
        setQuantityToAdd(quantityToAdd - 1)
    }
    const increaseQuantity = () => {
        setQuantityToAdd(quantityToAdd + 1)
    }
    const addProductToCart = () => {
        addToCart(product, quantityToAdd)
        openModal()
    }
    
    // This useEffect monitors each item's available quantity in the cart
    // When clear cart button is clicked, all add to cart buttons are enabled
    // If the sum of item's quantity in cart and item's quantity to be added equals or exceeds available quantity, the add to cart button is disabled
    useEffect(() => {
        if(cartItems.length === 0) {
            setIsDisabled(false)
            return
        }
        const inCartQuantity = cartItems.reduce((currentValue, cartItem) => cartItem.id === id ? currentValue += cartItem.quantityInCart : currentValue += 0, 0)
        if((inCartQuantity + quantityToAdd) > quantity) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    },[cartItems, quantityToAdd])
    
    return (
        <>
            <AddToCartNotification 
                closeModal={closeModal} 
                modalIsOpen={modalIsOpen} 
            />
            <Card>
                <CardContent>
                    <CardMedia
                        component="img"
                        height="300"
                        image={image}
                        alt="Product image cap"
                    >
                    </CardMedia>
                    <Typography>
                        Product: {name}
                    </Typography>
                    <Typography>
                        Merchant: {merchant}
                    </Typography>
                    <Typography>
                        Price: ${price.toFixed(2)}
                    </Typography>
                    <Typography>
                        Color: {color}
                    </Typography>
                    <Typography>
                        Size: {size}
                    </Typography>
                    <Typography>
                        Details: {description}
                    </Typography>
                    <Grid container justifyContent="center" alignItems="center" marginTop={1} marginBottom={1}>
                        <Button color="secondary" size="sm" disabled={quantityToAdd === 1} onClick={decreaseQuantity}><RemoveIcon/></Button>
                        <CardText style={{marginLeft: '10px', marginRight: '10px'}}>&nbsp;&nbsp;{quantityToAdd}&nbsp;&nbsp;</CardText>
                        <Button color="secondary" size="sm" disabled={quantityToAdd === quantity} onClick={increaseQuantity}><AddIcon/></Button>
                    </Grid>
                    <Button color="primary" size="lg" name={name} disabled={isDisabled} block onClick={addProductToCart}><AddShoppingCartIcon/>{isDisabled ? ' Out Of Stock' : ' Add to Cart'}</Button>
                </CardContent>
            </Card>
        </>
    )
}

export default ProductCard