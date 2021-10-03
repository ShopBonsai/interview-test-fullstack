import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import { AppContext } from '../../contexts/AppContext';

import './header.css';

const Header = (props) => {
  const history = useHistory();

  const { items, isLoggedIn, logout } = useContext(AppContext);

  return (
    <div className="header">
      <Link className="title" to="/">
        BONSAI TEST
      </Link>
      <div className="options">
        <div className="option">
          {isLoggedIn() ? (
            <Link className="option" onClick={() => logout()} to="/">
              SIGN OUT
            </Link>
          ) : (
            <Link to="/login">SIGN IN</Link>
          )}
        </div>
        {isLoggedIn() ? <Link to="/orders">ORDERS</Link> : ''}
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
