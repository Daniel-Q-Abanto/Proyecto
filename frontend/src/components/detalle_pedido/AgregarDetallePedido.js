import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import MyTextField from '../forms/MyTextField';
import MyDatePickerField from '../forms/MyDatePickerField';
import MySelectField from '../forms/MySelectField';
import { useForm } from 'react-hook-form';
import AxiosInstance from '../Axios';
import Dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import useBlockNavigation from '../../hooks/useBlockNavigation'; // Importa useBlockNavigation aquí

const AgregarDetallePedido = () => {
    const navigate = useNavigate();
    const defaultValues = {
        pedido: '',
        producto: '',
        cantidad: '',
        precio: '',
        fecha: '', // Deja la fecha vacía inicialmente
    };

    const { handleSubmit, control, setValue } = useForm({ defaultValues });
    const [error, setError] = useState('');
    const [pedidos, setPedidos] = useState([]);
    const [productos, setProductos] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    useBlockNavigation(true, '¿Estás seguro de cancelar la creación del detalle del pedido?');

    useEffect(() => {
        AxiosInstance.get('/pedido/')
            .then(response => {
                setPedidos(response.data);
            })
            .catch(error => {
                console.error('Error al cargar los pedidos:', error);
            });

        AxiosInstance.get('/producto/')
            .then(response => {
                setProductos(response.data);
            })
            .catch(error => {
                console.error('Error al cargar los productos:', error);
            });
    }, []);

    const handlePedidoChange = (event) => {
        const selectedPedidoId = parseInt(event.target.value, 10);
        const selectedPedido = pedidos.find(pedido => pedido.id === selectedPedidoId);
        if (selectedPedido) {
            setValue('pedido', selectedPedido.id);
            setValue('fecha', selectedPedido.fecha); // Configura la fecha con la fecha del pedido seleccionado
        }
    };

    const handleProductoChange = (event) => {
        const selectedProductoId = parseInt(event.target.value, 10);
        const selectedProducto = productos.find(producto => producto.id === selectedProductoId);
        if (selectedProducto) {
            setValue('producto', selectedProducto.id);
            setValue('precio', selectedProducto.precio);
        }
    };

    const submission = async (data) => {
        try {
            const response = await AxiosInstance.post('detallepedido/', {
                pedido: data.pedido,
                producto: data.producto,
                cantidad: data.cantidad,
                precio: data.precio,
                fecha: data.fecha, // Envía la fecha directamente como string
            });
            console.log('Response:', response);
            navigate('/detalle-pedido');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : 'An error occurred');
            setError('Error al crear el detalle del pedido. Verifique los datos e intente nuevamente.');
        }
    };

    const handleCancel = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = (confirm) => {
        setOpenDialog(false);
        if (confirm) {
            navigate('/detalle-pedido');
        }
    };

    return (
        <div>
            <Box sx={{
                backgroundImage: 'linear-gradient(to right, rgba(35, 186, 189, 0.8), rgba(90, 202, 170, 0.35))', // Degradado verde medio claro con transparencia
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
                    Crear Detalle Pedido
                </Typography>
            </Box>

            <form onSubmit={handleSubmit(submission)}>
                <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column' }}>
                    {error && <Alert severity="error">{error}</Alert>}
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
                        <MySelectField
                            id="pedido"
                            label="Pedido"
                            name="pedido"
                            control={control}
                            options={pedidos.map(pedido => ({ value: pedido.id, label: `Pedido ${pedido.id} de ${pedido.nombre_usuario}` }))}
                            width="25%"
                            onChangeExtra={handlePedidoChange}
                        />
                        <MySelectField
                            id="producto"
                            label="Producto"
                            name="producto"
                            control={control}
                            options={productos.map(producto => ({ value: producto.id, label: producto.nombre }))}
                            width="25%"
                            onChangeExtra={handleProductoChange}
                        />
                        <MyTextField
                            label="Cantidad"
                            name="cantidad"
                            control={control}
                            placeholder="Proporcionar la cantidad"
                            width={'25%'}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
                        <MyTextField
                            label="Precio"
                            name="precio"
                            control={control}
                            placeholder="Proporcionar el precio"
                            width={'25%'}
                        />
                        <MyDatePickerField
                            label="Fecha"
                            name="fecha"
                            control={control}
                            width={'25%'}
                        />
                    </Box>
                    <Box display="flex" justifyContent="flex-end" width="100%">
                        <Box width="16%" sx={{ marginRight: 2 }}>
                            <Button variant="contained" color="error" onClick={handleCancel} sx={{ width: '100%' }}>
                                Cancelar
                            </Button>
                        </Box>
                        <Box width="16%">
                            <Button variant="contained" type="submit" sx={{ width: '100%', backgroundColor: '#0073e6', '&:hover': { backgroundColor: '#005bb5' } }}>
                                Enviar
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
                <DialogTitle id="alert-dialog-title">{"Cancelar Creación"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Estás seguro de cancelar la creación del pedido?
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

export default AgregarDetallePedido;
