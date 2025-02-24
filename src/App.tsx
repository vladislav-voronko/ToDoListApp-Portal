import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import TodoList from "./components/ToDoList";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthService from "./services/AuthService";
import "./App.css"; // Импортируем стили

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = AuthService.getToken();
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    navigate("/login");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      <div className="header">
        {isAuthenticated && <button className="logout-button" onClick={handleLogout}>Logout</button>}
      </div>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <TodoList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;