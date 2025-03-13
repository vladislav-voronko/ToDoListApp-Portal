import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { useSnackbar } from '../context/SnackbarContext';

interface LoginProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await AuthService.login({ email, password });
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      showSnackbar('Login failed. Please check your credentials.', 'error');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h2" gutterBottom>
          Login
        </Typography>
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
            sx={{ mt: 1 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;