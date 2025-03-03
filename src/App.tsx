import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import TodoList from "./components/ToDoList";
import CategoryList from "./components/CategoryList";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthService from "./services/AuthService";
import "./App.css"; // Импортируем стили

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("todos");
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
      {isAuthenticated ? (
        <>
          <div className="header">
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
          <div className="tabs">
            <button className={activeTab === "todos" ? "active" : ""} onClick={() => setActiveTab("todos")}>Todo Items</button>
            <button className={activeTab === "categories" ? "active" : ""} onClick={() => setActiveTab("categories")}>Categories</button>
          </div>
          <div className="tab-content">
            {activeTab === "todos" && <TodoList />}
            {activeTab === "categories" && <CategoryList />}
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="*" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      )}
    </div>
  );
};

export default App;