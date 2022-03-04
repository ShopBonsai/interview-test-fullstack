import React, { useContext } from 'react'
import { CardMedia, Grid, Card, CardContent, Typography} from '@mui/material'

import { UserContext } from '../../context/user.context'
import GoogleLoginButton from '../google-auth/google-login'
import GoogleLogoutButton from '../google-auth/google-logout'

const UserProfile = () => {
    const { userProfile, showLoginButton } = useContext(UserContext)

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" style={{marginTop: "15vh"}}>
            <Card variant="outlined">
                <CardContent>
                    {!userProfile ? (
                        <Typography sx={{ fontsize: 16}} color="text.secondary" gutterBottom>
                            Sign in with Social Media!
                        </Typography>
                    ) : null }
                    {userProfile ? (
                        <>
                            <Typography sx={{ fontsize: 16}} color="text.secondary">
                                {`Hello and welcome, ${userProfile.name}!`}
                            </Typography>
                            <CardMedia
                                component="img"
                                height="200"
                                image={userProfile.imageUrl}
                                alt="Profile Picture"
                            />
                            <Typography sx={{ fontsize: 16}} color="text.secondary">
                                {`Email: ${userProfile.email}`}
                            </Typography>
                        </>
                    ): null}   
                    <Grid container justifyContent="center">
                        {showLoginButton ? (
                            <GoogleLoginButton
                                buttonText="Login"
                            />
                        ) : (
                            <GoogleLogoutButton
                                buttonText="Logout"
                            />
                        )}
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default UserProfile