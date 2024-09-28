import { createContext, useState, useContext } from 'react';

export const GlobalContext = createContext(null);

export const useGlobalContext = () => {
  const { user, setUser, isSignedIn, setIsSignedIn }: any =
    useContext(GlobalContext);
  return { user, setUser, isSignedIn, setIsSignedIn };
};

const AppContext = ({ children }: any) => {
  const storedValue = localStorage.getItem('user');
  const userToken = JSON.parse(storedValue);

  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(userToken ? true : false);

  return (
    <GlobalContext.Provider
      value={{ user, setUser, isSignedIn, setIsSignedIn }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
