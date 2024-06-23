import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import MyTextField from '../forms/MyTextField';
import MyMultiLineField from '../forms/MyMultilineField';
import MyDatePickerField from '../forms/MyDatePickerField';
import { useForm } from 'react-hook-form';
import AxiosInstance from '../Axios';
import Dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import useBlockNavigation from '../../hooks/useBlockNavigation';

const EditarMarca = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const defaultValues = {
    nombre: '',
    descripcion: '',
    fecha: '',
  };

  const { handleSubmit, control, setValue } = useForm({ defaultValues });
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  useBlockNavigation(true, '¿Estás seguro de cancelar la edición de la marca?');

  useEffect(() => {
    const fetchMarca = async () => {
      try {
        const response = await AxiosInstance.get(`marca/${id}/`);
        const marca = response.data;
        setValue('nombre', marca.nombre);
        setValue('descripcion', marca.descripcion);
        setValue('fecha', Dayjs(marca.fecha));
      } catch (error) {
        console.error('Error fetching marca:', error);
      }
    };

    fetchMarca();
  }, [id, setValue]);

  const submission = async (data) => {
    const formattedDate = Dayjs(data.fecha["$d"]).format("YYYY-MM-DD");
    try {
      const response = await AxiosInstance.put(`marca/${id}/`, {
        nombre: data.nombre,
        descripcion: data.descripcion,
        fecha: formattedDate,
      });
      console.log('Response:', response);
      navigate('/marca');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : 'An error occurred');
      setError('Error al actualizar la marca. Verifique los datos e intente nuevamente.');
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
      <form onSubmit={handleSubmit(submission)}>
        <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '10px' }}>
          <Typography sx={{ marginLeft: '20px', color: '#fff' }}>
            Editar Marca
          </Typography>
        </Box>

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
              <Button variant="contained" color="error" onClick={handleCancel} sx={{ width: '100%' }}>
                Cancelar
              </Button>
            </Box>
            <Box width="16%">
              <Button variant="contained" type="submit" sx={{ width: '100%' }}>
                Guardar Cambios
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
        <DialogTitle id="alert-dialog-title">{"Cancelar Edición"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de cancelar la edición de la marca?
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

export default EditarMarca;
