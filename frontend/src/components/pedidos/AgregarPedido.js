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

const AgregarPedido = () => {
    const navigate = useNavigate();
    const defaultValues = {
        usuario: '',
        nombre: '',
        dni: '',
        direccion: '',
        telefono: '',
        email: '',
        fecha: '',
    };

    const { handleSubmit, control, setValue } = useForm({ defaultValues });
    const [error, setError] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    useBlockNavigation(true, '¿Estás seguro de cancelar la creación del pedido?');

    useEffect(() => {
        AxiosInstance.get('/usuario/')
            .then(response => {
                setUsuarios(response.data);
            })
            .catch(error => {
                console.error('Error al cargar los usuarios:', error);
            });
    }, []);

    const handleUsuarioChange = (event) => {
        const selectedUserId = parseInt(event.target.value, 10);
        const selectedUser = usuarios.find(user => user.id === selectedUserId);
        if (selectedUser) {
            setValue('usuario', selectedUser.id);
            setValue('nombre', selectedUser.nombre);
            setValue('direccion', selectedUser.direccion);
            setValue('telefono', selectedUser.telefono);
            setValue('email', selectedUser.email);
        }
    };

    const submission = async (data) => {
        const formattedDate = Dayjs(data.fecha["$d"]).format("YYYY-MM-DD");
        try {
            const response = await AxiosInstance.post('pedido/', {
                usuario: data.usuario,
                nombre: data.nombre,
                dni: data.dni,
                direccion: data.direccion,
                telefono: data.telefono,
                email: data.email,
                fecha: formattedDate,
            });
            console.log('Response:', response);
            navigate('/pedido');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : 'An error occurred');
            setError('Error al crear el pedido. Verifique los datos e intente nuevamente.');
        }
    };

    const handleCancel = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = (confirm) => {
        setOpenDialog(false);
        if (confirm) {
            navigate('/pedido');
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
                    Crear Pedido
                </Typography>
            </Box>

            <form onSubmit={handleSubmit(submission)}>
                <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column' }}>
                    {error && <Alert severity="error">{error}</Alert>}
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
                        <MySelectField
                            id="usuario"
                            label="Usuario"
                            name="usuario"
                            control={control}
                            options={usuarios.map(usuario => ({ value: usuario.id, label: usuario.nombre }))}
                            width="25%"
                            onChangeExtra={handleUsuarioChange}
                        />
                        <MyTextField
                            label="Nombre"
                            name="nombre"
                            control={control}
                            placeholder="Proporcionar el nombre"
                            width={'25%'}
                        />
                        <MyTextField
                            label="DNI"
                            name="dni"
                            control={control}
                            placeholder="Proporcionar el DNI"
                            width={'25%'}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
                        <MyTextField
                            label="Dirección"
                            name="direccion"
                            control={control}
                            placeholder="Proporcionar la dirección"
                            width={'25%'}
                        />
                        <MyTextField
                            label="Teléfono"
                            name="telefono"
                            control={control}
                            placeholder="Proporcionar el teléfono"
                            width={'25%'}
                        />
                        <MyTextField
                            label="Email"
                            name="email"
                            control={control}
                            placeholder="Proporcionar el email"
                            width={'25%'}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
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

export default AgregarPedido;
