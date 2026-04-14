import { createContext, useContext, useEffect, useState } from "react";

import api, { clearTokens, getStoredTokens, setTokens } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [tokens, setTokensState] = useState(() => getStoredTokens());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      if (!tokens?.access) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/auth/me");
        setUser(data);
      } catch {
        clearSession();
      } finally {
        setLoading(false);
      }
    }

    bootstrap();
  }, []);

  function persistSession(nextTokens, nextUser) {
    setTokens(nextTokens);
    setTokensState(nextTokens);
    setUser(nextUser);
  }

  function clearSession() {
    clearTokens();
    setTokensState(null);
    setUser(null);
  }

  async function login(credentials) {
    const { data } = await api.post("/auth/login", credentials);
    persistSession({ access: data.access, refresh: data.refresh }, data.user);
    return data.user;
  }

  async function register(payload) {
    const { data } = await api.post("/auth/register", payload);
    return data.user;
  }

  async function logout() {
    clearSession();
  }

  return (
    <AuthContext.Provider
      value={{
        tokens,
        user,
        loading,
        isAuthenticated: Boolean(tokens?.access),
        login,
        logout,
        register,
        setAuthSession: persistSession,
        clearSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
