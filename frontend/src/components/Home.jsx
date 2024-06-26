import React from 'react';
import { Box, Typography, Button, Grid, Paper, Card, CardMedia, CardContent, CardActions } from '@mui/material';

const Home = () => {
    const products = [
        {
            title: 'Laptops',
            description: 'Descubre nuestras laptops de última generación con la mejor tecnología del mercado.',
            image: '/src/images/mac.jpg',
        },
        {
            title: 'Monitores',
            description: 'Explora nuestra variedad de monitores con alta resolución y calidad de imagen.',
            image: '/src/images/monitor.jpg',
        },
        {
            title: 'Componentes',
            description: 'Encuentra todos los componentes que necesitas para armar la PC de tus sueños.',
            image: '/src/images/componente.jpg',
        },
    ];

    return (
        <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#f0f0f0' }}>
            <Box sx={{ textAlign: 'center', mb: 5 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Bienvenidos a Innovatec Administrador
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Tu tienda de confianza para componentes de computadoras
                </Typography>
                <Button variant="contained" sx={{ backgroundImage: 'linear-gradient(to right, rgba(16, 17, 22, 0.8), rgba(16, 17, 22, 0.6))' }} href="producto">
                    Gestionar Productos
                </Button>
            </Box>

            <Grid container spacing={4} id="productos">
                {products.map((product, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Card>
                            <CardMedia
                                component="img"
                                alt={product.title}
                                height="200"
                                image={product.image}
                                title={product.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {product.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" href="producto">
                                    Ver más
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 5, textAlign: 'center' }}>
                <Typography variant="h4" component="h3" gutterBottom>
                    ¿Por qué elegir Innovatec?
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h6" component="h4">
                                Calidad Garantizada
                            </Typography>
                            <Typography variant="body1">
                                Ofrecemos productos de alta calidad y durabilidad.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h6" component="h4">
                                Envíos Rápidos
                            </Typography>
                            <Typography variant="body1">
                                Recibe tus productos en el menor tiempo posible.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h6" component="h4">
                                Atención al cliente 24/7
                            </Typography>
                            <Typography variant="body1">
                                Disponibilidad para ayudarte en cualquier momento.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Home;
