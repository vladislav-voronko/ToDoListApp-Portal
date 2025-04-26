import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectPath = "/login",
}) => {
  const { isAuthenticated } = useAuth(); // Получаем состояние аутентификации из AuthContext

  if (!isAuthenticated) {
    // Если пользователь не аутентифицирован, перенаправляем на redirectPath
    return <Navigate to={redirectPath} />;
  }

  // Если пользователь аутентифицирован, рендерим дочерние компоненты
  return <>{children}</>;
};

export default ProtectedRoute;