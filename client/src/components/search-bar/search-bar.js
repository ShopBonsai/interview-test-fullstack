import React, {useState} from 'react'
import { Grid, Input } from '@mui/material'
import { Button } from 'reactstrap'

const SearchBar = (props) => {
    return (
        <Grid container direction="row" alignItems="center" spacing={2}>
            <Grid item>
                <Input
                    type="search"
                    {...props}
                />
            </Grid>
        </Grid>
    )
}

export default SearchBar