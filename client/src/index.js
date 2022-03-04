import React from 'react'
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import apolloClient from './createApolloClient';
import { CartProvider } from './context/cart.context';
import { UserProvider } from './context/user.context';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <UserProvider>
            <CartProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </CartProvider>
        </UserProvider>
    </ApolloProvider>,
    document.getElementById('root')
);