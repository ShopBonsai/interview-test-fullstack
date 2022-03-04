import React, { useContext } from 'react'
import { Button } from 'reactstrap'

import { UserContext } from '../../context/user.context'

const GoogleLogoutButton = ({ buttonText }) => {
    const {signOutWithGoogle} = useContext(UserContext)

    const handleOnClick = () => {
        signOutWithGoogle()
    }

    return (
        <Button color="danger" onClick={handleOnClick}>
            {buttonText}
        </Button>
    )
}

export default GoogleLogoutButton