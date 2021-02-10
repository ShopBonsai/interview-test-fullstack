import React, {Component} from 'react'
import {ApolloProvider} from 'react-apollo';
import apolloClient from './createApolloClient';
import Products from './components/Products';
import NavBarApp from './components/NavBarApp';
import Cart from './components/Cart';
import { Provider } from "react-redux";
import store from "./redux/store";
import {Container, Row, Col} from 'reactstrap';

class App extends Component {
    render() {
        return (
            <ApolloProvider client={apolloClient}>
                <Provider store={store}>
                    <NavBarApp/>
                    <Container fluid={true}>
                        <Row>
                            <Col xs="9">
                                <Products/>
                            </Col>
                            <Col xs="3">
                                <Cart/>
                            </Col>
                        </Row>
                    </Container>
                </Provider>
            </ApolloProvider>
        )
    }
}

export default App;
