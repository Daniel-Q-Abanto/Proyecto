import React, { useState } from 'react';
import { Box, Button, Typography, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import MyTextField from '../forms/MyTextField';
import MyMultiLineField from '../forms/MyMultilineField';
import MyDatePickerField from '../forms/MyDatePickerField';
import { useForm } from 'react-hook-form';
import AxiosInstance from '../Axios';
import Dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import useBlockNavigation from '../../hooks/useBlockNavigation'; 
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const AgregarMarca = () => {
    const navigate = useNavigate();
    const defaultValues = {
        nombre: '',
        descripcion: '',
        fecha: '',
    };

    const schema = yup.object({
        nombre: yup.string().required('Nombre es requerido'),
        descripcion: yup.string().required('descripción es requerido'),
        fecha: yup.date().required('Fecha es requerida'),
    });

    const { handleSubmit, control } = useForm({ defaultValues, resolver: yupResolver(schema) });
    const [error, setError] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    useBlockNavigation(true, '¿Estás seguro de cancelar la creación de la marca?');

    const submission = async (data) => {
        const formattedDate = Dayjs(data.fecha["$d"]).format("YYYY-MM-DD");
        console.log('Submitting data:', {
            nombre: data.nombre,
            descripcion: data.descripcion,
            fecha: formattedDate,
        });

        try {
            const response = await AxiosInstance.post('marca/', {
                nombre: data.nombre,
                descripcion: data.descripcion,
                fecha: formattedDate,
            });
            console.log('Response:', response);
            navigate('/marca', { state: { message: `La marca ${data.nombre} se creó correctamente.` } });
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : 'An error occurred');
            setError('Error al crear la marca. Verifique los datos e intente nuevamente.');
        }
    };

    const handleCancel = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = (confirm) => {
        setOpenDialog(false);
        if (confirm) {
            navigate('/marca');
        }
    };

    return (
        <div>
            <Box sx={{
                backgroundImage: 'linear-gradient(to right, rgba(114, 121, 203, 1), rgba(134, 137, 172, 0.8))',  
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
                    Crear Marca
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
                        <MyMultiLineField
                            id="descripcion"
                            label="Descripción"
                            name="descripcion"
                            control={control}
                            placeholder="Proporcionar la descripción de la marca"
                            width={'25%'}
                            autoComplete="description"
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
                            <Button variant="contained" type="submit" sx={{ width: '100%', backgroundColor: '#7279CB', '&:hover': { backgroundColor: '#6572F2' } }}>
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
                        ¿Estás seguro de cancelar la creación de la marca?
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

export default AgregarMarca;
