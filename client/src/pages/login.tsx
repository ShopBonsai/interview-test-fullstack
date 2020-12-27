import React from 'react';
import { GoogleLogin } from 'react-google-login';

const Login = props => {
    const responseGoogle = response => {
        console.log(response);
    };
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <GoogleLogin
                clientId="1057747297021-a6jjec4ohpsjr4gnc523afpes0nuuup4.apps.googleusercontent.com"
                buttonText="Continue with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

export default Login;
