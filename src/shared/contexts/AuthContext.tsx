import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Environment } from '../environment';
import { AuthService } from '../services/api/auth/AuthService';

interface IAuthContextData {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>
  logout: () => void;
}

const AuthContext = createContext({} as IAuthContextData);

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {

  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    const s = localStorage.getItem(Environment.LOCAL_STORAGE__ACCESS_TOKEN);
    setAccessToken(s ? JSON.parse(s) : undefined);
  }, []);
  
  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password);
    if (result instanceof Error)
      return result.message;
    else {
      setAccessToken(result.accessToken);
      localStorage.setItem(Environment.LOCAL_STORAGE__ACCESS_TOKEN, JSON.stringify(result.accessToken));
    }
  }, []);

  const handleLogout = useCallback(() => {
    setAccessToken(undefined);
    localStorage.removeItem(Environment.LOCAL_STORAGE__ACCESS_TOKEN);
  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  return (
    <AuthContext.Provider value={{isAuthenticated, login: handleLogin, logout: handleLogout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);