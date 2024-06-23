import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../Axios';
import { MaterialReactTable } from 'material-react-table';
import { Box, IconButton, Button, Typography } from '@mui/material'; 
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Dayjs from 'dayjs';

const DetallePedido = () => {
    const [myData, setMydata] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const GetData = () => {
        AxiosInstance.get('detallepedido/').then((res) => {
            setMydata(res.data);
            setLoading(false);
        });
    };

    useEffect(() => {
        GetData();
    }, []);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'pedido_nombre_usuario', 
                header: 'Pedido',
                size: 150,
            },
            {
                accessorKey: 'producto_nombre', 
                header: 'Nombre del Producto',
                size: 150,
            },
            {
                accessorKey: 'cantidad',
                header: 'Cantidad',
                size: 150,
            },
            {
                accessorKey: 'precio',
                header: 'Precio',
                size: 150,
            },
            {
                accessorFn: (row) => Dayjs(row.pedido_fecha).format('DD-MM-YYYY'),
                header: 'Fecha',
                size: 150,
            },
        ],
        []
    );

    return (
        <Box sx={{ width: '100%', overflowX: 'auto' }}>
            <Box sx={{
                backgroundImage: 'linear-gradient(to right, rgba(88, 36, 110, 0.84), rgba(142, 68, 173, 0.68))', 
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
                    Detalles del Pedido
                </Typography>
                <Button variant="contained" onClick={() => navigate('/agregar-detalle-pedido')}>
                    Agregar Detalle Pedido
                </Button>
            </Box>
            {loading ? (
                <p>Loading data...</p>
            ) : (
                <MaterialReactTable
                    columns={columns}
                    data={myData}
                    enableRowActions
                    renderRowActions={({ row, table }) => (
                        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                            <IconButton color="secondary" component={Link} to={`/editar-detalle-pedido/${row.original.id}`}>
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

export default DetallePedido;
