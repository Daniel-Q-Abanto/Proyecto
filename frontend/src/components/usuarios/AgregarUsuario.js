import React, { useState } from 'react';
import { Box, Button, Typography, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import MyDatePickerField from '../forms/MyDatePickerField';
import MyTextField from '../forms/MyTextField';
import { useForm } from 'react-hook-form';
import AxiosInstance from '../Axios';
import Dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import useBlockNavigation from '../../hooks/useBlockNavigation'; // Importa useBlockNavigation aquí

const AgregarUsuario = () => {
    const navigate = useNavigate();
    const defaultValues = {
        nombre: '',
        email: '',
        direccion: '',
        telefono: '',
        password: '',
        fecha: '',
    };

    const { handleSubmit, control } = useForm({ defaultValues });
    const [error, setError] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    // Utiliza useBlockNavigation para bloquear la navegación
    useBlockNavigation(true, '¿Estás seguro de cancelar la creación del usuario?');

    const submission = async (data) => {
        const formattedDate = Dayjs(data.fecha["$d"]).format("YYYY-MM-DD");
        console.log('Submitting data:', {
            nombre: data.nombre,
            email: data.email,
            direccion: data.direccion,
            telefono: data.telefono,
            password: data.password,
            fecha: formattedDate,
        });

        try {
            const response = await AxiosInstance.post('usuario/', {
                nombre: data.nombre,
                email: data.email,
                direccion: data.direccion,
                telefono: data.telefono,
                password: data.password,
                fecha: formattedDate,
            });
            console.log('Response:', response);
            navigate('/usuario');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : 'An error occurred');
            setError('Error al crear el usuario. Verifique los datos e intente nuevamente.');
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
                    Crear Usuario
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
                        <MyTextField
                            id="password"
                            label="Password"
                            name="password"
                            control={control}
                            placeholder="Proporcionar la contraseña"
                            width={'25%'}
                            autoComplete="new-password"
                            type="password"
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
                        ¿Estás seguro de cancelar la creación del usuario?
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

export default AgregarUsuario;
