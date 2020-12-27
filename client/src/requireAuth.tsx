import { navigate } from '@reach/router';
import React from 'react';

const requireAuth = Component => props => {
    const isLoggedIn = false;
    const isLoading = false;
    if (isLoggedIn) {
        return <Component {...props} />;
    } else {
        navigate('/login', { replace: true });
    }
};

export default requireAuth;
