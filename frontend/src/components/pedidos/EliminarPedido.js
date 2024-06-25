import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AxiosInstance from '../Axios';
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const EliminarPedido = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [openDialog, setOpenDialog] = useState(true);
  const [error, setError] = useState('');
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const response = await AxiosInstance.get(`pedido/${id}/`);
        setPedido(response.data);
      } catch (error) {
        console.error('Error fetching pedido:', error);
        setError('Error al obtener los datos del pedido.');
      }
    };

    fetchPedido();
  }, [id]);

  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`pedido/${id}/`);
      navigate('/pedido', { state: { message: `El pedido de ${pedido.nombre} se eliminó correctamente.` } });
    } catch (error) {
      console.error('Error deleting pedido:', error);
      setError('Error al eliminar el pedido. Intente nuevamente.');
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    navigate('/pedido');
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
        <DialogTitle id="alert-dialog-title">{"Eliminar Pedido"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ color: 'black' }}>
            {pedido ? (
              <span>¿Estás seguro de que deseas eliminar el pedido de <strong>{pedido.nombre}</strong>? Esta acción no se puede deshacer.</span>
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

export default EliminarPedido;
