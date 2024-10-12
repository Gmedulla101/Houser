import { createContext, useState, useContext } from 'react';

export const GlobalContext = createContext(null);

export const useGlobalContext = () => {
  const { user, setUser, isSignedIn, setIsSignedIn }: any =
    useContext(GlobalContext);
  return { user, setUser, isSignedIn, setIsSignedIn };
};

const AppContext = ({ children }: any) => {
  const storedTokenValue: any = localStorage.getItem('user');
  if (!storedTokenValue) {
    console.error('No token present');
  }
  const userToken = JSON.parse(storedTokenValue);

  const storedUserData: any = localStorage.getItem('userData');
  if (!storedUserData) {
    console.error('No user is logged in');
  }
  const userData = JSON.parse(storedUserData);

  const [user, setUser] = useState(userData ? userData: null);
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
