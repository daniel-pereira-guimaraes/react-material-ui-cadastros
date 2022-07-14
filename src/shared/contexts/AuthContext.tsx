import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { AuthService } from '../services/api/auth/AuthService';

const LOCAL_STORAGE__ACCESS_TOKEN = 'APP_ACCESS_TOKEN';

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
    const s = localStorage.getItem(LOCAL_STORAGE__ACCESS_TOKEN);
    setAccessToken(s ? JSON.parse(s) : undefined);
  }, []);
  
  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password);
    if (result instanceof Error)
      return result.message;
    else {
      setAccessToken(result.accessToken);
      localStorage.setItem(LOCAL_STORAGE__ACCESS_TOKEN, JSON.stringify(result.accessToken));
    }
  }, []);

  const handleLogout = useCallback(() => {
    setAccessToken(undefined);
    localStorage.removeItem(LOCAL_STORAGE__ACCESS_TOKEN);
  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  return (
    <AuthContext.Provider value={{isAuthenticated, login: handleLogin, logout: handleLogout}}>
      {children}
    </AuthContext.Provider>
  );
};