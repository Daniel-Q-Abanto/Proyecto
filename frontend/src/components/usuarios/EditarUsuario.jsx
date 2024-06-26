import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Alert, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import MyDatePickerField from '../forms/MyDatePickerField';
import { useForm, Controller } from 'react-hook-form';
import MyTextField from '../forms/MyTextField';
import AxiosInstance from '../Axios';
import Dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import useBlockNavigation from '../../hooks/useBlockNavigation';

const EditarUsuario = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const defaultValues = {
    nombre: '',
    email: '',
    direccion: '',
    telefono: '',
    password: '',
    fecha: '',
  };

  const { handleSubmit, control, setValue } = useForm({ defaultValues });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useBlockNavigation(true, '¿Estás seguro de cancelar la edición del usuario?');

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await AxiosInstance.get(`usuario/${id}/`);
        const usuario = response.data;
        setValue('nombre', usuario.nombre);
        setValue('email', usuario.email);
        setValue('direccion', usuario.direccion);
        setValue('telefono', usuario.telefono);
        setValue('password', usuario.password);
        setValue('fecha', Dayjs(usuario.fecha));
      } catch (error) {
        console.error('Error fetching usuario:', error);
      }
    };

    fetchUsuario();
  }, [id, setValue]);

  const submission = async (data) => {
    const formattedDate = Dayjs(data.fecha["$d"]).format("YYYY-MM-DD");
    try {
      const response = await AxiosInstance.put(`usuario/${id}/`, {
        nombre: data.nombre,
        email: data.email,
        direccion: data.direccion,
        telefono: data.telefono,
        password: data.password,
        fecha: formattedDate,
      });
      console.log('Response:', response);
      navigate('/usuario', { state: { message: `El usuario ${data.nombre} se actualizó correctamente.` } });
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : 'An error occurred');
      setError('Error al actualizar el usuario. Verifique los datos e intente nuevamente.');
    }
  };

  const handleCancel = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = (confirm) => {
    setOpenDialog(false);
    if (confirm) {
      navigate('/usuario');
    }
  };

  return (
    <div>
      <Box sx={{
          backgroundImage: 'linear-gradient(to right, rgba(88, 112, 153, 1), rgba(88, 112, 153, 0.7))',
          color: '#fff',
          padding: '12px 16px',
          marginBottom: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
        }}>
          <Typography variant="h5">
              Editar Usuario
          </Typography>
      </Box>

      <form onSubmit={handleSubmit(submission)}>
        <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column' }}>
          {error && <Alert severity="error">{error}</Alert>}
          <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
            <MyTextField
              id="nombre"
              label="Nombre"
              name="nombre"
              control={control}
              placeholder="Proporcionar el nombre"
              width={'25%'}
              autoComplete="name"
            />
            <MyTextField
              id="email"
              label="Email"
              name="email"
              control={control}
              placeholder="Proporcionar el email"
              width={'25%'}
              autoComplete="email"
            />
            <MyTextField
              id="direccion"
              label="Dirección"
              name="direccion"
              control={control}
              placeholder="Proporcionar la dirección"
              width={'25%'}
              autoComplete="street-address"
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
            <MyTextField
              id="telefono"
              label="Teléfono"
              name="telefono"
              control={control}
              placeholder="Proporcionar el teléfono"
              width={'25%'}
              autoComplete="tel"
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Proporcionar la contraseña"
                  variant="outlined"
                  sx={{ width: '25%' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="new-password"
                />
              )}
            />
            <MyDatePickerField
              id="fecha"
              label="Fecha"
              name="fecha"
              control={control}
              width={'25%'}
              autoComplete="bday"
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" width="100%">
            <Box width="16%" sx={{ marginRight: 2 }}>
              <Button variant="contained" color="error" onClick={handleCancel} sx={{ width: '100%', backgroundColor: '#D15454' }}>
                Cancelar
              </Button>
            </Box>
            <Box width="16%">
              <Button variant="contained" type="submit" sx={{ width: '100%', backgroundColor: '#587099', '&:hover': { backgroundColor: '#638CD3' } }}>
                Guardar Cambios
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
      
      <Dialog
        open={openDialog}
        onClose={() => handleDialogClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Cancelar Edición"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de cancelar la edición del usuario?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="primary">
            No
          </Button>
          <Button onClick={() => handleDialogClose(true)} color="primary" autoFocus>
            Sí
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditarUsuario;
