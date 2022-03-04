import React, { useContext } from 'react'
import { Button } from 'reactstrap'

import { UserContext } from '../../context/user.context'

const GoogleLoginButton = ({ buttonText }) => {
    const {signInWithGoogle} = useContext(UserContext)

    const handleOnClick = () => {
        signInWithGoogle()
    }

    return (
        <Button color="primary" onClick={handleOnClick}>
            {buttonText}
        </Button>
    )
}

export default GoogleLoginButton