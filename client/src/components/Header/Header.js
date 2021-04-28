import React from 'react';

const Header = ({ username, onUsernameInput }) => {
  /*
   * NOTE: This is just for demonstration purposes.
   * Ideally you would want to store this information in a cookie or
   * other persistent storage on client
   */

  /*
   * authStatus => ENUM::string => ["IDLE", "PENDING", "AUTHED", "UN_AUTHED"]
   * Using ENUM-likes to manage the different HTTP "statuses"
   * This is preferable to using Booleans, ie. (isLoading), as it
   * it provides you more flexibility
   */

  const [authStatus, setAuthStatus] = React.useState(
    username === '' ? 'IDLE' : 'AUTHED'
  );

  const submitUsername = async e => {
    e.preventDefault();

    // TODO: Actually do a query over here if there is time
    /*
     * I had a terrible time with Apollo...
     * This is all hardcoded.
     */
    setAuthStatus('PENDING');

    // Best code in the world right here.
    if (username === 'bonsai24') {
      setAuthStatus('AUTHED');
      window.localStorage.setItem('username', username);
      window.localStorage.setItem(
        'user_id',
        '02ddaf20-4a70-4fd8-8a2f-823443468786'
      );
    } else if (username === 'bonsai48') {
      window.localStorage.setItem('username', username);
      window.localStorage.setItem(
        'user_id',
        '018643b6-1bc6-4d1d-847b-2e994e548305'
      );
    } else {
      setAuthStatus('UN_AUTHED');
      // TODO: Users deserve to know what has failed.
      /*
       * Only "clear" out necessary fields
       * Assure they are _obvious_ (outlined in red)
       * Change the .focus() to be the first invalid field
       */
    }
  };

  return (
    <>
      {/* TODO: ON_PENDING load a spinning gif, but... not now */}
      {authStatus === 'UN_AUTHED' || authStatus === 'IDLE' ? (
        <form onSubmit={submitUsername}>
          <label htmlFor="username">
            Username
            <span>You are not currently logged in</span>
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={onUsernameInput}
          />
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
