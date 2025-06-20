import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AuthGuard({ children }) {
  const { isAuthenticated, initialCheck } = useAuth();

  if (!initialCheck) return null;

  return isAuthenticated ? <Navigate to="/notes" replace /> : children;
}
