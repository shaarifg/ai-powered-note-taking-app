import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function NoAuthGuard({ children }) {
  const { isAuthenticated, initialCheck } = useAuth();
  const location = useLocation();

  if (!initialCheck) return null;

  if (!isAuthenticated) {
    return (
      <Navigate
        to={`/signin?redirect=${encodeURIComponent(location.pathname)}`}
      />
    );
  }

  return children;
}
