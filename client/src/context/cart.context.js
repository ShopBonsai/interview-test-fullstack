import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import {UserContext} from './user.context'
import { gql, useMutation } from '@apollo/client'

const UPDATE_USER = gql `
    mutation updateUser($user: UserInput!) {
        updateUser(user: $user) {
            email
            googleId
            imageUrl
            name
            cartItems {
                belongsToBrand
                id
                name
                price
                description
                color
                size
                quantity
                quantityInCart
                image
            }
        }
    }
`

const addItemToCart = (cartItems, product, quantityToAdd) => {
    const { id } = product
    // Check if cart has an item with same id as product
    const existingCartItem = cartItems.find(cartItem => cartItem.id === id)

    // If it does, increase the quantity of existing item. If not, return that item back to the array unmodified
    if(existingCartItem) {
        const newCartItems = cartItems.map(cartItem =>
            cartItem.id === id 
                ? {...cartItem, quantityInCart: cartItem.quantityInCart + quantityToAdd}
                : cartItem
        )
        // return modified array of cart items
        return newCartItems
    } 
    // If cart does not the item already, add the item with required quantity to cart
    return [...cartItems, { ...product, quantityInCart: quantityToAdd }]
}

const removeItemFromCart = (cartItems, item) => {
    // Find by id the item in the cart that needs to be removed
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === item.id
    )
    // If there is only a quantity of 1 of this item in cart, remove/filter it from cart
    if (existingCartItem.quantityInCart === 1) {
        return cartItems.filter(cartItem => cartItem.id !== item.id)
    }
    // If there is more than quantity of 1, just decrease quantity in cart of this item by 1
    return cartItems.map(cartItem => {
        cartItem.id === item.id ? { ...cartItem, quantityInCart: cartItem.quantityInCart - 1} : cartItem
    }) 
}

export const CartContext = createContext({
    cartItems: [],
    setCardItems: () => {},
    total:  0,
    addToCart: () => {},
    clearCart: () => {},
    removeFromCart: () => {}
})

export const CartProvider = ({children}) => {
    const {userProfile} = useContext(UserContext)
    const [cartItems, setCartItems] = useState([])
    const [total, setTotal] = useState(0)
    const [updateUser] = useMutation(UPDATE_USER)
    
    // Whenever cart content changes, new total value of items in cart is calculated
    useEffect(() => {
        const newTotal = cartItems.reduce((currentTotal, cartItem) => currentTotal + cartItem.price * cartItem.quantityInCart, 0)
        setTotal(newTotal)
    }, [cartItems])

    // When a user signs in and has items in their cart from previously, updated the cart with those items
    useEffect(() => {
        if(!userProfile || !userProfile.cartItems.length) return
        setCartItems(userProfile.cartItems)
    },[userProfile])

    // Updates the logged in user's profile in the database with new cart items
    const updateUserWithCartItems = (userProfile, newCartItems) => {
        const {email, googleId, imageUrl, name} = userProfile
        updateUser({
            variables: {
                user: {email, googleId, imageUrl, name, cartItems: newCartItems}
            }
        })
    }
    
    // Adds an item with its quantity to cart. If it is a signed in user, update the user's profile in database with the new cart items
    const addToCart = (product, quantityToAdd) => {
        const newCartItems = addItemToCart(cartItems, product, quantityToAdd)
        if(userProfile) {
            updateUserWithCartItems(userProfile, newCartItems)
        }
        setCartItems(newCartItems)
    }

    // Removes item/items from cart(and update state of the cart if logged-in user)
    const removeFromCart = (product) => {
        const newCartItems = removeItemFromCart(cartItems, product)
        if(userProfile) {
            updateUserWithCartItems(userProfile, newCartItems)
        }
        setCartItems(newCartItems)
    }

    // Clears the cart of all items(and update state of the cart if logged-in user)
    const clearCart = () => {
        if(userProfile) {
            updateUserWithCartItems(userProfile, [])
        }
        setCartItems([])
    }

    const value = {cartItems, setCartItems, addToCart, clearCart, total, removeFromCart}

    return (
        <CartContext.Provider value={value}> {children} </CartContext.Provider>
    )
}