import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import MyTextField from '../forms/MyTextField';
import MyMultiLineField from '../forms/MyMultilineField';
import MySelectField from '../forms/MySelectField';
import MyDatePickerField from '../forms/MyDatePickerField';
import { useForm } from 'react-hook-form';
import AxiosInstance from '../Axios';
import Dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import useBlockNavigation from '../../hooks/useBlockNavigation';

const EditarProducto = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const defaultValues = {
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: '',
    marca: '',
    fecha: '',
    imagen: null,
  };

  const { handleSubmit, control, setValue, register } = useForm({ defaultValues });
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [imagenNombre, setImagenNombre] = useState('');
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  useBlockNavigation(true, '¿Estás seguro de cancelar la edición del producto?');

  useEffect(() => {
    AxiosInstance.get('/categoria/')
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error('Error al cargar las categorías:', error);
      });

    AxiosInstance.get('/marca/')
      .then(response => {
        setMarcas(response.data);
      })
      .catch(error => {
        console.error('Error al cargar las marcas:', error);
      });

    const fetchProducto = async () => {
      try {
        const response = await AxiosInstance.get(`producto/${id}/`);
        const producto = response.data;
        setValue('nombre', producto.nombre);
        setValue('descripcion', producto.descripcion);
        setValue('precio', producto.precio);
        setValue('stock', producto.stock);
        setValue('categoria', producto.categoria);
        setValue('marca', producto.marca);
        setValue('fecha', Dayjs(producto.fecha));
        setImagenNombre(producto.imagen ? producto.imagen.split('/').pop() : '');
      } catch (error) {
        console.error('Error fetching producto:', error);
      }
    };

    fetchProducto();
  }, [id, setValue]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue('imagen', file);
      setImagenNombre(file.name);
    } else {
      setImagenNombre('');
    }
  };

  const submission = async (data) => {
    const formattedDate = Dayjs(data.fecha["$d"]).format("YYYY-MM-DD");
    const formData = new FormData();
    formData.append('nombre', data.nombre);
    formData.append('descripcion', data.descripcion);
    formData.append('precio', data.precio);
    formData.append('stock', data.stock);
    formData.append('categoria', data.categoria);
    formData.append('marca', data.marca);
    formData.append('fecha', formattedDate);
    formData.append('imagen', data.imagen);

    try {
      const response = await AxiosInstance.put(`/producto/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response);
      navigate('/producto');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : 'An error occurred');
      setError('Error al actualizar el producto. Verifique los datos e intente nuevamente.');
    }
  };

  const handleCancel = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = (confirm) => {
    setOpenDialog(false);
    if (confirm) {
      navigate('/producto');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submission)}>
        <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '10px' }}>
          <Typography sx={{ marginLeft: '20px', color: '#fff' }}>
            Editar Producto
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
              width="20%"
              autoComplete="off"
            />
            <MyMultiLineField
              id="descripcion"
              label="Descripción"
              name="descripcion"
              control={control}
              placeholder="Proporcionar la descripción del producto"
              width="20%"
              autoComplete="off"
            />
            <MyTextField
              id="precio"
              label="Precio"
              name="precio"
              control={control}
              placeholder="Proporcionar el precio"
              width="20%"
              type="number"
              autoComplete="off"
            />
            <MyTextField
              id="stock"
              label="Stock"
              name="stock"
              control={control}
              placeholder="Proporcionar el stock"
              width="20%"
              autoComplete="off"
              type="number"
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
            <MySelectField
              id="categoria"
              label="Categoría"
              name="categoria"
              control={control}
              options={categorias.map(cat => ({ value: cat.id, label: cat.nombre }))}
              width="20%"
              autoComplete="off"
            />
            <MySelectField
              id="marca"
              label="Marca"
              name="marca"
              control={control}
              options={marcas.map(marca => ({ value: marca.id, label: marca.nombre }))}
              width="20%"
              autoComplete="off"
            />
            <MyDatePickerField
              id="fecha"
              label="Fecha"
              name="fecha"
              control={control}
              width="20%"
              autoComplete="off"
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
            <input
              type="file"
              {...register('imagen')}
              style={{ display: 'none' }}
              id="imagen-upload"
              onChange={handleFileChange}
            />
            <label htmlFor="imagen-upload">
              <Button variant="contained" component="span">
                Subir Imagen
              </Button>
            </label>
            <Typography variant="body1" sx={{ marginLeft: '20px' }}>
              {imagenNombre || 'No se ha seleccionado ninguna imagen'}
            </Typography>
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
            ¿Estás seguro de cancelar la edición del producto?
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

export default EditarProducto;

