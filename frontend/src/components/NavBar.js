import React, { useState } from 'react';
import { Box, Drawer, AppBar, CssBaseline, Toolbar, List, Typography, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import FaceIcon from '@mui/icons-material/Face';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import profileImage from '../images/profile.jpg';

const NavBar = ({ drawerWidth, children }) => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const changeOpenStatus = () => {
    setOpen(!open);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    handleMenuClose();
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  const myDrawer = (
    <div>
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/home" selected={"/home" === path}>
              <ListItemIcon>
                <HomeIcon fontSize="large" sx={{ color: grey[900] }}  />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/usuario" selected={"/usuario" === path}>
              <ListItemIcon>
                <FaceIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary={"Usuarios"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/categoria" selected={"/categoria" === path}>
              <ListItemIcon>
                <AutoAwesomeMosaicIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary={"Categorias"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/marca" selected={"/marca" === path}>
              <ListItemIcon>
                <BrandingWatermarkIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary={"Marcas"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/producto" selected={"/producto" === path}>
              <ListItemIcon>
                <PrecisionManufacturingIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary={"Productos"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/pedido" selected={"/pedido" === path}>
              <ListItemIcon>
                <LocalShippingIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary={"Pedidos"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/detalle-pedido" selected={"/detalle-pedido" === path}>
              <ListItemIcon>
                <AssignmentTurnedInIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary={"Detalle de Pedidos"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/about" selected={"/about" === path}>
              <ListItemIcon>
                <InfoIcon color="disabled" />
              </ListItemIcon>
              <ListItemText primary={"About"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundImage: 'linear-gradient(to right, rgba(47, 49, 72, 9.1), rgba(61, 120, 128, 0.8))' }}>
        <Toolbar>
          <IconButton 
            color="inherit"
            onClick={changeOpenStatus}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            INNOVATEC ADMIN
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleMenuClick} sx={{ p: 0 }}>
            <Avatar alt="Profile Image" src={profileImage} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={() => handleMenuItemClick('/profile')}>Perfil</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/account')}>Cuenta</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/home')}>Panel</MenuItem>
            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {myDrawer}
      </Drawer>

      <Drawer
        variant="temporary"
        open={open}
        onClose={changeOpenStatus}
        sx={{
          display: { xs: "block", sm: "none" },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {myDrawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default NavBar;
