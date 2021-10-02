import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { CartContext } from '../../CartContext';
import { AUTH_TOKEN } from '../../consts';

import './header.css';

const Header = (props) => {
  const history = useHistory();

  const { toggleCart, items } = useContext(CartContext);
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <div className="header">
      <Link className="title" to="/">
        BONSAI TEST
      </Link>
      <div className="options">
        <div className="option">
          {authToken ? (
            <div
              className="option"
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN);
                history.push(`/`);
              }}
            >
              SIGN OUT
            </div>
          ) : (
            <Link to="/login">SIGN IN</Link>
          )}
        </div>
        {authToken ? <Link to="/orders">ORDERS</Link> : ''}
        <Link className="option" to="/checkout">
          CHECKOUT
        </Link>
        <div>{items ? <button className="cart"> {items.length} </button> : ''}</div>
      </div>
    </div>
  );
};

export default Header;
