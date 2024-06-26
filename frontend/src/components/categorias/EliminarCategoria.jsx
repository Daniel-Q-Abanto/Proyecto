import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AxiosInstance from '../Axios';
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const EliminarCategoria = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [openDialog, setOpenDialog] = useState(true);
    const [error, setError] = useState('');
    const [categoria, setCategoria] = useState(null);

    useEffect(() => {
        const fetchCategoria = async () => {
            try {
                const response = await AxiosInstance.get(`categoria/${id}/`);
                setCategoria(response.data);
            } catch (error) {
                console.error('Error fetching categoria:', error);
                setError('Error al obtener los datos de la categoría.');
            }
        };

        fetchCategoria();
    }, [id]);

    const handleDelete = async () => {
        try {
            await AxiosInstance.delete(`categoria/${id}/`);
            navigate('/categoria', { state: { message: `La categoría ${categoria.nombre} se eliminó correctamente.` } });
        } catch (error) {
            console.error('Error deleting categoria:', error);
            setError('Error al eliminar la categoría. Intente nuevamente.');
        }
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        navigate('/categoria');
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
                <DialogTitle id="alert-dialog-title">{"Eliminar Categoría"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ color: 'black' }}>
                        {categoria ? (
                            <span>¿Estás seguro de que deseas eliminar la categoría <strong>{categoria.nombre}</strong>? Esta acción no se puede deshacer.</span>
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

export default EliminarCategoria;
