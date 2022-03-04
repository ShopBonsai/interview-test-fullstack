import * as React from 'react'
import { useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/user.context'
import HomeIcon from '@mui/icons-material/Home'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import SpaIcon from '@mui/icons-material/Spa'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'

const pages = [{link: 'Products', route: '/'}, {link: 'User Profile', route: '/userprofile'}]

const MenuBar = () => {

    const {userProfile} = useContext(UserContext)

    const navigate = useNavigate()

    return (
        <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
                <SpaIcon />&nbsp;(not)ShopBonsai&nbsp;<SpaIcon />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map(({route, link}) => (
                <Button
                    key={link}
                    onClick={() => navigate(route)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {link === 'Products' ? (
                            <HomeIcon />
                        ) : (
                            <AccountBoxIcon />
                        )
                    }
                    {link}
                </Button>
                ))}
            </Box>
            {userProfile ? (
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                    <EmojiPeopleIcon/>
                    &nbsp;{userProfile.name}, Welcome!
                </Typography>
            ) : null}
            </Toolbar>
        </Container>
        </AppBar>
    )
}
export default MenuBar
