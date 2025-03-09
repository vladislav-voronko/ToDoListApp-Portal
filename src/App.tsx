import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { Container, CssBaseline, AppBar, Toolbar, Typography, Button, Box, Tabs, Tab } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./components/Login";
import TodoList from "./components/ToDoList";
import CategoryList from "./components/CategoryList";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthService from "./services/AuthService";
import "./App.css"; // Импортируем стили

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#121212",
    },
    text: {
      primary: "#ffffff",
      secondary: "#ffffff",
    },
  },
});

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-container">
        {isAuthenticated ? (
          <>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  To-Do List App
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </Toolbar>
              <Tabs
                value={activeTab}
                onChange={(_event, newValue) => setActiveTab(newValue)}
                aria-label="nav tabs"
              >
                <Tab label="Todo Items" value="todos" onClick={() => navigate("/todoitems")} />
                <Tab label="Categories" value="categories" onClick={() => navigate("/categories")} />
              </Tabs>
            </AppBar>
            <Container>
              <Box mt={4}>
                <Routes>
                  <Route
                    path="/todoitems"
                    element={
                      <ProtectedRoute isAuthenticated={isAuthenticated}>
                        <TodoList />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/categories"
                    element={
                      <ProtectedRoute isAuthenticated={isAuthenticated}>
                        <CategoryList />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/todoitems" />} />
                </Routes>
              </Box>
            </Container>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;