import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../Axios';
import { MaterialReactTable } from 'material-react-table';
import Dayjs from 'dayjs';
import { Box, IconButton, Button, Typography } from '@mui/material'; // Asegúrate de importar Typography
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Producto = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const GetData = async () => {
        try {
            console.log("Fetching productos...");
            const productoResponse = await AxiosInstance.get('/producto/');
            console.log("Productos fetched:", productoResponse.data);

            console.log("Fetching categorias...");
            const categoriaResponse = await AxiosInstance.get('/categoria/');
            console.log("Categorias fetched:", categoriaResponse.data);

            console.log("Fetching marcas...");
            const marcaResponse = await AxiosInstance.get('/marca/');
            console.log("Marcas fetched:", marcaResponse.data);

            const categoriaMap = {};
            const marcaMap = {};
            categoriaResponse.data.forEach(categoria => {
                categoriaMap[categoria.id] = categoria.nombre;
            });
            marcaResponse.data.forEach(marca => {
                marcaMap[marca.id] = marca.nombre;
            });

            const productosConNombres = productoResponse.data.map(producto => ({
                ...producto,
                categoriaNombre: categoriaMap[producto.categoria],
                marcaNombre: marcaMap[producto.marca],
                imagen: `http://127.0.0.1:8000${producto.imagen}`
            }));

            console.log("Productos con nombres y URLs de imagen:", productosConNombres);
            setProductos(productosConNombres);
            setLoading(false);
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    };

    useEffect(() => {
        GetData();
    }, []);

    useEffect(() => {
        console.log("Estado de carga:", loading);
        console.log("Productos:", productos);
    }, [loading, productos]);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'nombre',
                header: 'Nombre',
                size: 150,
            },
            {
                accessorKey: 'descripcion',
                header: 'Descripción',
                size: 150,
            },
            {
                accessorKey: 'precio',
                header: 'Precio',
                size: 150,
            },
            {
                accessorKey: 'stock',
                header: 'Stock',
                size: 150,
            },
            {
                accessorKey: 'categoriaNombre',
                header: 'Categoría',
                size: 150,
            },
            {
                accessorKey: 'marcaNombre',
                header: 'Marca',
                size: 150,
            },
            {
                accessorKey: 'imagen',
                header: 'Imagen',
                size: 150,
                Cell: ({ cell }) => (
                    <img
                        src={cell.getValue()}
                        alt="Producto"
                        style={{ width: '100px', height: '100px' }}
                    />
                ),
            },
            {
                accessorFn: (row) => Dayjs(row.fecha).format('DD-MM-YYYY'),
                header: 'Fecha',
                size: 150,
            },
        ],
        []
    );

    return (
        <Box sx={{ width: '100%', overflowX: 'auto' }}>
            <Box sx={{
                backgroundImage: 'linear-gradient(to right, rgba(88, 36, 110, 0.84), rgba(142, 68, 173, 0.68))', // Degradado con los colores especificados
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
                    Productos
                </Typography>
                <Button variant="contained" onClick={() => navigate('/agregar-producto')}>
                    Agregar Producto
                </Button>
            </Box>
            {loading ? (
                <p>Loading data...</p>
            ) : (
                <MaterialReactTable
                    columns={columns}
                    data={productos}
                    enableRowActions
                    renderRowActions={({ row, table }) => (
                        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                            <IconButton color="secondary" component={Link} to={`/editar-producto/${row.original.id}`}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="error">
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    )}
                    
                />
            )}
        </Box>
    );
};

export default Producto;
