import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AxiosInstance from '../Axios';
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const EliminarDetallePedido = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [openDialog, setOpenDialog] = useState(true);
    const [error, setError] = useState('');
    const [detallePedido, setDetallePedido] = useState(null);

    useEffect(() => {
        const fetchDetallePedido = async () => {
            try {
                const response = await AxiosInstance.get(`detallepedido/${id}/`);
                setDetallePedido(response.data);
            } catch (error) {
                console.error('Error fetching detalle pedido:', error);
                setError('Error al obtener los datos del detalle del pedido.');
            }
        };

        fetchDetallePedido();
    }, [id]);

    const handleDelete = async () => {
        try {
            await AxiosInstance.delete(`detallepedido/${id}/`);
            navigate('/detalle-pedido', { state: { message: `El detalle del pedido para el producto ${detallePedido.producto_nombre} se eliminó correctamente.` } });
        } catch (error) {
            console.error('Error deleting detalle pedido:', error);
            setError('Error al eliminar el detalle del pedido. Intente nuevamente.');
        }
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        navigate('/detalle-pedido');
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
                sx={{ backdropFilter: 'blur(3px)' }}
            >
                <DialogTitle id="alert-dialog-title">{"Eliminar Detalle Pedido"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ color: 'black' }}>
                        {detallePedido ? (
                            <span>¿Estás seguro de que deseas eliminar el detalle del pedido para el producto <strong>{detallePedido.producto_nombre}</strong>? Esta acción no se puede deshacer.</span>
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

export default EliminarDetallePedido;
