import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AxiosInstance from '../Axios';
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const EliminarUsuario = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [openDialog, setOpenDialog] = useState(true);
  const [error, setError] = useState('');
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await AxiosInstance.get(`usuario/${id}/`);
        setUsuario(response.data);
      } catch (error) {
        console.error('Error fetching usuario:', error);
        setError('Error al obtener los datos del usuario.');
      }
    };

    fetchUsuario();
  }, [id]);

  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`usuario/${id}/`);
      navigate('/usuario', { state: { message: `El usuario ${usuario.nombre} se eliminó correctamente.` } });
    } catch (error) {
      console.error('Error deleting usuario:', error);
      setError('Error al eliminar el usuario. Intente nuevamente.');
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    navigate('/usuario');
  };

  return (
    <Box>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="sm"
        sx={{ backdropFilter: 'blur(3px)' }} // Añade este estilo para un efecto de desenfoque
      >
        <DialogTitle id="alert-dialog-title">{"Eliminar Usuario"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ color: 'black' }}>
            {usuario ? (
              <span>¿Estás seguro de que deseas eliminar al usuario <strong>{usuario.nombre}</strong>? Esta acción no se puede deshacer.</span>
            ) : (
              'Cargando...'
            )}
          </DialogContentText>
          {error && <Typography color="error">{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EliminarUsuario;
