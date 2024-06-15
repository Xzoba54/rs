import { ReactNode, createContext, useState } from "react";

interface Auth {
  token: string;
  name: string;
  picture: string;
}

interface AuthState {
  auth?: Auth;
  setAuth: (newAuth: Auth) => void;
  logout: () => void;
}

const defaultState: AuthState = {
  setAuth: (newAuth: Auth) => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthState>(defaultState);

interface Props {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<Auth>();

  const handleSetAuth = (newAuth: Auth) => {
    setAuth(newAuth);
  };

  const handleLogout = () => {
    setAuth(undefined);
  };

  return <AuthContext.Provider value={{ auth, setAuth: handleSetAuth, logout: handleLogout }}>{children}</AuthContext.Provider>;
};
