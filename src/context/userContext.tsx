import { createContext, useState, useContext } from 'react';

interface AuthContextType {
  user: any;
  setUser: Function;
  isSignedIn: boolean;
  setIsSignedIn: Function;
  userToken?: string;
  userData?: string;
}

export type User = {
  email: string;
  fullName: string;
  updatedAt: string;
  verified: boolean;
  username: string;
  phoneNumber: string;
};

export const GlobalContext = createContext<AuthContextType | null>(null);

export const useGlobalContext = () => {
  const { user, setUser, isSignedIn, setIsSignedIn, userToken, userData }: any =
    useContext(GlobalContext);
  return { user, setUser, isSignedIn, setIsSignedIn, userToken, userData };
};

const AppContext = ({ children }: any) => {
  const storedTokenValue: any = localStorage.getItem('houser-user');

  if (!storedTokenValue) {
    console.warn('No token present');
  }

  const userToken = JSON.parse(storedTokenValue);

  const storedUserData: any = localStorage.getItem('userData');
  if (!storedUserData) {
    console.warn('No user is logged in');
  }
  const userData = JSON.parse(storedUserData);

  const [user, setUser] = useState(userData ? userData : null);
  const [isSignedIn, setIsSignedIn] = useState(userToken ? true : false);

  return (
    <GlobalContext.Provider
      value={{ user, setUser, isSignedIn, setIsSignedIn, userToken, userData }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
