import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Box, Typography, Container, Alert, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import superUserService from '../../services/superUserService';

const RegisterSuperUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Función de autenticación
  const authenticate = async () => {
    try {
      const authResponse = await superUserService.login('daniel', '123456');
      return authResponse.access; // Devuelve el token
    } catch (error) {
      setErrorMessage(error.message);
      throw new Error('Error de autenticación: ' + error.message);
    }
  };

  // Función de manejo del envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }
    try {
      const obtainedToken = await authenticate(); // Autentica antes de crear el superusuario
      if (!obtainedToken) {
        setErrorMessage('No se pudo obtener el token de autenticación');
        return;
      }
      await superUserService.createSuperUser(username, password, obtainedToken);
      setSuccessMessage('Superusuario creado exitosamente');
      setErrorMessage('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Hubo un error al crear el superusuario';
      setErrorMessage(errorMessage);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrar Superusuario
        </Typography>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nuevo Usuario"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Nueva Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrar
          </Button>
          <Link href="/" variant="body2">
            {"¿Ya tienes una cuenta? Inicia sesión"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterSuperUser;
