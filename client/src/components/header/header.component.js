import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import { CartContext } from '../../contexts/CartContext';
import { AUTH_TOKEN } from '../../utils/consts';

import './header.css';

const Header = (props) => {
  const history = useHistory();

  const { items } = useContext(CartContext);
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <div className="header">
      <Link className="title" to="/">
        BONSAI TEST
      </Link>
      <div className="options">
        <div className="option">
          {authToken ? (
            <Link
              className="option"
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN);
              }}
              to="/"
            >
              SIGN OUT
            </Link>
          ) : (
            <Link to="/login">SIGN IN</Link>
          )}
        </div>
        {authToken ? <Link to="/orders">ORDERS</Link> : ''}
        <Link className="option" to="/checkout">
          CHECKOUT
        </Link>
        <div>
          {items ? (
            <Button color="primary" className="cart">
              {' '}
              {items.length}{' '}
            </Button>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
