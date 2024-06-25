import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AxiosInstance from '../Axios';
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const EliminarProducto = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [openDialog, setOpenDialog] = useState(true);
  const [error, setError] = useState('');
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await AxiosInstance.get(`producto/${id}/`);
        setProducto(response.data);
      } catch (error) {
        console.error('Error fetching producto:', error);
        setError('Error al obtener los datos del producto.');
      }
    };

    fetchProducto();
  }, [id]);

  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`producto/${id}/`);
      navigate('/producto', { state: { message: `El producto ${producto.nombre} se eliminó correctamente.` } });
    } catch (error) {
      console.error('Error deleting producto:', error);
      setError('Error al eliminar el producto. Intente nuevamente.');
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    navigate('/producto');
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
        <DialogTitle id="alert-dialog-title">{"Eliminar Producto"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ color: 'black' }}>
            {producto ? (
              <span>¿Estás seguro de que deseas eliminar el producto <strong>{producto.nombre}</strong>? Esta acción no se puede deshacer.</span>
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

export default EliminarProducto;
