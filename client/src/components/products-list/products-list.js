import React, { useState, useEffect } from 'react'

import ProductCard from '../product-card/product-card'
import SearchBar from '../search-bar/search-bar'

import { Button } from 'reactstrap'

import { Grid } from '@mui/material'

const ProductsList = ({merchants}) => {
    const [merchantsArray, setMerchantsArray] = useState(merchants)
    const [isForMerchantSearch, setIsForMerchantSearch] = useState(false)
    const [searchFieldValue, setSearchFieldValue] = useState('')

    useEffect(() => {
        setMerchantsArray(merchants)
    },[merchants])

    // This useEffect re-runs when the search field value changes, if new merchants object is passed in, 
    // or if user switches between searching by merchant name or by product name
    useEffect(() => {
        // If user is searching by merchant name, filter the list of merchants to match text box input
        // Set the merchantsArray to the newMerchantsArray returned
        if(isForMerchantSearch) {
            const newMerchantsArray = merchants.filter((merchant) => merchant.merchant.toLowerCase().includes(searchFieldValue))
            setMerchantsArray(newMerchantsArray);
        // If user is searching by product name, filter through all merchants' products to find ones that match text box input
        // Set the merchantsArray to the new MerchantsArray returned
        } else {
            const newMerchantsWithMatchingProducts = merchants.map((merchant) => {
                const newProducts = merchant.products.filter(({name}) => name.toLowerCase().includes(searchFieldValue))
                return {...merchant, products: newProducts}
            });
            setMerchantsArray(newMerchantsWithMatchingProducts)
        }
    }, [searchFieldValue, merchants, isForMerchantSearch])

    // toggles search context between by merchant name or by product name
    const toggleSearchType = () => {
        setIsForMerchantSearch(!isForMerchantSearch)
    }

    // updates search value on input change
    const searchChange = (e) => {
        const val = e.target.value.toLowerCase();
        setSearchFieldValue(val);
    }

    return (
        <Grid container justifyContent="center" alignItems="center" spacing={2} marginTop={2}>
            <Grid item>
                <Button color="primary" onClick={toggleSearchType} > {isForMerchantSearch ? "Search by Product" : "Search by Merchant"}</Button>
            </Grid>
            <Grid item>
                <SearchBar onChange={searchChange} placeholder={isForMerchantSearch ? "Search by Merchant": "Search for Product" } />
            </Grid>
            <Grid container flexDirection="row" direction="row" spacing={4} paddingLeft={16} paddingRight={16} marginTop={2}>
                {merchantsArray.map(({ products, merchant }) => products.map(product => {
                    const { id, quantity } = product;
                    return (
                        quantity && 
                        <Grid key={id} item xs={4}>
                            <ProductCard key={id} product={product} merchant={merchant}/>
                        </Grid>
                    )
                }))}
            </Grid>
        </Grid>
    )
}

export default ProductsList