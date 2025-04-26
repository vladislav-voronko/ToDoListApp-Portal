import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import { useSnackbar } from "../context/SnackbarContext";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showSnackbar("Passwords do not match", "error");
      return;
    }

    try {
      await AuthService.register({ email, password });
      showSnackbar("Registration successful", "success");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      showSnackbar("Registration failed. Please try again.", "error");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h2" gutterBottom>
          Register
        </Typography>
        <Box component="form" onSubmit={handleRegister} noValidate>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="dense"
            variant="outlined"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="dense"
            variant="outlined"
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="dense"
            variant="outlined"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;