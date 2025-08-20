import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { IUser } from '../interfaces/user';

type AuthContextType = {
  user: IUser | null;
  token: string | null;           // novo estado do token
  isAuthenticated: boolean;
  login: (user: IUser, token: string) => void; // recebe token
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Carregar usuário e token do localStorage ao iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedToken) setToken(savedToken);

    setLoading(false);
  }, []);

  const login = (userFromApi: any, token: string) => {
    localStorage.setItem('user', JSON.stringify(userFromApi));
    localStorage.setItem('token', token);

    setUser(userFromApi);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook seguro
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro do AuthProvider');
  }
  return context;
};
