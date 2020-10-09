import React from 'react';

export const setLocalStorage = (key, itemToSet) => (
  window.localStorage.setItem(key, JSON.stringify(itemToSet))
);

export const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));

// https://joshwcomeau.com/react/persisting-react-state-in-localstorage/
export const useStickyState = (defaultValue, key) => {
  const [value, setValue] = React.useState(() => {
    const stickyValue = getLocalStorage(key);
    return stickyValue !== null
      ? stickyValue
      : defaultValue;
  });
  React.useEffect(() => {
    setLocalStorage(key, value);
  }, [key, value]);
  return [value, setValue];
};
