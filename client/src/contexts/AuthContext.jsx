import { createContext, useContext, useEffect, useState } from "react";
import useApi from "../hooks/useApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initialCheck, setInitialCheck] = useState(false);
  const [loading, setLoading] = useState(true);
  const { callApi } = useApi();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setInitialCheck(true);
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await callApi({ method: "GET", endpoint: "/users/me" });
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setInitialCheck(true);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials) => {
    const res = await callApi({
      method: "POST",
      endpoint: "/auth/signin",
      data: credentials,
      auth: false,
    });

    localStorage.setItem("token", res.token);
    setUser(res.data);
  };

  const signup = async (data) => {
    const res = await callApi({
      method: "POST",
      endpoint: "/auth/signup",
      data,
      auth: false,
    });

    localStorage.setItem("token", res.token);
    setUser(res.data);
  };

  const logout = async () => {
    await callApi({ method: "GET", endpoint: "/users/signout" });
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        initialCheck,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
