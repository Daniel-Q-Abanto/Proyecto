// src/components/Login.js
import React, { useState } from 'react';
import authService from '../../services/authService';
import { Container, TextField, Button, Typography, Box, Link, Grid, Alert } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('error');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    authService.login(username, password).then(
      () => {
        navigate('/home'); 
      },
      (error) => {
        console.error('Error de inicio de sesión:', error.response);
        setSeverity('error');
        setMessage('Usuario o contraseña incorrectos');
        setOpen(true);
      }
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Iniciar Sesión
        </Typography>
        {open && (
          <Alert 
            onClose={handleClose} 
            severity={severity} 
            sx={{ width: '100%', mb: 2, fontSize: '1.2rem' }}
          >
            {message}
          </Alert>
        )}
        <form onSubmit={handleLogin}>
          <TextField
            label="Usuario"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Contraseña"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
            Iniciar sesión
          </Button>
        </form>
        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid item>
            <Link component={RouterLink} to="/register" variant="body2">
              ¿No tienes una cuenta? Regístrate
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
