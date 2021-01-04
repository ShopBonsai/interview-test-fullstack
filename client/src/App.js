import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo';
import apolloClient from './createApolloClient';
import Cart from './pages/Cart';
import NotFoundPage from './components/404';
import { Provider } from "react-redux";
import ProductsList from './components/Products';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import NavigationBar from './components/NavBar';
import './styles.css';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <Router>
            <NavigationBar />
            <Switch>
              <Route exact path="/" render={(props) => (<ProductsList {...props}/>)} />
              <Route path="/cart">
                <Cart />
              </Route>
              <Route component={NotFoundPage} />
            </Switch>
          </Router>
        </Provider>
      </ApolloProvider>
    )
  }
}

export default App;