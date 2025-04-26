import React, { useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { Container, CssBaseline, AppBar, Toolbar, Typography, Button, Box, Tabs, Tab } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./components/Login";
import Register from "./components/Register";
import TodoList from "./components/ToDoList";
import CategoryList from "./components/CategoryList";
import ProtectedRoute from "./components/ProtectedRoute";
import { SnackbarProvider } from "./context/SnackbarContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./App.css";

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

const AppContent: React.FC = () => {
  const { isAuthenticated, logout } = useAuth(); // Используем AuthContext
  const [activeTab, setActiveTab] = useState<string>("todos");
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            To-Do List App
          </Typography>
          <Button color="inherit" onClick={logout}>
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
                <ProtectedRoute>
                  <TodoList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <ProtectedRoute>
                  <CategoryList />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/todoitems" />} />
          </Routes>
        </Box>
      </Container>
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <SnackbarProvider>
          <AppContent />
        </SnackbarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;