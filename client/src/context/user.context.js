import React, { useEffect } from 'react'
import { createContext, useState } from 'react'
import { useGoogleLogin, useGoogleLogout } from 'react-google-login'
import { useQuery, gql, useMutation } from '@apollo/client'
import { CLIENT_ID } from '../components/google-client/google-client'

const GET_USER = gql`  
    query($googleId: String!) {
        user(input: $googleId) {
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

const CREATE_USER = gql `
    mutation createUser($user: UserInput!) {
        createUser(user: $user) {
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

export const UserContext = createContext({
    userProfile: null,
    setUserProfile: () => {},
    googleProfile: null,
    setGoogleProfile: () => {},
    signInWithGoogle: () => {},
    signOutWithGoogle: () => {},
    showLoginButton: null,
    setShowLoginButton: () => {}
})

export const UserProvider = ({children}) => {
    const [userProfile, setUserProfile] = useState(null)
    const [googleProfile, setGoogleProfile] = useState(null)
    const [showLoginButton, setShowLoginButton] = useState(true)

    // Successful login with Google signin will set the google profile state and show logout button
    const onLoginSuccess = ({ profileObj }) => {
        setGoogleProfile(profileObj)
        setShowLoginButton(false)
    }

    // Successful login with Google signin will set the google profile and user profile state and show login button
    const onLogoutSuccess = () => {
        setGoogleProfile(null)
        setUserProfile(null)
        setShowLoginButton(true)
    }

    // Google API call to assist user sign-in
    const { signIn } = useGoogleLogin({
        clientId: CLIENT_ID,
        onSuccess: onLoginSuccess,
        isSignedIn: true,
    })

    // Google API call to assist user sign-out
    const { signOut } = useGoogleLogout({
        clientId: CLIENT_ID,
        onLogoutSuccess: onLogoutSuccess,
    }) 
    const [createUser, { data: createdProfileData }] = useMutation(CREATE_USER)

    // GraphQL "get user" query looks for a user in the database with this google id. Refetched called later when google profile state is truthy
    const { data: profileData, refetch } = useQuery(GET_USER, {
        variables: { googleId: googleProfile ? googleProfile.googleId : '' }
    })
    
    // Monitors google profile state and refetches data when google profile is truthy
    useEffect(() => {
        if(googleProfile) {
            refetch()
        }
    }, [googleProfile])

    // Re-runs when profileData is returned as a result of the getUser GQL query on line 97
    // Line 111 in the if statement would run if the profileData returned truthy because it user exists in the database
    // Else, line 116 in the else-if statement would run because profileData returned falsey and so a new user will be created in the database
    useEffect(() => {
        if (profileData) {
            const { user } = profileData
            setUserProfile(user)
        } else if(googleProfile) {
            const {email, name, imageUrl, googleId} = googleProfile
            createUser({
                variables: {
                    user: {email, name, imageUrl, googleId, cartItems: [], likedItems: []}
                }
            })
        }
    }, [profileData])

    // Runs when createUser GQL mutation is fired and createdProfileData is returned
    // this useEffect will set the returned createdProfile data as the user profile context on this app
    useEffect(() => {
        if(!createdProfileData) return
        const {createUser} = createdProfileData
        setUserProfile(createUser)
    }, [createdProfileData])

    const value = {userProfile, setUserProfile, googleProfile, setGoogleProfile, showLoginButton, signInWithGoogle: signIn, signOutWithGoogle: signOut}

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}