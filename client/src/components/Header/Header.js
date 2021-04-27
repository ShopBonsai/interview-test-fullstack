import React from 'react';

const Header = ({ username, onUsernameInput }) => {
  /*
   * NOTE: This is just for demonstration purposes.
   * Ideally you would want to store this information in a cookie or
   * other persistant storage on client
   */

  /*
   * authStatus => ENUM::string => ["IDLE", "PENDING", "AUTHED", "UN_AUTHED"]
   * Using ENUM-likes to manage the different HTTP "statuses"
   * This is preferable to using Booleans, ie. (isLoading), as it
   * it provides you more flexibility
   */

  const [authStatus, setAuthStatus] = React.useState('IDLE');

  const submitUsername = async e => {
    e.preventDefault();
    debugger;
    // Query if this is a
    setAuthStatus('PENDING');

    if (username === 'bonsai24') {
      setAuthStatus('AUTHED');
    } else {
      setAuthStatus('UN_AUTHED');
    }
  };

  return (
    <>
      {authStatus === 'UN_AUTHED' || authStatus === 'IDLE' ? (
        <form onSubmit={submitUsername}>
          <label htmlFor="username">
            Username
            <span>You are not currently logged in</span>
          </label>
          <input id="username" value={username} onChange={onUsernameInput} />
        </form>
      ) : (
        <div className="test">
          <p>Hi {username}</p>
        </div>
      )}
    </>
  );
};

export default Header;
