import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from "../context/SnackbarContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      showSnackbar("Login successful", "success");
      navigate("/todoitems");
    } catch (err) {
      setError("Invalid email or password");
      showSnackbar("Login failed. Please check your credentials.", "error");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h2" gutterBottom>
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box component="form" onSubmit={handleLogin} noValidate>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;