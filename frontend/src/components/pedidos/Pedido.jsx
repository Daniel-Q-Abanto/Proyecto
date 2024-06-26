import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AxiosInstance from '../Axios';
import { MaterialReactTable } from 'material-react-table';
import Dayjs from 'dayjs';
import { Box, IconButton, Button, Typography, Alert } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { blue } from '@mui/material/colors';

const Pedido = () => {
    const [myData, setMydata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const GetData = () => {
        AxiosInstance.get('pedido/').then((res) => {
            setMydata(res.data);
            setLoading(false);
        });
    };

    useEffect(() => {
        GetData();
    }, []);

    useEffect(() => {
        if (location.state && location.state.message) {
            setMessage(location.state.message);
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                setMessage(null);
            }, 5000); 
        }
    }, [location.state]);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'usuario',
                header: 'ID Usuario',
                size: 150,
            },
            {
                accessorKey: 'nombre',
                header: 'Nombre',
                size: 150,
            },
            {
                accessorKey: 'dni',
                header: 'DNI',
                size: 150,
            },
            {
                accessorKey: 'direccion',
                header: 'Dirección',
                size: 200,
            },
            {
                accessorKey: 'telefono',
                header: 'Teléfono',
                size: 150,
            },
            {
                accessorKey: 'email',
                header: 'Email',
                size: 150,
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
                backgroundImage: 'linear-gradient(to right, rgba(63, 85, 118, 1), rgba(63, 85, 118, 0.6))',
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
                    Pedidos
                </Typography>
                <Button variant="contained" sx={{ backgroundImage: 'linear-gradient(to right, rgba(16, 17, 22, 0.8), rgba(16, 17, 22, 0.6))' }} onClick={() => navigate('/agregar-pedido')}>
                    Agregar Pedido
                </Button>
            </Box>
            {showMessage && <Alert severity="success" sx={{ marginBottom: '16px' }}><strong>{message}</strong></Alert>}
            {loading ? (
                <p>Loading data...</p>
            ) : (
                <MaterialReactTable
                    columns={columns}
                    data={myData}
                    enableRowActions
                    renderRowActions={({ row, table }) => (
                        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                            <IconButton sx={{color: blue[900] }} component={Link} to={`/editar-pedido/${row.original.id}`}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="error" component={Link} to={`/eliminar-pedido/${row.original.id}`}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    )}

                />
            )}
        </Box>
    );
};

export default Pedido;
