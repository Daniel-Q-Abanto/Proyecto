import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AxiosInstance from '../Axios';
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const EliminarMarca = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [openDialog, setOpenDialog] = useState(true);
  const [error, setError] = useState('');
  const [marca, setMarca] = useState(null);

  useEffect(() => {
    const fetchMarca = async () => {
      try {
        const response = await AxiosInstance.get(`marca/${id}/`);
        setMarca(response.data);
      } catch (error) {
        console.error('Error fetching marca:', error);
        setError('Error al obtener los datos de la marca.');
      }
    };

    fetchMarca();
  }, [id]);

  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`marca/${id}/`);
      navigate('/marca', { state: { message: `La marca ${marca.nombre} se eliminó correctamente.` } });
    } catch (error) {
      console.error('Error deleting marca:', error);
      setError('Error al eliminar la marca. Intente nuevamente.');
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    navigate('/marca');
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
        <DialogTitle id="alert-dialog-title">{"Eliminar Marca"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ color: 'black' }}>
            {marca ? (
              <span>¿Estás seguro de que deseas eliminar la marca <strong>{marca.nombre}</strong>? Esta acción no se puede deshacer.</span>
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

export default EliminarMarca;
