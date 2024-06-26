import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Container } from '@mui/material';

const teamMembers = [
    {
        name: 'Ayrton Florian',
        role: 'CEO',
        image: '/path/to/image1.jpg',
        description: 'Ayrton es el CEO de Innovatec y tiene experiencia en la industria tecnológica.',
    },
    {
        name: 'Daniel Quispe',
        role: 'CEO',
        image: '/src/images/profile.jpg',
        description: 'Daniel es la CEO de Innovatec y es experta en desarrollo de software y arquitectura de sistemas.',
    },
    {
        name: 'Rafael Arce',
        role: 'CEO',
        image: '/path/to/image3.jpg',
        description: 'Rafael es el CEO de Innovatec y se encarga de las operaciones diarias de la empresa.',
    },
    {
        name: 'Luis Palomino',
        role: 'CEO',
        image: '/path/to/image3.jpg',
        description: 'Luis es el CEO de Innovatec y se encarga de las operaciones diarias de la empresa.',
    },
];

const About = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#f4f4f9' }}>
            <Container maxWidth="lg">
                <Typography variant="h3" component="h1" gutterBottom textAlign="center" sx={{ color: '#1a73e8' }}>
                    Sobre Nosotros
                </Typography>

                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" component="h3" gutterBottom sx={{ color: '#1a73e8' }}>
                            Innovatec - Innovación en Tecnología
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#777' }}>
                            En Innovatec, nos dedicamos a ofrecer los mejores componentes de computadoras del mercado. Nuestro
                            compromiso con la calidad y el servicio al cliente nos ha permitido destacarnos en la industria.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img src="/src/images/about.jpg" alt="About Us" style={{ width: '100%', borderRadius: '8px' }} />
                    </Grid>
                </Grid>

                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
                        <img src="/src/images/mision.png" alt="Our Mission" style={{ height:'200px', width: '100%', borderRadius: '8px' }} />
                    </Grid>
                    <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
                        <Typography variant="h4" component="h3" gutterBottom sx={{ color: '#1a73e8' }}>
                            Nuestra Misión
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#777' }}>
                            Proveer componentes de alta calidad que satisfagan las necesidades de nuestros clientes, con un
                            enfoque en innovación y excelencia.
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" component="h3" gutterBottom sx={{ color: '#1a73e8' }}>
                            Nuestra Visión
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#777' }}>
                            Ser líderes en el mercado de tecnología, reconocidos por nuestra calidad y servicio excepcional.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img src="/src/images/vision.png" alt="Our Vision" style={{ height:'210px',  width: '100%', borderRadius: '8px' }} />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" component="h3" gutterBottom textAlign="center" sx={{ color: '#1a73e8' }}>
                        Nuestro Equipo
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {teamMembers.map((member, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card sx={{ boxShadow: 3, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={member.image}
                                        alt={member.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" sx={{ color: '#333' }}>
                                            {member.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {member.role}
                                        </Typography>
                                        <Typography variant="body2" paragraph sx={{ color: '#555' }}>
                                            {member.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default About;
